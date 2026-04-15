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

    public function create(Request $request)
    {
        $request->validate([
            // 'id_dich_vu' => 'required|exists:dich_vus,id',
            'hinh_anh.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        foreach ($request->file('hinh_anh') as $file) {

            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

            $path = $file->storeAs('hinh_anh_dich_vu', $filename, 'public');

            HinhAnhDichVu::create([
                'id_dich_vu' => 1, // tạm thời gán id_dich_vu là 1, bạn có thể thay đổi logic này để lấy id_dich_vu từ request nếu cần
                'hinh_anh'   => $path
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Upload ảnh thành công',
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
