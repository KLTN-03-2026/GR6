<?php

namespace App\Http\Controllers;

use App\Models\DatLich;
use Illuminate\Http\Request;

class DatLichController extends Controller
{
    public function createDatLich(Request $request) // hàm này chưa xong, chờ ux ui
    {
        $KhachHang = $this->isUserKhachHang();
        if ($KhachHang) {
             DatLich::create([
                'khach_hang_id' => $KhachHang->id,
                'dich_vu_id' => $request->dich_vu_id,
                'ngay_dat' => $request->ngay_dat,
                'gio_dat' => $request->gio_dat,
                'trang_thai' => 0, // 0: mới đặt, 1: đã xác nhận, 2: đã hoàn thành, 3: đã hủy
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Đặt lịch thành công!',
            ]);
        } else {
            return response()->json([
                'message' => 'Bạn chưa đăng nhập!',
                'status'  => false
            ]);
        }
    }
    public function getDataDatLich()
    {
        $KhachHang = $this->isUserKhachHang();
        if ($KhachHang) {
            $data = DatLich::where('khach_hang_id', $KhachHang->id)->get();
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        } else {
            return response()->json([
                'message' => 'Bạn chưa đăng nhập!',
                'status'  => false
            ]);
        }
    }
}
