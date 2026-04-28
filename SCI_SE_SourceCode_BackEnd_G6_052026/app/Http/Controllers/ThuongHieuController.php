<?php

namespace App\Http\Controllers;

use App\Models\DichVu;
use App\Models\NhanVien;
use App\Models\ThuongHieu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ThuongHieuController extends Controller
{
    public function destroyNhanVien($id)
    {
        $nhanVien = NhanVien::where('id', $id)->first();
        if ($nhanVien) {
            //xóa hình ảnh cũ
            Storage::disk('public')->delete($nhanVien->hinh_anh);
            $nhanVien->delete();
            return response()->json([
                'status' => true,
                'message' => 'Xóa nhân viên thành công!',
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy nhân viên!'
            ]);
        }
    }
    public function changeStauts($id)
    {
        $nhanVien = NhanVien::where('id', $id)->first();
        if ($nhanVien) {
            $nhanVien->trang_thai_lam_viec = !$nhanVien->trang_thai_lam_viec; //đảo ngược trạng thái
            $nhanVien->save();
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật trạng thái nhân viên thành công!',
                'data' => $nhanVien
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy nhân viên!'
            ]);
        }
    }
    public function updateNhanVien(Request $request)
    {
        $nhanVien = NhanVien::where('id', $request->id)->first();
        //xóa hình ảnh cũ
        Storage::disk('public')->delete($nhanVien->hinh_anh);
        //tạo path ảnh mới
        $filename = Str::uuid() . '.' . $request->file('hinh_anh')->getClientOriginalExtension();
        $path = $request->file('hinh_anh')->storeAs('hinh_anh_nhan_vien', $filename, 'public');
        
        if ($nhanVien) {
            $nhanVien->update([
                'ten_nhan_vien' => $request->ten_nhan_vien,
                'hinh_anh' => $path,
                'mo_ta_ngan' => $request->mo_ta_ngan,
            ]);
            $nhanVien->save();
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật nhân viên thành công!',
                'data' => $nhanVien
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy nhân viên!'
            ]);
        }
    }
    public function createNhanVien(Request $request)
    {
        $filename = Str::uuid() . '.' . $request->file('hinh_anh')->getClientOriginalExtension();
        $path = $request->file('hinh_anh')->storeAs('hinh_anh_nhan_vien', $filename, 'public');
        $data = NhanVien::create([
            'id_thuong_hieu' => $request->id_thuong_hieu,
            'ten_nhan_vien' => $request->ten_nhan_vien,
            'hinh_anh' => $path,
            'mo_ta_ngan' => $request->mo_ta_ngan,
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Thêm mới nhân viên thành công!',
            'data' => $data
        ]);
    }
    public function getDataNhanVien($id_dich_vu)
    {
        $data = DichVu::where('dich_vus.id', $id_dich_vu)
            ->join('thuong_hieus', 'thuong_hieus.id', 'dich_vus.id_thuong_hieu')
            ->join('nhan_viens', 'nhan_viens.id_thuong_hieu', 'thuong_hieus.id')
            ->select('nhan_viens.id', 'nhan_viens.ten_nhan_vien', 'nhan_viens.hinh_anh', 'nhan_viens.mo_ta_ngan', 'nhan_viens.trang_thai_lam_viec')
            ->get();
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
        if ($data->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy nhân viên nào cho dịch vụ với ID đã cho.'
            ], 404);
        } else {
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        }
    }
}
