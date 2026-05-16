<?php

namespace App\Http\Controllers;

use App\Models\HinhAnhDichVu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class HinhAnhDichVuController extends Controller
{

    public function getDichVuHinhAnhById($id)
    {
        $data = HinhAnhDichVu::where('id_dich_vu', $id)
            ->select('id_dich_vu', 'hinh_anh')->get();
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }

    
    public function getDichVuHinhAnh()
    {
        $data = HinhAnhDichVu::select('id_dich_vu', 'hinh_anh')->get();
        $data->transform(function ($item) {
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
            'data' => $data
        ]);
    }
}
