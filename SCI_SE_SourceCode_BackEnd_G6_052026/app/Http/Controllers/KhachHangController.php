<?php

namespace App\Http\Controllers;

use App\Http\Requests\ThemMoiKhachHangRequest;
use App\Mail\KichHoatTaiKhoan;
use App\Mail\QuenMatKhau;
use App\Models\KhachHang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class KhachHangController extends Controller
{
    public function upDate(Request $request)
    {
        $KhachHang = $this->isUserKhachHang();
        if ($KhachHang) {
            $KhachHang->update([
                'ten_khach_hang' => $request->ten_khach_hang,
                'so_dien_thoai'  => $request->so_dien_thoai,
                'email'          => $request->email,
                'avatar'         => $request->avatar,
                'password'       =>bcrypt($request->password),
            ]);
            $KhachHang->save();
            return response()->json([
                'message' => 'Cập nhật thông tin thành công!',
                'status'  => true
            ]);
        } else {
            return response()->json([
                'message' => 'Không tìm thấy khách hàng!',
                'status'  => false
            ]);
        }
    }
    public function checkLogin()
    {
        $KhachHang = $this->isUserKhachHang();
        if ($KhachHang) {
            return response()->json([
                'status' => true,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => "Bạn chưa đăng nhập!"
            ]);
        }
    }
    public function thongTinCaNhan() {
        $KhachHang=$this->isUserKhachHang()->select('ten_khach_hang','email','so_dien_thoai','avatar')->first();
        return response()->json([
            'data' => $KhachHang
        ]);
    }
    public function dangXuat(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => true,
            'message' => "Đã đăng xuất thành công"
        ]);
    }
    public function dangNhap(Request $request)
    {
        $check = Auth::guard('khach_hang')->attempt([
            'email'    => $request->email,
            'password' => $request->password
        ]);
        if ($check) {
            $user = Auth::guard('khach_hang')->user();
            if ($user->is_active == 0) {
                return response()->json([
                    'message'  =>   'Tài khoản của bạn chưa được kích hoạt!',
                    'status'   =>   2
                ]);
            } else {
                if ($user->is_blocked) {
                    return response()->json([
                        'message'  =>   'Tài khoản của bạn đã bị khóa!',
                        'status'   =>   0
                    ]);
                }

                return response()->json([
                    'message'   =>   'Đã đăng nhập thành công!',
                    'status'    =>   1,
                    'chia_khoa' =>   $user->createToken('ma_so_bi_mat_khach_hang')->plainTextToken,
                    'ten_kh'    =>   $user->ten_khach_hang,
                    'role'      =>   "khach_hang"
                ]);
            }
        } else {
            return response()->json([
                'message'  =>   'Tài khoản hoặc mật khẩu không đúng!',
                'status'   =>   0
            ]);
        }
    }
    public function kichHoat($hash_active)
    {
        $KhachHang = KhachHang::where('hash_active', $hash_active)->where('is_active', 0)->first();
        if ($KhachHang) {
            $KhachHang->is_active = 1;
            $KhachHang->hash_active = null;
            $KhachHang->save();
            return redirect('http://localhost:3000/dang-nhap'); //route tới trang xác nhận thành công nhé
                return response()->json([
                    'status' => true,
                    'message' => 'Kích hoạt tài khoản thành công!'
                ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => "Tài khoản bạn đã được kích hoạt hoặc không tồn tại!"
            ]);
        }
    }
    public function create(ThemMoiKhachHangRequest $request)
    {
        $KhachHang = KhachHang::create([
            'ten_khach_hang' => $request->ten_khach_hang,
            'so_dien_thoai'  => $request->so_dien_thoai,
            'email'          => $request->email,
            'password'       => bcrypt($request->password),
            'hash_active'    => Str::uuid(),
        ]);
        Mail::to($KhachHang->email)->queue(new KichHoatTaiKhoan($KhachHang->hash_active, $KhachHang->ten_khach_hang));

        return response()->json([
            'message' => 'Tạo tài khoản thành công!',
            'status'  => true
        ]);
    }
}
