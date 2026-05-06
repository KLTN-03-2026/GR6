<?php

namespace App\Http\Controllers;

use App\Http\Requests\DichVuRequest;
use App\Models\DichVu;
use App\Models\HinhAnhDichVu;
use App\Models\NhaCungCap;
use App\Models\ThuongHieu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DichVuController extends Controller
{
    public function getDichVuByNCC()
    {
        $nhacungcap = $this->isUserNhaCungCap();
        if (!$nhacungcap) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn không có quyền truy cập dữ liệu này.'
            ], 403);
        }
        $dichVu = ThuongHieu::where('id_nha_cung_cap', $nhacungcap->id)
            ->join('dich_vus', 'dich_vus.id_thuong_hieu', 'thuong_hieus.id')
            ->select(
                'dich_vus.id',
                'dich_vus.ten_dich_vu',
                'dich_vus.mo_ta_ngan',
                'dich_vus.mo_ta_dai',
                'dich_vus.don_gia',
                'dich_vus.thoi_gian_du_kien',
                'dich_vus.kieu_phuc_vu',
                'dich_vus.id_thuong_hieu',
                'dich_vus.id_danh_muc_dich_vu',
                'dich_vus.so_luong_lich_toi_da',
                'dich_vus.trang_thai'
            )
            ->get();
        if (!$dichVu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dịch vụ với ID đã cho.'
            ], 404);
        } else {
            return response()->json([
                'status' => true,
                'data' => $dichVu
            ]);
        }
    }
    public function getDichVubyID($id)
    {
        // $nhacungcap = $this->isUserNhaCungCap();
        // if (!$nhacungcap) {
        //     return response()->json([
        //         'status' => false,
        //         'message' => 'Bạn không có quyền truy cập dữ liệu này.'
        //     ], 403);
        // }
        $nhacungcap = NhaCungCap::where('id', $id)->first();
        $dichVu = ThuongHieu::where('id_nha_cung_cap', $nhacungcap->id)
            ->join('dich_vus', 'dich_vus.id_thuong_hieu', 'thuong_hieus.id')
            ->select(
                'dich_vus.id',
                'dich_vus.ten_dich_vu',
                'dich_vus.mo_ta_ngan',
                'dich_vus.mo_ta_dai',
                'dich_vus.don_gia',
                'dich_vus.thoi_gian_du_kien',
                'dich_vus.kieu_phuc_vu',
                'dich_vus.id_thuong_hieu',
                'dich_vus.id_danh_muc_dich_vu',
                'dich_vus.so_luong_lich_toi_da',
                'dich_vus.trang_thai',
                'hinh_anh_dich_vus.hinh_anh'
            )
            ->leftJoin('hinh_anh_dich_vus', function($join) {
                $join->on('hinh_anh_dich_vus.id_dich_vu', '=', 'dich_vus.id')
                     ->whereRaw('hinh_anh_dich_vus.id = (select id from hinh_anh_dich_vus where id_dich_vu = dich_vus.id limit 1)');
            })
            ->get();
        if (!$dichVu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dịch vụ với ID đã cho.'
            ], 404);
        } else {
            return response()->json([
                'status' => true,
                'data' => $dichVu
            ]);
        }
    }
    public function getDichVuByThuongHieu($id_thuong_hieu)
    {
        $dichVu = DichVu::where('id_thuong_hieu', $id_thuong_hieu)->get();
        return response()->json([
            'status' => true,
            'data' => $dichVu
        ]);
    }
    public function changeStatusDichVu($id)
    {
        $dichVu = DichVu::where('id', $id)->first();
        if (!$dichVu) {
            return response()->json([
                'status' => false,
                'message' => 'Dịch vụ không tồn tại'
            ], 404);
        }
        $dichVu->trang_thai = !$dichVu->trang_thai; // Đảo ngược trạng thái
        $dichVu->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật trạng thái dịch vụ thành công',
            'data' => $dichVu
        ]);
    }
    public function destroyDichVu(Request $request)
    {
        DB::beginTransaction();

        try {
            // 1. Tìm dịch vụ
            $dichVu = DichVu::where('id', $request->id)->first();

            if (!$dichVu) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Dịch vụ không tồn tại'
                ], 404);
            }

            /*
        |--------------------------------------------------------------------------
        | 2. Xóa toàn bộ ảnh liên quan
        |--------------------------------------------------------------------------
        */
            $hinhAnhs = HinhAnhDichVu::where('id_dich_vu', $dichVu->id)->get();

            foreach ($hinhAnhs as $hinhAnh) {

                // Xóa file trong storage
                if (Storage::disk('public')->exists($hinhAnh->hinh_anh)) {
                    Storage::disk('public')->delete($hinhAnh->hinh_anh);
                }

                // Xóa record DB
                $hinhAnh->delete();
            }

            /*
        |--------------------------------------------------------------------------
        | 3. Nếu có bảng liên quan như chi_tiet_dat_lich thì nên check trước
        |--------------------------------------------------------------------------
        */
            // Ví dụ:
            // if (ChiTietDatLich::where('id_dich_vu', $dichVu->id)->exists()) {
            //     return response()->json([
            //         'status' => false,
            //         'message' => 'Dịch vụ đã có lịch đặt, không thể xóa'
            //     ], 400);
            // }

            /*
        |--------------------------------------------------------------------------
        | 4. Xóa dịch vụ
        |--------------------------------------------------------------------------
        */
            $dichVu->delete();

            DB::commit();

            return response()->json([
                'status'  => true,
                'message' => 'Xóa dịch vụ và toàn bộ hình ảnh thành công'
            ]);
        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status'  => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function updateDichVu(Request $request)
    {
        DB::beginTransaction();

        try {
            // 1. Tìm dịch vụ
            $dichVu = DichVu::where('id', $request->id)->first();

            if (!$dichVu) {
                return response()->json([
                    'status' => false,
                    'message' => 'Dịch vụ không tồn tại'
                ], 404);
            }

            // 2. Update thông tin dịch vụ
            $dichVu->update([
                'ten_dich_vu'          => $request->ten_dich_vu,
                'mo_ta_ngan'           => $request->mo_ta_ngan,
                'don_gia'              => $request->don_gia,
                'thoi_gian_du_kien'    => $request->thoi_gian_du_kien,
                'id_thuong_hieu'       => $request->id_thuong_hieu,
                'so_luong_lich_toi_da' => $request->so_luong_lich_toi_da,
            ]);

            /*
        |--------------------------------------------------------------------------
        | 3. Nếu có upload ảnh mới
        |--------------------------------------------------------------------------
        | Cách này:
        | - Xóa toàn bộ ảnh cũ
        | - Upload lại toàn bộ ảnh mới
        */

            if ($request->hasFile('hinh_anh')) {

                // Lấy danh sách ảnh cũ
                $oldImages = HinhAnhDichVu::where('id_dich_vu', $dichVu->id)->get();

                // Xóa file + DB cũ
                foreach ($oldImages as $oldImage) {

                    if (Storage::disk('public')->exists($oldImage->hinh_anh)) {
                        Storage::disk('public')->delete($oldImage->hinh_anh);
                    }

                    $oldImage->delete();
                }

                // Thêm ảnh mới
                foreach ($request->file('hinh_anh') as $image) {

                    $fileName = Str::uuid() . '.' . $image->getClientOriginalExtension();

                    $path = $image->storeAs(
                        'hinh_anh_dich_vu',
                        $fileName,
                        'public'
                    );

                    HinhAnhDichVu::create([
                        'id_dich_vu' => $dichVu->id,
                        'hinh_anh'   => $path,
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'status'  => true,
                'message' => 'Cập nhật dịch vụ thành công'
            ]);
        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status'  => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function createDichVu(DichVuRequest $request)
    {
        DB::beginTransaction();

        try {
            // 1. Lưu dịch vụ trước
            $dichVu = DichVu::create([
                'ten_dich_vu'          => $request->ten_dich_vu,
                'mo_ta_ngan'           => $request->mo_ta_ngan,
                'mo_ta_dai'            => $request->mo_ta_dai,
                'don_gia'              => $request->don_gia,
                'thoi_gian_du_kien'    => $request->thoi_gian_du_kien,
                'kieu_phuc_vu'         => $request->kieu_phuc_vu,
                'id_thuong_hieu'       => $request->id_thuong_hieu,
                'id_danh_muc_dich_vu'  => $request->id_danh_muc_dich_vu,
                'so_luong_lich_toi_da' => $request->so_luong_lich_toi_da,
            ]);

            // 2. Lưu từng ảnh vào bảng hinh_anh_dich_vus
            if ($request->hasFile('hinh_anh')) {
                foreach ($request->file('hinh_anh') as $image) {
                    // Tạo tên ảnh random
                    $fileName = Str::uuid() . '.' . $image->getClientOriginalExtension();
                    // Lưu vào storage/app/public/hinh_anh_dich_vu
                    $path = $image->storeAs('hinh_anh_dich_vu', $fileName, 'public');
                    // Insert từng dòng DB
                    HinhAnhDichVu::create([
                        'id_dich_vu' => $dichVu->id,
                        'hinh_anh'   => $path,
                    ]);
                }
            }
            DB::commit();
            return response()->json([
                'status'  => true,
                'message' => 'Thêm dịch vụ và toàn bộ hình ảnh thành công',
                'data'    => $dichVu
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status'  => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function getThuongHieu($id)
    {
        $NhaCungCap = $this->isUserNhaCungCap();
        $thuongHieu = DichVu::where('dich_vus.id', $id)
            ->join('thuong_hieus', 'thuong_hieus.id', 'dich_vus.id_thuong_hieu')
            ->select('thuong_hieus.id', 'thuong_hieus.ten_thuong_hieu', 'thuong_hieus.dia_chi', 'thuong_hieus.logo')
            ->first();
             if ($thuongHieu['logo']) {
        if (!filter_var($thuongHieu['logo'], FILTER_VALIDATE_URL)) {
            $thuongHieu['logo'] = asset('storage/' . $thuongHieu['logo']);
        }
    }
        if (!$thuongHieu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thương hiệu cho dịch vụ với ID đã cho.'
            ], 404);
        } else {
            return response()->json([
                'status' => true,
                'data' => $thuongHieu
            ]);
        }
    }
    public function getDichVu()
    {
        $dichVu = DichVu::get();
        return response()->json([
            'status' => true,
            'data' => $dichVu
        ]);
    }
    public function chiTietDichVu($id)
    {
        $dichVu = DichVu::where('id', $id)
            ->select('dich_vus.id', 'dich_vus.ten_dich_vu', 'dich_vus.mo_ta_ngan', 'dich_vus.mo_ta_dai', 'dich_vus.don_gia', 'dich_vus.thoi_gian_du_kien', 'dich_vus.kieu_phuc_vu')
            ->first();
        $hinhAnhDichVu = HinhAnhDichVu::where('id_dich_vu', $id)
            ->select('hinh_anh_dich_vus.id', 'hinh_anh_dich_vus.id_dich_vu', 'hinh_anh_dich_vus.hinh_anh')
            ->get();
        $hinhAnhDichVu->transform(function ($item) {
            // Nếu hinh_anh đã là URL (bắt đầu bằng http:// hoặc https://)
            if (filter_var($item->hinh_anh, FILTER_VALIDATE_URL)) {
                $item->hinh_anh = $item->hinh_anh;  // giữ nguyên link
            } else {
                // Ngược lại, coi như đường dẫn local trong disk 'public'
                $item->hinh_anh = asset('storage/' . $item->hinh_anh);
            }
            return $item;
        });
        if (!$dichVu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dịch vụ với ID đã cho.'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $dichVu,
            'data_hinh_anh' => $hinhAnhDichVu

        ]);
    }
    public function timKiemDichVu($keyword)
    {
        $data = DichVu::where('ten_dich_vu', 'LIKE', '%' . $keyword . '%')->get();
        if ($data->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dịch vụ nào phù hợp với từ khóa.'
            ], 404);
        } else {

            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        }
    }
}
