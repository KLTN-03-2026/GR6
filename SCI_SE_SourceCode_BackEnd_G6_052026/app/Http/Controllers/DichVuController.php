<?php

namespace App\Http\Controllers;

use App\Models\DichVu;
use Illuminate\Http\Request;

class DichVuController extends Controller
{
    public function timKiemDichVu($keyword)
    {
        $data = DichVu::where('ten_dich_vu', 'LIKE', '%' . $keyword . '%')->get();
        if ($data->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dịch vụ nào phù hợp với từ khóa.'
            ], 404);
        } else {

            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        }
    }
}
