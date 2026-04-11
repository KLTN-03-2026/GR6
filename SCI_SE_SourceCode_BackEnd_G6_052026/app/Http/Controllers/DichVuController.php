<?php

namespace App\Http\Controllers;

use App\Models\DichVu;
use App\Models\HinhAnhDichVu;
use Illuminate\Http\Request;

class DichVuController extends Controller
{
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
            ->select('dich_vus.id', 'dich_vus.ten_dich_vu', 'dich_vus.mo_ta_ngan', 'dich_vus.mo_ta_chi_tiet', 'dich_vus.gia_tien', 'dich_vus.hinh_anh')
            ->first();
        if (!$dichVu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dịch vụ với ID đã cho.'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $dichVu
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
