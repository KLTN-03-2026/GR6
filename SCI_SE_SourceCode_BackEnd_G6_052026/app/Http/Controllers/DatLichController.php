<?php

namespace App\Http\Controllers;

use App\Http\Requests\DatLichRequest;
use App\Models\ChiTietDatLich;
use App\Models\DatLich;
use App\Models\HinhAnhDichVu;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DatLichController extends Controller
{
    public function getDataChiTietDatLich($id_dat_lich)
    {
        $KhachHang = $this->isUserKhachHang();
    }
    public function createDatLich(DatLichRequest $request)
    {
        $KhachHang = $this->isUserKhachHang();
        if ($KhachHang) {
            $DatLich = DatLich::create([
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
                'id_dat_lich' => $DatLich->id,
                'id_dich_vu' => $request->id_dich_vu,
                'id_nhan_vien' => $id_nhan_vien,
                'ma_hoa_don' => 'SH-' . now()->format('dmY') . '-' . str_pad($DatLich->id, 3, STR_PAD_LEFT) . '-' . rand(100, 999),
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
            $data = DatLich::where('id_khach_hang', $KhachHang->id)
                ->join('thuong_hieus', 'thuong_hieus.id', 'dat_lichs.id_thuong_hieu')
                ->join('chi_tiet_dat_lichs', 'chi_tiet_dat_lichs.id_dat_lich', 'dat_lichs.id')
                ->join('dich_vus', 'dich_vus.id', 'chi_tiet_dat_lichs.id_dich_vu')
                ->select(
                    'dat_lichs.id',
                    'dich_vus.ten_dich_vu',
                    'thuong_hieus.ten_thuong_hieu',
                    'chi_tiet_dat_lichs.ngay_dat_lich',
                    'chi_tiet_dat_lichs.gio_bat_dau',
                    'dat_lichs.trang_thai_dat_lich'
                )
                ->get();
            $id_dich_vu = DatLich::where('id_khach_hang', $KhachHang->id)
                ->join('thuong_hieus', 'thuong_hieus.id', 'dat_lichs.id_thuong_hieu')
                ->join('chi_tiet_dat_lichs', 'chi_tiet_dat_lichs.id_dat_lich', 'dat_lichs.id')
                ->join('dich_vus', 'dich_vus.id', 'chi_tiet_dat_lichs.id_dich_vu')
                ->select(
                    'dich_vus.id',
                )
                ->first();

            $hinhanh = HinhAnhDichVu::where('id_dich_vu', $id_dich_vu->id)
                ->first();
            $hinhanh->transform(function ($item) {
                // Nếu hinh_anh đã là URL (bắt đầu bằng http:// hoặc https://)
                if (filter_var($item->hinh_anh, FILTER_VALIDATE_URL)) {
                    $item->hinh_anh = $item->hinh_anh;  // giữ nguyên link
                } else {
                    // Ngược lại, coi như đường dẫn local trong disk 'public'
                    $item->hinh_anh = asset('storage/' . $item->hinh_anh);
                }
                return $item;
            });
            return response()->json([
                'status' => true,
                'data' => $data,
                'hinh_anh' => $hinhanh->hinh_anh
            ]);
        } else {
            return response()->json([
                'message' => 'Bạn chưa đăng nhập!',
                'status'  => false
            ]);
        }
    }
}
