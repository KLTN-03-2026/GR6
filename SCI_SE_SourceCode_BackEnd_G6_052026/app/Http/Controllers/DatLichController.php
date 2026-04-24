<?php

namespace App\Http\Controllers;

use App\Http\Requests\DatLichRequest;
use App\Models\ChiTietDatLich;
use App\Models\DatLich;
use Illuminate\Http\Request;

class DatLichController extends Controller
{
    public function createDatLich(DatLichRequest $request) // hàm này chưa xong, chờ ux ui
    {
        $KhachHang = $this->isUserKhachHang();
        if ($KhachHang) {
            $Lich = DatLich::create([
                'id_khach_hang' => $KhachHang->id,
                'id_thuong_hieu' => $request->id_thuong_hieu,
                'ten_nguoi_dat' => $request->ten_nguoi_dat,
                'so_dien_thoai_nguoi_dat' => $request->so_dien_thoai_nguoi_dat,
                'ghi_chu' => $request->ghi_chu,
            ]);
            if ($request->id_nhan_vien) {
                $id_nhan_vien = $request->id_nhan_vien;
            } else {
                $id_nhan_vien = null;
            }
            ChiTietDatLich::create([
                'id_dat_lich' => $Lich->id,
                'id_dich_vu' => $request->id_dich_vu,
                'id_nhan_vien' => $id_nhan_vien,
                'dia_chi_thuc_hien' => $request->dia_chi_thuc_hien,
                'gio_bat_dau' => $request->gio_bat_dau,
                'ngay_dat_lich' => $request->ngay_dat_lich,
                'so_luong' => $request->so_luong,
                'don_gia' => $request->don_gia,
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
            $data = DatLich::where('id_khach_hang', $KhachHang->id)->get();
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
