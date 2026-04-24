<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThuongHieuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('thuong_hieus')->delete();
        DB::table('thuong_hieus')->truncate();
        DB::table('thuong_hieus')->insert([
            [
                'id_nha_cung_cap' => 1,
                'id_danh_muc_dich_vu' => 5,
                'ten_thuong_hieu' => 'Salon tóc',
                'dia_chi' => '123 Đường ABC, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Salon tóc chuyên nghiệp với đội ngũ thợ lành nghề và dịch vụ đa dạng.',
                'ma_so_thue' => '123456789',
                'ma_bin_ngan_hang' => 'Ngân hàng ABC',
                'tai_khoan_ngan_hang' => '0123456789',

                'is_active' => 1
            ],
            [
                'id_nha_cung_cap' => 2,
                'id_danh_muc_dich_vu' => 6,
                'ten_thuong_hieu' => 'Spa&Massage',
                'dia_chi' => '456 Đường DEF, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0987654321',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Spa&Massage cao cấp với không gian thư giãn và dịch vụ chăm sóc sức khỏe toàn diện.',
                'ma_so_thue' => '987654321',
                'ma_bin_ngan_hang' => 'Ngân hàng XYZ',
                'tai_khoan_ngan_hang' => '0987654321',
                'is_active' => 1
            ],
            [
                'id_nha_cung_cap' => 3,
                'id_danh_muc_dich_vu' => 7,
                'ten_thuong_hieu' => 'Nail',
                'dia_chi' => '789 Đường GHI, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Dịch vụ làm móng chuyên nghiệp với thiết kế sáng tạo và chất lượng cao.',
                'ma_so_thue' => '123456789',
                'ma_bin_ngan_hang' => 'Ngân hàng ABC',
                'tai_khoan_ngan_hang' => '0123456789',
                'is_active' => 1
            ],
            [
                'id_nha_cung_cap' => 4,
                'id_danh_muc_dich_vu' => 8,
                'ten_thuong_hieu' => 'Clinic',
                'dia_chi' => '321 Đường JKL, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0987654321',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Clinic chuyên khoa với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.',
                'ma_so_thue' => '987654321',
                'ma_bin_ngan_hang' => 'Ngân hàng XYZ',
                'tai_khoan_ngan_hang' => '0987654321',
                'is_active' => 1
            ],
            [
                'id_nha_cung_cap' => 5,
                'id_danh_muc_dich_vu' => 9,
                'ten_thuong_hieu' => 'Đa khoa',
                'dia_chi' => '654 Đường MNO, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Bệnh viện đa khoa với dịch vụ chăm sóc sức khỏe toàn diện và đội ngũ y bác sĩ chuyên nghiệp.',
                'ma_so_thue' => '123456789',
                'ma_bin_ngan_hang' => 'Ngân hàng ABC',
                'tai_khoan_ngan_hang' => '0123456789',
                'is_active' => 1
            ],
            [
                'id_nha_cung_cap' => 6,
                'id_danh_muc_dich_vu' => 10,
                'ten_thuong_hieu' => 'chuyên khoa',
                'dia_chi' => '987 Đường PQR, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0987654321',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Bệnh viện chuyên khoa với dịch vụ chăm sóc sức khỏe chuyên sâu và đội ngũ y bác sĩ giàu kinh nghiệm.',
                'ma_so_thue' => '987654321',
                'ma_bin_ngan_hang' => 'Ngân hàng XYZ',
                'tai_khoan_ngan_hang' => '0987654321',
                'is_active' => 1
            ],
            [
                'id_nha_cung_cap' => 7,
                'id_danh_muc_dich_vu' => 11,
                'ten_thuong_hieu' => 'nha khoa',
                'dia_chi' => '321 Đường STU, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Phòng khám nha khoa với dịch vụ chăm sóc răng miệng chuyên nghiệp và đội ngũ bác sĩ giàu kinh nghiệm.',
                'ma_so_thue' => '123456789',
                'ma_bin_ngan_hang' => 'Ngân hàng ABC',
                'tai_khoan_ngan_hang' => '0123456789',
                'is_active' => 1
            ],
            [
                'id_nha_cung_cap' => 8,
                'id_danh_muc_dich_vu' => 12,
                'ten_thuong_hieu' => 'Sửa điện',
                'dia_chi' => '654 Đường VWX, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0987654321',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Dịch vụ sửa chữa điện chuyên nghiệp với đội ngũ kỹ thuật viên lành nghề và trang thiết bị hiện đại.',
                'ma_so_thue' => '987654321',
                'ma_bin_ngan_hang' => 'Ngân hàng XYZ',
                'tai_khoan_ngan_hang' => '0987654321',
                'is_active' => 1
            ],
            [
                'id_nha_cung_cap' => 9,
                'id_danh_muc_dich_vu' => 13,
                'ten_thuong_hieu' => 'sửa nước',
                'dia_chi' => '987 Đường YZ, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Dịch vụ sửa chữa nước chuyên nghiệp với đội ngũ kỹ thuật viên lành nghề và trang thiết bị hiện đại.',
                'ma_so_thue' => '123456789',
                'ma_bin_ngan_hang' => 'Ngân hàng ABC',
                'tai_khoan_ngan_hang' => '0123456789',
                'is_active' => 1
            ],
            [
                'id_nha_cung_cap' => 10,
                'id_danh_muc_dich_vu' => 14,
                'ten_thuong_hieu' => 'sửa chữa điện tử',
                'dia_chi' => '321 Đường ZAB, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0987654321',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Dịch vụ sửa chữa điện tử chuyên nghiệp với đội ngũ kỹ thuật viên lành nghề và trang thiết bị hiện đại.',
                'ma_so_thue' => '987654321',
                'ma_bin_ngan_hang' => 'Ngân hàng XYZ',
                'tai_khoan_ngan_hang' => '0987654321',
                'is_active' => 1
            ],
            [
                'id_nha_cung_cap' => 11,
                'id_danh_muc_dich_vu' => 15,
                'ten_thuong_hieu' => 'chăm sóc thú cưng',
                'dia_chi' => '654 Đường CDE, Quận XYZ, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'logo' => "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
                'anh_bia' => "https://img.pikbest.com/backgrounds/20170624/beautiful-drawing-flowers-doodle-background_1818310.jpg!bwr800",
                'mo_ta' => 'Dịch vụ chăm sóc thú cưng chuyên nghiệp với đội ngũ nhân viên yêu động vật và trang thiết bị hiện đại.',
                'ma_so_thue' => '123456789',
                'ma_bin_ngan_hang' => 'Ngân hàng ABC',
                'tai_khoan_ngan_hang' => '0123456789',
                'is_active' => 1
            ],

        ]);
    }
}
