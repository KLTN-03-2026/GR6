<?php

namespace App\Http\Controllers;

use App\Http\Requests\NhanVienRequest;
use App\Models\ChiTietDatLich;
use App\Models\DatLich;
use App\Models\DichVu;
use App\Models\NhanVien;
use App\Models\ThuongHieu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ThuongHieuController extends Controller
{
    public function cancelDatLich($id_dat_lich)
    {
        $data = DatLich::where('id', $id_dat_lich)->first();
        if(!$data){
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy lịch đặt.'
            ], 404);
        }   
        $data->trang_thai_dat_lich = 3; //hủy
        $data->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật trạng thái đặt lịch thành công!',
        ]);       
    }
    public function doneDatLich($id_dat_lich)
    {
        $data = DatLich::where('id', $id_dat_lich)->first();
        if(!$data){
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy lịch đặt.'
            ], 404);
        }   
        $data->trang_thai_dat_lich = 2; //hoàn thành
        $data->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật trạng thái đặt lịch thành công!',
        ]);       
    }
    public function getDataDatLich($id_thuong_hieu)
    {
        $data = DatLich::where('id_thuong_hieu', $id_thuong_hieu)
            ->get();
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }
    public function destroyNhanVien($id)
    {
        $nhanVien = NhanVien::where('id', $id)->first();
        if ($nhanVien) {
            //xóa hình ảnh cũ
            Storage::disk('public')->delete($nhanVien->hinh_anh);
            $nhanVien->delete();
            return response()->json([
                'status' => true,
                'message' => 'Xóa nhân viên thành công!',
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy nhân viên!'
            ]);
        }
    }
    public function changeStauts($id)
    {
        $nhanVien = NhanVien::where('id', $id)->first();
        if ($nhanVien) {
            $nhanVien->trang_thai_lam_viec = !$nhanVien->trang_thai_lam_viec; //đảo ngược trạng thái
            $nhanVien->save();
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật trạng thái nhân viên thành công!',
                'data' => $nhanVien
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy nhân viên!'
            ]);
        }
    }
    public function updateNhanVien(Request $request)
{
    $nhanVien = NhanVien::find($request->id);

    if (!$nhanVien) {
        return response()->json([
            'status' => false,
            'message' => 'Không tìm thấy nhân viên!'
        ], 404);
    }

    $dataUpdate = [
        'ten_nhan_vien' => $request->ten_nhan_vien,
        'mo_ta_ngan'    => $request->mo_ta_ngan,
    ];

    if ($request->hasFile('hinh_anh')) {

        $file = $request->file('hinh_anh');

        // tạo tên file
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

        // lưu ảnh mới
        $path = $file->storeAs('hinh_anh_nhan_vien', $filename, 'public');

     
        if ($nhanVien->hinh_anh && Storage::disk('public')->exists($nhanVien->hinh_anh)) {
            Storage::disk('public')->delete($nhanVien->hinh_anh);
        }

        $dataUpdate['hinh_anh'] = $path;
    }

 

    $nhanVien->update($dataUpdate);

    return response()->json([
        'status' => true,
        'message' => 'Cập nhật nhân viên thành công!',
        'data' => $nhanVien
    ]);
}

    public function createNhanVien(NhanVienRequest $request)
    {
        $filename = Str::uuid() . '.' . $request->file('hinh_anh')->getClientOriginalExtension();
        $path = $request->file('hinh_anh')->storeAs('hinh_anh_nhan_vien', $filename, 'public');
        $data = NhanVien::create([
            'id_thuong_hieu' => $request->id_thuong_hieu,
            'ten_nhan_vien' => $request->ten_nhan_vien,
            'hinh_anh' => $path,
            'mo_ta_ngan' => $request->mo_ta_ngan,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Thêm mới nhân viên thành công!',
            'data' => $data
        ]);
    }
    public function getDataNhanVien()
{
    $nhacungcap = $this->isUserNhaCungCap();

    if (!$nhacungcap) {
        return response()->json([
            'status' => false,
            'message' => 'Bạn không phải nhà cung cấp!'
        ], 403);
    }

    // Lấy thương hiệu của nhà cung cấp
    $thuongHieu = ThuongHieu::where('id_nha_cung_cap', $nhacungcap->id)->first();

    if (!$thuongHieu) {
        return response()->json([
            'status' => false,
            'message' => 'Nhà cung cấp chưa có thương hiệu.'
        ], 404);
    }

    // Lấy nhân viên
    $data = NhanVien::where('id_thuong_hieu', $thuongHieu->id)
        ->select(
            'id',
            'ten_nhan_vien',
            'hinh_anh',
            'mo_ta_ngan',
            'trang_thai_lam_viec',
            'id_thuong_hieu'
        )
        ->get();

    // Nếu chưa có nhân viên thì trả về object giả
    if ($data->count() == 0) {

        $data = collect([
            [
                'id_thuong_hieu' => $thuongHieu->id,
            ]
        ]);

    } else {

        $data->transform(function ($item) {

            // Nếu hinh_anh là URL
            if (
                $item->hinh_anh &&
                filter_var($item->hinh_anh, FILTER_VALIDATE_URL)
            ) {

                $item->hinh_anh = $item->hinh_anh;

            } else if ($item->hinh_anh) {

                // Ảnh local
                $item->hinh_anh = asset('storage/' . $item->hinh_anh);
            }

            return $item;
        });
    }

    return response()->json([
        'status' => true,
        'data' => $data
    ]);
}

}
