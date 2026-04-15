<?php

namespace App\Http\Controllers;

use App\Http\Requests\DanhMucDichVuRequest;
use App\Models\DanhMucDichVu;
use App\Models\KhachHang;
use App\Models\NhaCungCap;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DanhMucDichVuController extends Controller
{
    public function getDanhMucCha()
    {
        $data = DanhMucDichVu::where('id_father', 0)->get();
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }
    public function getCountDanhMuc()
    {
        $danh_muc_cha = DanhMucDichVu::where('id_father', 0)->count();
        $danh_muc_con = DanhMucDichVu::where('id_father', '!=', 0)->count();
        $danh_muc_hoat_dong = DanhMucDichVu::where('trang_thai', 1)->count();
        $danh_muc_khong_hoat_dong = DanhMucDichVu::where('trang_thai', 0)->count();

        return response()->json([
            'status' => true,
            'data' => [
                'danh_muc_cha' => $danh_muc_cha,
                'danh_muc_con' => $danh_muc_con,
                'danh_muc_hoat_dong' => $danh_muc_hoat_dong,
                'danh_muc_khong_hoat_dong' => $danh_muc_khong_hoat_dong
            ]
        ]);
    }
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
        $request->validate([
            'hinh_anh.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $filename = Str::uuid() . '.' . $request->file('hinh_anh')->getClientOriginalExtension();
        $path = $request->file('hinh_anh')->storeAs('hinh_anh_danh_muc', $filename, 'public');
        $danhMuc = DanhMucDichVu::create([
            'ten_dich_vu' => $request->ten_dich_vu,
            'id_father' => $request->id_father,
            'hinh_anh' => $path,
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
