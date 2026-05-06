<?php

namespace App\Http\Controllers;

use App\Http\Requests\DanhMucDichVuRequest;
use App\Models\DanhMucDichVu;
use App\Models\KhachHang;
use App\Models\NhaCungCap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
    public function updateDanhMuc(Request $request)
    {
        $danhMuc = DanhMucDichVu::find($request->id);

        if (!$danhMuc) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy danh mục dịch vụ!'
            ], 404);
        }

        return DB::transaction(function () use ($request, $danhMuc) {

            $dataUpdate = [
                'ten_dich_vu' => $request->ten_dich_vu,
                'id_father'   => $request->id_father,
            ];

            if ($request->hasFile('hinh_anh')) {

                $file = $request->file('hinh_anh');

                $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

                $path = $file->storeAs('hinh_anh_danh_muc', $filename, 'public');

                if ($danhMuc->hinh_anh && Storage::disk('public')->exists($danhMuc->hinh_anh)) {
                    Storage::disk('public')->delete($danhMuc->hinh_anh);
                }

                $dataUpdate['hinh_anh'] = $path;
            }
            $danhMuc->update($dataUpdate);

            return response()->json([
                'status' => true,
                'message' => 'Cập nhật danh mục dịch vụ thành công!',
                'data' => $danhMuc
            ]);
        });
    }

    public function createDanhMuc(DanhMucDichVuRequest $request)
    {
        $filename = Str::uuid() . '.' . $request->file('hinh_anh')->getClientOriginalExtension();
        $path = $request->file('hinh_anh')->storeAs('hinh_anh_danh_muc', $filename, 'public');
        DanhMucDichVu::create([
            'ten_dich_vu' => $request->ten_dich_vu,
            'id_father' => $request->id_father,
            'hinh_anh' => $path,
            'trang_thai' => 1
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Danh mục dịch vụ đã được tạo thành công!',
        ]);
    }

   public function getDanhMuc()
    {
        $data = DanhMucDichVu::get()->map(function ($item) {

            if ($item->hinh_anh) {

                if (filter_var($item->hinh_anh, FILTER_VALIDATE_URL)) {
                    $item->hinh_anh = $item->hinh_anh;
                } 
                else {
                    $item->hinh_anh = asset('storage/' . $item->hinh_anh);
                }
            }

            return $item;
        });

        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }
}
