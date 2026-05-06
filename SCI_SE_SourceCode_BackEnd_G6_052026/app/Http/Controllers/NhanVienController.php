<?php

namespace App\Http\Controllers;

use App\Models\ChiTietDatLich;
use App\Models\NhanVien;
use Illuminate\Http\Request;

class NhanVienController extends Controller
{
    public function WorkingHours(Request $request, $id)
    {
        // 1. Lấy ngày từ params (date=YYYY-MM-DD)
        $ngay_dat = $request->date;

        // 2. Query lịch bận và PHẢI lọc theo ngày
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

        // 3. Nếu chọn "Hệ thống chọn" ($id = 0), bạn có thể xử lý trả về rỗng 
        // hoặc logic riêng tùy bạn. Ở đây tôi để mặc định theo query.

        return response()->json([
            'status' => true,
            'message' => 'Lấy dữ liệu thời gian bận thành công!',
            'data' => $data
        ]);
    }
}