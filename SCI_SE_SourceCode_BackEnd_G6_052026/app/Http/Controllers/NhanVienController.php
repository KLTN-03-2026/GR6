<?php

namespace App\Http\Controllers;

use App\Models\ChiTietDatLich;
use App\Models\NhanVien;
use Illuminate\Http\Request;

class NhanVienController extends Controller
{
    public function WorkingHours(Request $request, $id)
    {
        $ngay_dat = $request->date;

        $data = ChiTietDatLich::where('id_nhan_vien', $id)
            ->when($ngay_dat, function ($query) use ($ngay_dat) {
                return $query->where('ngay_dat_lich', $ngay_dat);
            })
            ->select(
                'id_nhan_vien', 
                'gio_bat_dau',
                'gio_ket_thuc',
                'ngay_dat_lich'
            )
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Lấy dữ liệu thời gian bận thành công!',
            'data' => $data
        ]);
    }
}