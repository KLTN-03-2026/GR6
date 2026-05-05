<?php

namespace App\Http\Controllers;

use App\Http\Requests\DatLichRequest;
use App\Models\ChiTietDatLich;
use App\Models\DatLich;
use App\Models\DichVu;
use App\Models\HinhAnhDichVu;
use App\Models\NhanVien;
use App\Models\ThanhToan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DatLichController extends Controller
{
    public function getDataChiTietDatLich($id_dat_lich)
    {
        $KhachHang = $this->isUserKhachHang();
        $data = ChiTietDatLich::where('id_dat_lich', $id_dat_lich)
            ->join('dich_vus', 'dich_vus.id', 'chi_tiet_dat_lichs.id_dich_vu')
            ->join('nhan_viens', 'nhan_viens.id', 'chi_tiet_dat_lichs.id_nhan_vien')
            ->select(
                'chi_tiet_dat_lichs.id',
                'dich_vus.ten_dich_vu',
                'nhan_viens.ten_nhan_vien',
                'chi_tiet_dat_lichs.dia_chi_thuc_hien',
                'chi_tiet_dat_lichs.gio_bat_dau',
                'chi_tiet_dat_lichs.ngay_dat_lich',
                'chi_tiet_dat_lichs.so_luong',
                'chi_tiet_dat_lichs.don_gia'
            )
            ->first();
    }
    // public function createDatLich(DatLichRequest $request)
    // {
    //     $KhachHang = $this->isUserKhachHang();
    //     if ($KhachHang) {
    //         $DatLich = DatLich::create([
    //             'id_khach_hang' => $KhachHang->id,
    //             'id_thuong_hieu' => $request->id_thuong_hieu,
    //             'ten_nguoi_dat' => $request->ten_nguoi_dat,
    //             'so_dien_thoai_nguoi_dat' => $request->so_dien_thoai_nguoi_dat,
    //             'ghi_chu' => $request->ghi_chu,
    //         ]);
    //         if ($request->id_nhan_vien) {
    //             $id_nhan_vien = $request->id_nhan_vien;
    //         } else {
    //             $id_nhan_vien = null;
    //         }
    //         ChiTietDatLich::create([
    //             'id_dat_lich' => $DatLich->id,
    //             'id_dich_vu' => $request->id_dich_vu,
    //             'id_nhan_vien' => $id_nhan_vien,
    //             'ma_hoa_don' => 'SH-' . str_pad($DatLich->id, 3, STR_PAD_LEFT) . '-' . rand(100, 999),
    //             'dia_chi_thuc_hien' => $request->dia_chi_thuc_hien,
    //             'gio_bat_dau' => $request->gio_bat_dau,
    //             'ngay_dat_lich' => $request->ngay_dat_lich,
    //             'so_luong' => $request->so_luong,
    //             'don_gia' => $request->don_gia,
    //         ]);
    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Đặt lịch thành công!',
    //         ]);
    //     } else {
    //         return response()->json([
    //             'message' => 'Bạn chưa đăng nhập!',
    //             'status'  => false
    //         ]);
    //     }
    // }
    public function createDatLich(DatLichRequest $request)
    {
        $KhachHang = $this->isUserKhachHang();

        if (!$KhachHang) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn chưa đăng nhập!'
            ]);
        }

        return DB::transaction(function () use ($request, $KhachHang) {

            $dichVu = DichVu::find($request->id_dich_vu);

            if (!$dichVu) {
                return response()->json([
                    'status' => false,
                    'message' => 'Dịch vụ không tồn tại!'
                ], 400);
            }

            $duration = $dichVu->thoi_gian_du_kien; // phút
            $buffer   = $dichVu->thoi_gian_dem ?? 0;

            if (!$duration || $duration <= 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Dịch vụ chưa có thời gian hợp lệ!'
                ], 400);
            }

            $start = Carbon::parse($request->ngay_dat_lich . ' ' . $request->gio_bat_dau);
            $end   = $start->copy()->addMinutes($duration);

            if ($start->lt(now())) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không thể đặt lịch trong quá khứ!'
                ], 400);
            }

            $checkStart = $start->copy()->subMinutes($buffer);
            $checkEnd   = $end->copy()->addMinutes($buffer);


            if ($request->id_nhan_vien) {

                $nhanVien = NhanVien::where('id', $request->id_nhan_vien)
                    ->where('id_thuong_hieu', $request->id_thuong_hieu)
                    ->where('trang_thai_lam_viec', 1)
                    ->lockForUpdate()
                    ->first();

                if (!$nhanVien) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Nhân viên không hợp lệ hoặc đang nghỉ!'
                    ], 400);
                }

                $busy = ChiTietDatLich::where('id_nhan_vien', $nhanVien->id)
                    ->where('ngay_dat_lich', $request->ngay_dat_lich)
                    ->whereRaw("
                    (
                        CONCAT(ngay_dat_lich, ' ', gio_bat_dau) < ?
                        AND
                        CONCAT(ngay_dat_lich, ' ', gio_ket_thuc) > ?
                    )
                ", [$checkEnd, $checkStart])
                    ->exists();

                if ($busy) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Nhân viên đã có lịch trong thời gian này!'
                    ], 400);
                }

                $id_nhan_vien = $nhanVien->id;
            } else {

                $nhanViens = NhanVien::where('id_thuong_hieu', $request->id_thuong_hieu)
->where('trang_thai_lam_viec', 1)
                    ->lockForUpdate()
                    ->get();

                $id_nhan_vien = null;

                foreach ($nhanViens as $nv) {

                    $busy = ChiTietDatLich::where('id_nhan_vien', $nv->id)
                        ->where('ngay_dat_lich', $request->ngay_dat_lich)
                        ->whereRaw("
                        (
                            CONCAT(ngay_dat_lich, ' ', gio_bat_dau) < ?
                            AND
                            CONCAT(ngay_dat_lich, ' ', gio_ket_thuc) > ?
                        )
                    ", [$checkEnd, $checkStart])
                        ->exists();

                    if (!$busy) {
                        $id_nhan_vien = $nv->id;
                        break;
                    }
                }

                if (!$id_nhan_vien) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Không có nhân viên rảnh!'
                    ], 400);
                }
            }

            $DatLich = DatLich::create([
                'id_khach_hang' => $KhachHang->id,
                'id_thuong_hieu' => $request->id_thuong_hieu,
                'ten_nguoi_dat' => $request->ten_nguoi_dat,
                'so_dien_thoai_nguoi_dat' => $request->so_dien_thoai_nguoi_dat,
                'ghi_chu' => $request->ghi_chu,
            ]);

            $ChiTietDatLich = ChiTietDatLich::create([
                'id_dat_lich' => $DatLich->id,
                'id_dich_vu' => $request->id_dich_vu,
                'id_nhan_vien' => $id_nhan_vien,
                'ma_hoa_don' => 'SH-' . str_pad($DatLich->id, 3, '0', STR_PAD_LEFT) . '-' . rand(100, 999),
                'dia_chi_thuc_hien' => $request->dia_chi_thuc_hien,
                'gio_bat_dau' => $start->format('H:i:s'),
                'gio_ket_thuc' => $end->format('H:i:s'),
                'ngay_dat_lich' => $request->ngay_dat_lich,
                'so_luong' => max(1, $request->so_luong),
                'don_gia' => $request->don_gia,
            ]);
            $thanhToan = ThanhToan::create([
                'ma_hoa_don'                  => $ChiTietDatLich->ma_hoa_don,
                'id_chi_tiet_dat_lich'        => $ChiTietDatLich->id_chi_tiet_dat_lich, // nếu có
                'tong_tien_thanh_toan'        => $ChiTietDatLich->don_gia * $ChiTietDatLich->so_luong, // tính tổng tiền dựa trên chi tiết đặt lịch
                'tong_tien_da_nhan'           => 0, // số tiền khách hàng đã thanh toán (nếu có)
                'trang_thai'                  => 0, // 0 = Chờ thanh toán
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Đặt lịch thành công!',
                'id_nhan_vien' => $id_nhan_vien,
                'dich_vu' => $dichVu->ten_dich_vu,
                'gio_bat_dau' => $start->format('H:i'),
                'gio_ket_thuc' => $end->format('H:i')
            ]);
        });
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
