<?php

namespace App\Http\Controllers;

use App\Http\Requests\ThemMoiKhachHangRequest;
use App\Mail\KichHoatTaiKhoan;
use App\Mail\QuenMatKhau;
use App\Models\DatLich;
use App\Models\KhachHang;
use App\Models\NhanVien;
use App\Models\ThuongHieu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class KhachHangController extends Controller
{
    public function getThuongHieuData($id_thuong_hieu)
    {
        $thuongHieu = ThuongHieu::where('id', $id_thuong_hieu)
        ->first();
        if (!$thuongHieu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thương hiệu với ID đã cho.'
            ], 404);
        }

        if ($thuongHieu['logo']) {
        if (!filter_var($thuongHieu['logo'], FILTER_VALIDATE_URL)) {
            $thuongHieu['logo'] = asset('storage/' . $thuongHieu['logo']);
        }
    }
      
        return response()->json([
            'status' => true,
            'data' => $thuongHieu
        ]);
    }
    public function getNhanVienData($id)
    {
       $data = NhanVien::where('id_thuong_hieu', $id)
            ->select(
                'nhan_viens.id',
                'nhan_viens.ten_nhan_vien',
                'nhan_viens.hinh_anh',
                'nhan_viens.mo_ta_ngan',
                'nhan_viens.trang_thai_lam_viec',
                'nhan_viens.id_thuong_hieu'
            )
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
       public function update(Request $request)
{
    $KhachHang = $this->isUserKhachHang();

    if (!$KhachHang) {
        return response()->json([
            'message' => 'Không tìm thấy khách hàng!',
            'status'  => false
        ]);
    }

    // update basic info
    $KhachHang->ten_khach_hang = $request->ten_khach_hang;
    $KhachHang->so_dien_thoai  = $request->so_dien_thoai;
    $KhachHang->email          = $request->email;

    // password (chỉ khi có nhập)
    if ($request->password) {
        $KhachHang->password = bcrypt($request->password);
    }

    // avatar
    if ($request->hasFile('avatar')) {
        $file = $request->file('avatar');
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('avatar_khach_hang', $filename, 'public');

        if ($KhachHang->avatar && Storage::disk('public')->exists($KhachHang->avatar)) {
            Storage::disk('public')->delete($KhachHang->avatar);
        }

        $KhachHang->avatar = $path;
    }

    $KhachHang->save();

    // Quan trọng: Trả về link ảnh mới qua biến 'new_avatar'
    return response()->json([
        'message'    => 'Cập nhật thông tin thành công!',
        'status'     => true,
        'new_avatar' => asset('storage/' . $KhachHang->avatar) 
    ]);
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
     public function thongTinCaNhan()
{
    $KhachHang = $this->isUserKhachHang();

    if (!$KhachHang) {
        return response()->json([
            'status' => false,
            'message' => 'Không tìm thấy khách hàng'
        ]);
    }

    $data = [
        'ten_khach_hang' => $KhachHang->ten_khach_hang,
        'email'          => $KhachHang->email,
        'so_dien_thoai'  => $KhachHang->so_dien_thoai,
        'avatar'         => $KhachHang->avatar,
    ];

    // xử lý avatar
    if ($data['avatar']) {
        if (!filter_var($data['avatar'], FILTER_VALIDATE_URL)) {
            $data['avatar'] = asset('storage/' . $data['avatar']);
        }
    }

    return response()->json([
        'status' => true,
        'data' => $data
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
                    'id'        =>   $user->id,
                    'role'      =>   "khach_hang",
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
