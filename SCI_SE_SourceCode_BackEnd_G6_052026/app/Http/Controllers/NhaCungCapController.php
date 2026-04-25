<?php

namespace App\Http\Controllers;

use App\Http\Requests\ThemMoiNCCRequest;
use App\Mail\KichHoatTaiKhoan;
use App\Mail\KichHoatTaiKhoanNCC;
use App\Mail\QuenMatKhau;
use App\Models\KhachHang;
use App\Models\NhaCungCap;
use App\Models\ThuongHieu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class NhaCungCapController extends Controller
{
    public function upDate(Request $request)
    {
        $NhaCungCap = $this->isUserNhaCungCap();
        if ($NhaCungCap) {
            $NhaCungCap->update([
                'ten_nha_cung_cap' => $request->ten_nha_cung_cap,
                'so_dien_thoai'  => $request->so_dien_thoai,
                'email'          => $request->email,
                'dia_chi'        => $request->dia_chi,
                'avatar'         => $request->avatar,
                'password'       => bcrypt($request->password),
            ]);
            $NhaCungCap->save();
            return response()->json([
                'message' => 'Cập nhật thông tin thành công!',
                'status'  => true
            ]);
        } else {
            return response()->json([
                'message' => 'Không tìm thấy nhà cung cấp!',
                'status'  => false
            ]);
        }
    }
    public function checkLogin()
    {
        $NhaCungCap = $this->isUserNhaCungCap();
        if ($NhaCungCap) {
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
    public function thongTinCaNhan()
    {
        $NhaCungCap = $this->isUserNhaCungCap()->select('ten_nha_cung_cap', 'email', 'so_dien_thoai', 'avatar', 'dia_chi')->first();
        return response()->json([
            'data' => $NhaCungCap
        ]);
    }
    public function quenMatKhau(Request $request)
    {
        $new_password = str::random(8);
        $NhaCungCap = NhaCungCap::where('email', $request->email)->first();
        if ($NhaCungCap) {
            $NhaCungCap->password = bcrypt($new_password);
            $NhaCungCap->save();
            Mail::to($NhaCungCap->email)->queue(new QuenMatKhau($new_password, $NhaCungCap->ten_nha_cung_cap));
            return response()->json([
                'message' => 'Đã cấp lại mật khẩu mới, vui lòng kiểm tra email!',
                'status'  => true
            ]);
        } else {
            $khachHang = KhachHang::where('email', $request->email)->first();
            if ($khachHang) {
                $khachHang->password = bcrypt($new_password);
                $khachHang->save();
                Mail::to($khachHang->email)->queue(new QuenMatKhau($new_password, $khachHang->ten_khach_hang));
                return response()->json([
                    'message' => 'Đã cấp lại mật khẩu mới, vui lòng kiểm tra email!',
                    'status'  => true
                ]);
            } else {
                return response()->json([
                    'message' => 'Email sai hoặc chưa đăng ký trên hệ thống!',
                    'status'  => false
                ]);
            }
        }
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
        $check = Auth::guard('nha_cung_cap')->attempt([
            'email'    => $request->email,
            'password' => $request->password
        ]);
        if ($check) {
            $user = Auth::guard('nha_cung_cap')->user();
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
                    'chia_khoa' =>   $user->createToken('ma_so_bi_mat_ncc')->plainTextToken,
                    'ten_ncc'   =>   $user->ten_nha_cung_cap,
                    'role'      =>   "nha_cung_cap"
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
        $NhaCungCap = NhaCungCap::where('hash_active', $hash_active)->where('is_active', 0)->first();
        if ($NhaCungCap) {
            $NhaCungCap->is_active = 1;
            $NhaCungCap->hash_active = null;
            $NhaCungCap->save();
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
    public function create(ThemMoiNCCRequest $request)
    {
        $ma_so_thue = $request->ma_so_thue;
        // $check_mst = Http::get("https://api.xinvoice.vn/gdt-api/tax-payer/" . $ma_so_thue);
        
        foreach ($request->file('logo') as $file) {

            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

            $logo = $file->storeAs('logo_thuong_hieu', $filename, 'public');
        }

        $ncc = NhaCungCap::create([
            'ten_nha_cung_cap' => $request->ten_nha_cung_cap,
            'so_dien_thoai'  => $request->so_dien_thoai,
            'email'          => $request->email,
            'password'       => bcrypt($request->password),
            'hash_active'    => Str::uuid(),
        ]);
        ThuongHieu::create([
            'ten_thuong_hieu'           => $request->ten_thuong_hieu,
            'id_nha_cung_cap'           => $ncc->id,
            'id_danh_muc_dich_vu'       => $request->id_danh_muc_dich_vu,
            'ma_so_thue'                => $ma_so_thue,
            'ma_bin_ngan_hang'          => $request->ma_bin_ngan_hang,
            'tai_khoan_ngan_hang'       => $request->tai_khoan_ngan_hang,
            'dia_chi'                   => $request->dia_chi,
            'logo'                      => $logo,

        ]);
        Mail::to($ncc->email)->queue(new KichHoatTaiKhoanNCC($ncc->hash_active, $ncc->ten_nha_cung_cap));

        return response()->json([
            'message' => 'Tạo tài khoản thành công!',
            'status'  => true
        ]);
    }
}
