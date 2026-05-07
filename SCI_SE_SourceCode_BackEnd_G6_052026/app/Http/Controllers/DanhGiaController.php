<?php

namespace App\Http\Controllers;

use App\Models\DanhGia;
use App\Models\DichVu;
use App\Models\ThuongHieu;
use Illuminate\Http\Request;

class DanhGiaController extends Controller
{
    public function getDanhGiaByThuongHieu($id)
    {
        $thuongHieu = ThuongHieu::where('id_nha_cung_cap', $id)->first();

        if (!$thuongHieu) {
            return response()->json([
                'status' => false,
                'message' => 'Nhà cung cấp chưa có thương hiệu'
            ], 404);
        }

        $dichVuIds = DichVu::where('id_thuong_hieu', $thuongHieu->id)
            ->pluck('id');

        $danhGia = DanhGia::whereIn('id_dich_vu', $dichVuIds)
            ->join('khach_hangs', 'khach_hangs.id', '=', 'danh_gias.id_khach_hang')
            ->select(
                'khach_hangs.ten_khach_hang',
                'danh_gias.muc_hai_long',
                'danh_gias.noi_dung'
            )
            ->get();

        return response()->json([
            'status' => true,
            'data'   => $danhGia
        ]);
    }
    public function getDanhGiaByDichVu($id)
    {
        $danhGia = DanhGia::where('id_dich_vu', $id)
            ->join('khach_hangs', 'khach_hangs.id', 'danh_gias.id_khach_hang')
            ->select(
                'khach_hangs.ten_khach_hang',
                'danh_gias.muc_hai_long',
                'danh_gias.noi_dung',
            )
            ->get();
        return response()->json([
            'status' => true,
            'data' => $danhGia
        ]);
    }
    public function createDanhGia(Request $request)
    {
        $khachHang = $this->isUserKhachHang();
        if (!$khachHang) {
            return response()->json([
                'status'  => false,
                'message' => 'Vui lòng đăng nhập để đánh giá dịch vụ!'
            ], 401);
        }
        $dichVu = DichVu::find($request->id_dich_vu);
        if (!$dichVu) {
            return response()->json([
                'status'  => false,
                'message' => 'Dịch vụ không tồn tại!'
            ], 404);
        }
        $thuongHieu = ThuongHieu::find($dichVu->id_thuong_hieu);
        DanhGia::create([
            'id_khach_hang' => $khachHang->id,
            'id_dich_vu'    => $request->id_dich_vu,
            'muc_hai_long'  => $request->muc_hai_long,
            'noi_dung'      => $request->noi_dung,
        ]);
        // Tính điểm trung bình mới
        $tongDanhGia = DanhGia::where('id_dich_vu', $request->id_dich_vu)
            ->sum('muc_hai_long');
        $countDanhGia = DanhGia::where('id_dich_vu', $request->id_dich_vu)
            ->count();
        $dichVu->diem_hai_long = round($tongDanhGia / $countDanhGia, 1);
        $dichVu->save();
        // Cập nhật điểm trung bình cho thương hiệu
        $dichVuIds = DichVu::where('id_thuong_hieu', $thuongHieu->id)
            ->pluck('id');
        $diemHaiLongThuongHieu = DanhGia::whereIn('id_dich_vu', $dichVuIds)
            ->avg('muc_hai_long');
        $thuongHieu->diem_hai_long = round($diemHaiLongThuongHieu, 1);
        $thuongHieu->save();
        return response()->json([
            'status'  => true,
            'message' => 'Đánh giá dịch vụ thành công!',
        ]);
    }
}
