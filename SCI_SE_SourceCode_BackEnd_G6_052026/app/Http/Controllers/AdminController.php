<?php

namespace App\Http\Controllers;

use App\Http\Requests\DanhMucDichVuRequest;
use App\Models\Admin;
use App\Models\DanhMucDichVu;
use App\Models\KhachHang;
use App\Models\NhaCungCap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function search($keyword)
    {
        $customers = KhachHang::where('ten_khach_hang', 'like', "%$keyword%")
            ->orWhere('email', 'like', "%$keyword%")
            ->get();

        $providers = NhaCungCap::where('ten_nha_cung_cap', 'like', "%$keyword%")
            ->orWhere('email', 'like', "%$keyword%")
            ->get();

        return response()->json([
            'status' => true,
            'customers' => $customers,
            'providers' => $providers
        ]);
    }
    public function blockProvider($id)
    {
        $provider = NhaCungCap::where('id', $id)->first();
        if ($provider) {
            $provider->is_blocked = !$provider->is_blocked; // Đảo ngược trạng thái block
            $provider->save();
            return response()->json([
                'status' => true,
                'message' => $provider->is_blocked ? 'Nhà cung cấp đã bị block.' : 'Nhà cung cấp đã được unblock.'
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy nhà cung cấp.'
            ]);
        }
    }
    public function blockCustomer($id)
    {
        $customer = KhachHang::where('id', $id)->first();
        if ($customer) {
            $customer->is_blocked = !$customer->is_blocked; // Đảo ngược trạng thái block
            $customer->save();
            return response()->json([
                'status' => true,
                'message' => $customer->is_blocked ? 'Khách hàng đã bị block.' : 'Khách hàng đã được unblock.'
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy khách hàng.'
            ]);
        }
    }
    public function getAllProviders()
    {
        $data = NhaCungCap::get();
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }

    public function getAllCustomers()
    {
        $data = KhachHang::get();
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }
    public function checkLogin()
    {
        $Admin = $this->isUserAdmin();
        if ($Admin) {
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
        $check = Auth::guard('admin')->attempt([
            'username'    => $request->username,
            'password'    => $request->password
        ]);
        if ($check) {
            $user = Auth::guard('admin')->user();
            return response()->json([
                'message'   =>   'Đã đăng nhập thành công!',
                'status'    =>   1,
                'username'      =>   $user->username,
                'admin_access_token'     =>   $user->createToken('auth_token')->plainTextToken

            ]);
        } else {
            return response()->json([
                'message'  =>   'Tài khoản hoặc mật khẩu không đúng!',
                'status'   =>   0
            ]);
        }
    }
}
