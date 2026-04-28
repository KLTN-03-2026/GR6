<?php

namespace App\Http\Controllers;

use App\Models\DichVu;
use App\Models\HinhAnhDichVu;
use Illuminate\Http\Request;

class DichVuController extends Controller
{

    public function getThuongHieu($id)
    {
        $ThuongHieu = DichVu::where('dich_vus.id', $id)
            ->join('thuong_hieus', 'thuong_hieus.id', 'dich_vus.id_thuong_hieu')
            ->select('thuong_hieus.id', 'thuong_hieus.ten_thuong_hieu', 'thuong_hieus.dia_chi', 'thuong_hieus.logo')
            ->first();
        if (!$ThuongHieu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thương hiệu cho dịch vụ với ID đã cho.'
            ], 404);
        } else {
            return response()->json([
                'status' => true,
                'data' => $ThuongHieu
            ]);
        }
    }
    public function getDichVu()
    {
        $dichVu = DichVu::get();
        return response()->json([
            'status' => true,
            'data' => $dichVu
        ]);
    }
    public function chiTietDichVu($id)
    {
        $dichVu = DichVu::where('id', $id)
            ->select('dich_vus.id', 'dich_vus.ten_dich_vu', 'dich_vus.mo_ta_ngan', 'dich_vus.mo_ta_dai', 'dich_vus.don_gia', 'dich_vus.thoi_gian_du_kien')
            ->first();
        $hinhAnhDichVu = HinhAnhDichVu::where('id_dich_vu', $id)
            ->select('hinh_anh_dich_vus.id', 'hinh_anh_dich_vus.id_dich_vu', 'hinh_anh_dich_vus.hinh_anh')
            ->get();
        $hinhAnhDichVu->transform(function ($item) {
            // Nếu hinh_anh đã là URL (bắt đầu bằng http:// hoặc https://)
            if (filter_var($item->hinh_anh, FILTER_VALIDATE_URL)) {
                $item->hinh_anh = $item->hinh_anh;  // giữ nguyên link
            } else {
                // Ngược lại, coi như đường dẫn local trong disk 'public'
                $item->hinh_anh = asset('storage/' . $item->hinh_anh);
            }
            return $item;
        });
        if (!$dichVu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dịch vụ với ID đã cho.'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $dichVu,
            'data_hinh_anh' => $hinhAnhDichVu

        ]);
    }
    public function timKiemDichVu($keyword)
    {
        $data = DichVu::where('ten_dich_vu', 'LIKE', '%' . $keyword . '%')->get();
        if ($data->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dịch vụ nào phù hợp với từ khóa.'
            ], 404);
        } else {

            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        }
    }
}
