<?php

namespace App\Http\Controllers;

use App\Models\ChiTietDatLich;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChiTietDatLichController extends Controller
{
  public function getChiTietLichHen($id_chi_tiet_dat_lich)
    {
        $data = ChiTietDatLich::where('id', $id_chi_tiet_dat_lich)
            ->join('dich_vus', 'dich_vus.id', 'chi_tiet_dat_lichs.id_dich_vu')
            ->join('thanh_toans', 'thanh_toans.id', 'chi_tiet_dat_lichs.id_thanh_toan')
            ->join('khach_hangs', 'khach_hangs.id', 'chi_tiet_dat_lichs.id_khach_hang')
            ->join('nhan_viens', 'nhan_viens.id', 'chi_tiet_dat_lichs.id_nhan_vien')
            ->join('nhan_viens', 'nhan_viens.id', 'chi_tiet_dat_lichs.id_nhan_vien')
            ->select(
                'dich_vus.ten_dich_vu',
                'dich_vus.don_gia',
                'dich_vus.thoi_gian_du_kien',
                'dich_vus.hinh_anh as hinh_anh_dich_vu',
                'khach_hangs.ten_khach_hang',
                'chi_tiet_dat_lichs.ngay_dat_lich',
                'chi_tiet_dat_lichs.gio_bat_dau',
                'chi_tiet_dat_lichs.gio_ket_thuc',
                'nhan_viens.ten_nhan_vien',
                'nhan_viens.hinh_anh as hinh_anh_nhan_vien',
                'thanh_toans.ma_hoa_don',
                'thanh_toans.tong_tien_thanh_toan',
                'thanh_toans.tong_tien_da_nhan',
                DB::raw('thanh_toans.tong_tien_thanh_toan - thanh_toans.tong_tien_da_nhan as tong_tien_con_lai'),
                'dat_lichs.ghi_chu',
                'chi_tiet_dat_lichs.id as id_chi_tiet_dat_lich',
                'dat_lichs.id as id_dat_lich'

            )
            ->first();
        if ($data) {
            if (filter_var($data->hinh_anh_nhan_vien, FILTER_VALIDATE_URL)) {
                $data->hinh_anh_nhan_vien = $data->hinh_anh_nhan_vien;
            } else {
                $data->hinh_anh_nhan_vien = asset('storage/' . $data->hinh_anh_nhan_vien);
            }
        }
        if ($data) {
            if (filter_var($data->hinh_anh_dich_vu, FILTER_VALIDATE_URL)) {
                $data->hinh_anh_dich_vu = $data->hinh_anh_dich_vu;
            } else {
                $data->hinh_anh_dich_vu = asset('storage/' . $data->hinh_anh_dich_vu);
            }
        }

        return response()->json([
            'status' => true,
            'data'   => $data
        ]);
    }
}
