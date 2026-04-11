<?php

namespace App\Http\Controllers;

use App\Models\HinhAnhDichVu;
use Illuminate\Http\Request;
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
            'id_dich_vu' => 'required|exists:dich_vus,id',
            'hinh_anh'   => 'required|array',
            'hinh_anh.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        foreach ($request->file('hinh_anh') as $file) {

            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

            $path = $file->storeAs('hinh_anh_dich_vu', $filename, 'public');

            HinhAnhDichVu::create([
                'id_dich_vu' => $request->id_dich_vu,
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
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }
}
