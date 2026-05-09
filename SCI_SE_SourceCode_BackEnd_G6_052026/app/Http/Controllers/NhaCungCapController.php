<?php

namespace App\Http\Controllers;

use App\Http\Requests\LichLamViecRequest;
use App\Http\Requests\ThemMoiNCCRequest;
use App\Mail\KichHoatTaiKhoan;
use App\Mail\KichHoatTaiKhoanNCC;
use App\Mail\QuenMatKhau;
use App\Models\ChiTietDatLich;
use App\Models\KhachHang;
use App\Models\LichLamViec;
use App\Models\NhaCungCap;
use App\Models\ThuongHieu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class NhaCungCapController extends Controller
{
    public function updateThoiGianLamViec(LichLamViecRequest $request)
    {
        $nhaCungCap = $this->isUserNhaCungCap();
        if (!$nhaCungCap) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy nhà cung cấp!"
            ], 404);
        }
        $thuongHieu = ThuongHieu::where('id_nha_cung_cap', $nhaCungCap->id)->first();
        if (!$thuongHieu) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy thương hiệu!"
            ], 404);
        };
        $lichLamViec = LichLamViec::where('id_thuong_hieu', $thuongHieu->id)->first();
        if ($lichLamViec) {
            $lichLamViec->update([
                'gio_mo_cua' => $request->gio_mo_cua,
                'gio_dong_cua' => $request->gio_dong_cua,
            ]);
            return response()->json([
                'status' => true,
                'message' => "Cập nhật thời gian làm việc thành công!"
            ]);
        }
    }
    public function getThoiGianLamViec()
    {
        $nhaCungCap = $this->isUserNhaCungCap();
        if (!$nhaCungCap) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy nhà cung cấp!"
            ], 404);
        }
        $thuongHieu = ThuongHieu::where('id_nha_cung_cap', $nhaCungCap->id)->first();
        if (!$thuongHieu) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy thương hiệu!"
            ], 404);
        };
        $data = LichLamViec::where('id_thuong_hieu', $thuongHieu->id)->first();
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }
    public function getDataLichHen()
    {
        $nhaCungCap = $this->isUserNhaCungCap();
        if (!$nhaCungCap) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy nhà cung cấp!"
            ], 404);
        }
        $tong_lich_hen = NhaCungCap::where('nha_cung_caps.id', $nhaCungCap->id)
            ->join('thuong_hieus', 'nha_cung_caps.id', '=', 'thuong_hieus.id_nha_cung_cap')
            ->join('dat_lichs', 'thuong_hieus.id', '=', 'dat_lichs.id_thuong_hieu')
            ->select(
                'dat_lichs.id',
            )
            ->count();
        $lich_da_xac_nhan = NhaCungCap::where('nha_cung_caps.id', $nhaCungCap->id)
            ->join('thuong_hieus', 'nha_cung_caps.id', '=', 'thuong_hieus.id_nha_cung_cap')
            ->join('dat_lichs', 'thuong_hieus.id', '=', 'dat_lichs.id_thuong_hieu')
            ->where('dat_lichs.trang_thai_dat_lich', 1)
            ->select(
                'dat_lichs.id',
            )
            ->count();
        $lich_da_hoan_thanh = NhaCungCap::where('nha_cung_caps.id', $nhaCungCap->id)
            ->join('thuong_hieus', 'nha_cung_caps.id', '=', 'thuong_hieus.id_nha_cung_cap')
            ->join('dat_lichs', 'thuong_hieus.id', '=', 'dat_lichs.id_thuong_hieu')
            ->where('dat_lichs.trang_thai_dat_lich', 2)
            ->select(
                'dat_lichs.id',
            )
            ->count();
        $lich_da_huy = NhaCungCap::where('nha_cung_caps.id', $nhaCungCap->id)
            ->join('thuong_hieus', 'nha_cung_caps.id', '=', 'thuong_hieus.id_nha_cung_cap')
            ->join('dat_lichs', 'thuong_hieus.id', '=', 'dat_lichs.id_thuong_hieu')
            ->where('dat_lichs.trang_thai_dat_lich', 3)
            ->select(
                'dat_lichs.id',
            )
            ->count();
            
      



        $data_DatLich = NhaCungCap::where('nha_cung_caps.id', $nhaCungCap->id)
            ->join('thuong_hieus', 'nha_cung_caps.id', '=', 'thuong_hieus.id_nha_cung_cap')
            ->join('dat_lichs', 'thuong_hieus.id', '=', 'dat_lichs.id_thuong_hieu')
            ->join('khach_hangs', 'dat_lichs.id_khach_hang', '=', 'khach_hangs.id')
            ->join('chi_tiet_dat_lichs', 'dat_lichs.id', '=', 'chi_tiet_dat_lichs.id_dat_lich')
            ->join('dich_vus', 'chi_tiet_dat_lichs.id_dich_vu', '=', 'dich_vus.id')
            ->leftJoin('thanh_toans', 'chi_tiet_dat_lichs.id', '=', 'thanh_toans.id_chi_tiet_dat_lich')
            ->join('nhan_viens', 'nhan_viens.id', 'chi_tiet_dat_lichs.id_nhan_vien') // Join thêm nhân viên
            ->leftJoin('hinh_anh_dich_vus', function ($join) {
                $join->on('hinh_anh_dich_vus.id_dich_vu', '=', 'dich_vus.id')
                    ->whereRaw('hinh_anh_dich_vus.id = (select id from hinh_anh_dich_vus where id_dich_vu = dich_vus.id limit 1)');
            })
            ->select(
                'dat_lichs.id',
                'dich_vus.ten_dich_vu',
                'hinh_anh_dich_vus.hinh_anh as hinh_anh_dich_vu', // Thêm ảnh dịch vụ
                'chi_tiet_dat_lichs.ma_hoa_don',
                'chi_tiet_dat_lichs.ngay_dat_lich',
                'chi_tiet_dat_lichs.gio_bat_dau',
                'dat_lichs.trang_thai_dat_lich',
                'dat_lichs.ghi_chu', // Thêm ghi chú
                'thanh_toans.tong_tien_thanh_toan',
                'thanh_toans.tong_tien_da_nhan',
                'khach_hangs.avatar',
                'khach_hangs.ten_khach_hang',
                'nhan_viens.ten_nhan_vien', // Thêm tên nhân viên
                'nhan_viens.hinh_anh as hinh_anh_nhan_vien' // Thêm ảnh nhân viên
            )
            ->get();
        $data_DatLich->transform(function ($item) {
            // Nếu hinh_anh đã là URL (bắt đầu bằng http:// hoặc https://)
            if (filter_var($item->avatar, FILTER_VALIDATE_URL)) {
                $item->avatar = $item->avatar;  // giữ nguyên link
            } else {
                // Ngược lại, coi như đường dẫn local trong disk 'public'
                $item->avatar = asset('storage/' . $item->avatar);
            }
            return $item;
        });
        return response()->json([
            'status' => true,
            'data_DatLich' => $data_DatLich,
            'tong_lich_hen' => $tong_lich_hen,
            'lich_da_xac_nhan' => $lich_da_xac_nhan,
            'lich_da_hoan_thanh' => $lich_da_hoan_thanh,
            'lich_da_huy' => $lich_da_huy,
        ]);
    }
    public function updateThuongHieu(Request $request)
    {
        $nhaCungCap = $this->isUserNhaCungCap();
        $thuongHieu = ThuongHieu::where('id_nha_cung_cap', $nhaCungCap->id)->first();
        if (!$thuongHieu) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy thương hiệu!"
            ], 404);
        }
        $data = [
            'ten_thuong_hieu'     => $request->ten_thuong_hieu,
            'so_dien_thoai'       => $request->so_dien_thoai,
            'id_danh_muc_dich_vu' => $request->id_danh_muc_dich_vu,
            'ma_so_thue'          => $request->ma_so_thue,
            'ma_bin_ngan_hang'    => $request->ma_bin_ngan_hang,
            'tai_khoan_ngan_hang' => $request->tai_khoan_ngan_hang,
            'dia_chi'             => $request->dia_chi,
        ];

         if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path_logo = $file->storeAs('logo_thuong_hieu', $filename, 'public');

            $data['logo'] = $path_logo;
        }
        if ($request->hasFile('anh_bia')) {
            $file = $request->file('anh_bia');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path_anh_bia = $file->storeAs('anh_bia_thuong_hieu', $filename, 'public');

            $data['anh_bia'] = $path_anh_bia;
        }

        $thuongHieu->update($data);

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thương hiệu thành công!'
        ]);
    }
    public function getDataThuongHieu()
    {
        $nhaCungCap = $this->isUserNhaCungCap();
        if(!$nhaCungCap) {
            return response()->json([
                'status' => false,
                'message' => "Bạn chưa đăng nhập!"
            ], 401);
        }
        $data = ThuongHieu::where('id_nha_cung_cap', $nhaCungCap->id)
            ->get();
         $data->transform(function ($item) {
            // Nếu logo đã là URL (bắt đầu bằng http:// hoặc https://)
            if (filter_var($item->logo, FILTER_VALIDATE_URL)) {
                $item->logo = $item->logo;  // giữ nguyên link
            } else {
                // Ngược lại, coi như đường dẫn local trong disk 'public'
                $item->logo = asset('storage/' . $item->logo);
            }
            return $item;
        });
        $data->transform(function ($item) {
            // Nếu logo đã là URL (bắt đầu bằng http:// hoặc https://)
            if (filter_var($item->anh_bia, FILTER_VALIDATE_URL)) {
                $item->anh_bia = $item->anh_bia;  // giữ nguyên link
            } else {
                // Ngược lại, coi như đường dẫn local trong disk 'public'
                $item->anh_bia = asset('storage/' . $item->anh_bia);
            }
            return $item;
        });
           
        return response()->json([
            'status' => true,
            'data' => $data
        ]);
    }
    public function getDataBangDieuKhien()
    {
        $nhaCungCap = $this->isUserNhaCungCap();
        if (!$nhaCungCap) {
            return response()->json([
                'status' => false,
                'message' => "Không tìm thấy nhà cung cấp!"
            ], 404);
        }
        $data = NhaCungCap::where('nha_cung_caps.id', $nhaCungCap->id)
            ->join('thuong_hieus', 'nha_cung_caps.id', '=', 'thuong_hieus.id_nha_cung_cap')
            ->join('dat_lichs', 'thuong_hieus.id', '=', 'dat_lichs.id_thuong_hieu')
            ->join('khach_hangs', 'dat_lichs.id_khach_hang', '=', 'khach_hangs.id')
            ->join('chi_tiet_dat_lichs', 'dat_lichs.id', '=', 'chi_tiet_dat_lichs.id_dat_lich')
            ->join('dich_vus', 'chi_tiet_dat_lichs.id_dich_vu', '=', 'dich_vus.id')
            ->leftJoin('thanh_toans', 'chi_tiet_dat_lichs.id', '=', 'thanh_toans.id_chi_tiet_dat_lich')
            ->select(
        'chi_tiet_dat_lichs.ma_hoa_don',
        'khach_hangs.ten_khach_hang',
        'dich_vus.ten_dich_vu',
        'dat_lichs.trang_thai_dat_lich',
        'thanh_toans.tong_tien_thanh_toan'
    )
          ->get();
            return response()->json([
                'status' => true,
                'data' => $data
            ]);
    }
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
                    'id'        =>   $user->id,
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
    public function createNCC(ThemMoiNCCRequest $request)
    {
        DB::beginTransaction();

        try {
            $file = $request->file('logo');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $logo = $file->storeAs('logo_thuong_hieu', $filename, 'public');

            $ncc = NhaCungCap::create([
                'ten_nha_cung_cap' => $request->ten_nha_cung_cap,
                'so_dien_thoai'    => $request->so_dien_thoai,
                'email'            => $request->email,
                'password'         => bcrypt($request->password),
                'hash_active'      => Str::uuid(),
            ]);

             $ThuongHieu =  ThuongHieu::create([
                'ten_thuong_hieu'     => $request->ten_thuong_hieu,
                'id_nha_cung_cap'     => $ncc->id,
                'so_dien_thoai'     => $request->so_dien_thoai,
                'id_danh_muc_dich_vu' => $request->id_danh_muc_dich_vu,
                'ma_so_thue'          => $request->ma_so_thue,
                'ma_bin_ngan_hang'    => $request->ma_bin_ngan_hang,
                'tai_khoan_ngan_hang' => $request->tai_khoan_ngan_hang,
                'dia_chi'             => $request->dia_chi,
                'logo'                => $logo,
            ]);
             LichLamViec::create([
                'id_thuong_hieu' => $ThuongHieu->id,
                'gio_mo_cua' => '08:00',
                'gio_dong_cua' => '17:30',
            ]);

            Mail::to($ncc->email)->queue(new KichHoatTaiKhoanNCC($ncc->hash_active, $ncc->ten_nha_cung_cap));

            DB::commit();

            return response()->json([
                'status'  => true,
                'message' => 'Tạo tài khoản thành công!'
            ]);
        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status'  => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
