<?php

namespace App\Http\Controllers;

use App\Http\Requests\DanhMucDichVuRequest;
use App\Models\Admin;
use App\Models\DanhMucDichVu;
use App\Models\KhachHang;
use App\Models\NhaCungCap;
use App\Models\ThanhToan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
     public function thongKeDoanhThu()
    {
        // Tổng doanh thu
        $tongDoanhThu = ThanhToan::where('trang_thai', '!=', 3)
            ->sum('tong_tien_da_nhan');
        // Tổng nhà cung cấp
        $countNCC = NhaCungCap::count();
        // Tổng khách hàng
        $countKH = KhachHang::count();
        // Doanh thu theo danh mục
       $doanhThuTheoDanhMuc = DanhMucDichVu::from('danh_muc_dich_vus as cha')

    ->leftJoin(
        'danh_muc_dich_vus as con',
        'con.id_father',
        '=',
        'cha.id'
    )

    ->leftJoin(
        'dich_vus',
        'dich_vus.id_danh_muc_dich_vu',
        '=',
        'con.id'
    )

    // chi tiết đặt lịch
    ->leftJoin(
        'chi_tiet_dat_lichs',
        'chi_tiet_dat_lichs.id_dich_vu',
        '=',
        'dich_vus.id'
    )

    // thanh toán
    ->leftJoin(
        'thanh_toans',
        'thanh_toans.id_chi_tiet_dat_lich',
        '=',
        'chi_tiet_dat_lichs.id'
    )

    // chỉ lấy danh mục cha
    ->where('cha.id_father', 0)

    ->groupBy(
        'cha.id',
        'cha.ten_dich_vu'
    )

    ->select(
        'cha.ten_dich_vu',

        DB::raw("
            COALESCE(
                SUM(
                    CASE
                        WHEN thanh_toans.trang_thai != 3
                        THEN thanh_toans.tong_tien_da_nhan
                        ELSE 0
                    END
                ),
            0) as doanh_thu
        ")
    )

    ->get();
         // TOP 5 đối tác doanh thu cao nhất
        $topNCC = NhaCungCap::join(
            'thuong_hieus',
            'thuong_hieus.id_nha_cung_cap',
            '=',
            'nha_cung_caps.id'
        )
            ->join(
                'dich_vus',
                'dich_vus.id_thuong_hieu',
                '=',
                'thuong_hieus.id'
            )
            ->join(
                'chi_tiet_dat_lichs',
                'chi_tiet_dat_lichs.id_dich_vu',
                '=',
                'dich_vus.id'
            )
            ->join(
                'dat_lichs',
                'dat_lichs.id',
                '=',
                'chi_tiet_dat_lichs.id_dat_lich'
            )
            ->join(
                'thanh_toans',
                'thanh_toans.id_chi_tiet_dat_lich',
                '=',
                'chi_tiet_dat_lichs.id'
            )
            ->join(
                'danh_muc_dich_vus',
                'danh_muc_dich_vus.id',
                '=',
                'dich_vus.id_danh_muc_dich_vu'
            )
            ->where('thanh_toans.trang_thai', '!=', 3)
            ->groupBy(
                'nha_cung_caps.id',
                'nha_cung_caps.ten_nha_cung_cap',
                'danh_muc_dich_vus.ten_dich_vu'
            )
            ->select(
                'nha_cung_caps.ten_nha_cung_cap',
                'danh_muc_dich_vus.ten_dich_vu',
                   DB::raw("
                        COUNT(
                            DISTINCT CASE 
                                WHEN thanh_toans.trang_thai != 3 
                                THEN dat_lichs.id 
                            END
                        ) as tong_don
                    "),
                DB::raw('SUM(thanh_toans.tong_tien_da_nhan) as tong_doanh_thu')
            )
            ->orderByDesc('tong_doanh_thu')
            ->limit(5)
            ->get();

        return response()->json([
            'status' => true,
            'tong_doanh_thu' => $tongDoanhThu,
            'count_ncc' => $countNCC,
            'count_kh' => $countKH,
            'doanh_thu_theo_danh_muc' => $doanhThuTheoDanhMuc,
            'top_doi_tac' => $topNCC
        ]);
    }
    public function getCountProviders()
    {
        $tong_so_nha_cung_cap = NhaCungCap::count();
        $nha_cung_cap_block = NhaCungCap::where('is_blocked', 1)->count();
        $nha_cung_cap_khong_block = NhaCungCap::where('is_blocked', 0)->count();
        $nha_cung_cap_chua_active = NhaCungCap::where('is_active', 0)->count();
        $nha_cung_cap_da_active = NhaCungCap::where('is_active', 1)->where('is_blocked', 0)->count();
        $nha_cung_cap_moi_trong_thang = NhaCungCap::where('created_at', '>=', now()->subMonth())->count();
        return response()->json([
            'status' => true,
            'data' => [
                'tong_so_nha_cung_cap' => $tong_so_nha_cung_cap,
                'nha_cung_cap_block' => $nha_cung_cap_block,
                'nha_cung_cap_khong_block' => $nha_cung_cap_khong_block,
                'nha_cung_cap_chua_active' => $nha_cung_cap_chua_active,
                'nha_cung_cap_da_active' => $nha_cung_cap_da_active,
                'nha_cung_cap_moi_trong_thang' => $nha_cung_cap_moi_trong_thang
            ]
        ]);
    }
    public function getCountCustomers()
    {
        $tong_so_khach_hang = KhachHang::count();
        $khach_hang_block = KhachHang::where('is_blocked', 1)->count();
        $khach_hang_khong_block = KhachHang::where('is_blocked', 0)->count();
        $khach_hang_chua_active = KhachHang::where('is_active', 0)->count();
        $khach_hang_da_active = KhachHang::where('is_active', 1)->where('is_blocked', 0)->count();
        $khach_hang_moi_trong_thang = KhachHang::where('created_at', '>=', now()->subMonth())->count();
        return response()->json([
            'status' => true,
            'data' => [
                'tong_so_khach_hang' => $tong_so_khach_hang,
                'khach_hang_block' => $khach_hang_block,
                'khach_hang_khong_block' => $khach_hang_khong_block,
                'khach_hang_chua_active' => $khach_hang_chua_active,
                'khach_hang_da_active' => $khach_hang_da_active,
                'khach_hang_moi_trong_thang' => $khach_hang_moi_trong_thang
            ]
        ]);
    }
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
