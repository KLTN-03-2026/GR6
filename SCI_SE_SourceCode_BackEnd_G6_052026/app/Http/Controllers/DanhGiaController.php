<?php

namespace App\Http\Controllers;

use App\Models\DanhGia;
use Illuminate\Http\Request;

class DanhGiaController extends Controller
{
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
        $KhachHang = $this->isUserKhachHang();
        if ($KhachHang) {
            DanhGia::create([
                'id_khach_hang' => $KhachHang->id,
                'id_dich_vu' => $request->id_dich_vu,
                'muc_hai_long' => $request->muc_hai_long,
                'noi_dung' => $request->noi_dung,
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Đánh giá dịch vụ thành công!',
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Vui lòng đăng nhập để đánh giá dịch vụ!'
            ], 401);
        }
    }
}
