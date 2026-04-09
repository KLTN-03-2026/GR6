<?php

namespace App\Http\Controllers;

use App\Http\Requests\DanhMucDichVuRequest;
use App\Models\DanhMucDichVu;
use App\Models\KhachHang;
use App\Models\NhaCungCap;
use Illuminate\Http\Request;

class DanhMucDichVuController extends Controller
{
    public function destroyDanhMuc($id)
    {
        $danhMuc = DanhMucDichVu::where('id', $id)->first();
        if ($danhMuc) {
            $danhMuc->delete();
            return response()->json([
                'status' => true,
                'message' => 'Xóa danh mục dịch vụ thành công!',
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy danh mục dịch vụ!'
            ]);
        }
    }
    public function updateDanhMuc(DanhMucDichVuRequest $request)
    {
        $danhMuc = DanhMucDichVu::where('id', $request->id)->first();
        if ($danhMuc) {
            $danhMuc->update([
                'ten_dich_vu' => $request->ten_dich_vu,
                'id_father' => $request->id_father,
                'hinh_anh' => $request->hinh_anh,
            ]);
            $danhMuc->save();
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật danh mục dịch vụ thành công!',
                'data' => $danhMuc
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy danh mục dịch vụ!'
            ]);
        }
    }
    public function createDanhMuc(DanhMucDichVuRequest $request)
    {
        $danhMuc = DanhMucDichVu::create([
            'ten_dich_vu' => $request->ten_dich_vu,
            'id_father' => $request->id_father,
            'hinh_anh' => $request->hinh_anh,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Danh mục dịch vụ đã được tạo thành công!',
            'data' => $danhMuc
        ]);
    }

    public function getDanhMuc()
    {
        $data = DanhMucDichVu::get();
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }
   
}
