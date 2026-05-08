<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class NhaCungCapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('nha_cung_caps')->delete();
        DB::table('nha_cung_caps')->truncate();
        DB::table('nha_cung_caps')->insert([
            [
                'ten_nha_cung_cap' => 'Công ty TNHH Dịch vụ Tóc Nam Sài Gòn',
                'dia_chi' => 'Số 15 đường số 2, Cư xá Đô Thành, Quận 3, TP.HCM',
                'so_dien_thoai' => '0901234567',
                'email' => 'salontoc@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Hệ thống Thẩm mỹ viện & Wellness Zen',
                'dia_chi' => '246 Lý Tự Trọng, Phường Bến Thành, Quận 1, TP.HCM',
                'so_dien_thoai' => '0988777666',
                'email' => 'spamassage@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Hộ kinh doanh Nail Art Studio Hoàn Mỹ',
                'dia_chi' => '12/4 Đoàn Văn Bơ, Phường 9, Quận 4, TP.HCM',
                'so_dien_thoai' => '0934112233',
                'email' => 'nail@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Phòng khám Đa khoa Quốc tế Clinic Plus',
                'dia_chi' => '45-47 Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, TP.HCM',
                'so_dien_thoai' => '0283911223',
                'email' => 'clinic@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Bệnh viện Đa khoa Tâm Anh Sài Gòn',
                'dia_chi' => '2B Phổ Quang, Phường 2, Quận Tân Bình, TP.HCM',
                'so_dien_thoai' => '02871026789',
                'email' => 'dakhoa@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Phòng khám Chuyên khoa Tai Mũi Họng Sài Gòn',
                'dia_chi' => '1-3 Trịnh Văn Cấn, Phường Cầu Ông Lãnh, Quận 1, TP.HCM',
                'so_dien_thoai' => '0903123456',
                'email' => 'chuyenkhoa@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Hệ thống Nha khoa Thẩm mỹ Smile',
                'dia_chi' => '321 Đường số 7, Phường Bình Trị Đông B, Quận Bình Tân, TP.HCM',
                'so_dien_thoai' => '0912445566',
                'email' => 'nhakhoa@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Trung tâm Cơ điện lạnh Gia Định',
                'dia_chi' => '789 Xô Viết Nghệ Tĩnh, Phường 25, Quận Bình Thạnh, TP.HCM',
                'so_dien_thoai' => '0908112233',
                'email' => 'suadien@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Dịch vụ Cấp thoát nước 24h chi nhánh 2',
                'dia_chi' => '156 Cao Lỗ, Phường 4, Quận 8, TP.HCM',
                'so_dien_thoai' => '0944123123',
                'email' => 'suanuoc@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Trung tâm Bảo hành Điện tử TechPro',
                'dia_chi' => '321 Lê Văn Sỹ, Phường 13, Quận 3, TP.HCM',
                'so_dien_thoai' => '0907445566',
                'email' => 'suachuadientu@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Trạm Thú y và Chăm sóc Thú cưng Paws',
                'dia_chi' => '124 Nguyễn Thị Thập, Tân Hưng, Quận 7, TP.HCM',
                'so_dien_thoai' => '0909556677',
                'email' => 'chamsocthucung@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Viện Thẩm Mỹ Quốc Tế Korea Beauty',
                'dia_chi' => '456 Đường LMN, Quận 3, TP.HCM',
                'so_dien_thoai' => '0909123456',
                'email' => 'thammyvien@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Công ty TNHH Cơ Điện Lạnh 247',
                'dia_chi' => '789 Đường GHI, Quận Bình Thạnh, TP.HCM',
                'so_dien_thoai' => '0908777888',
                'email' => 'dienlanh247@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Hệ thống Pet Hotel & Spa Paradise',
                'dia_chi' => '321 Đường OPQ, Quận 7, TP.HCM',
                'so_dien_thoai' => '0907111222',
                'email' => 'pethotel@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ],
        ]);

        DB::table('khach_hangs')->delete();
        DB::table('khach_hangs')->truncate();
        DB::table('khach_hangs')->insert([
            [
                'ten_khach_hang' => 'Nguyễn Văn An',
                'so_dien_thoai' => '0912345678',
                'email' => 'khachhang@gmail.com',
                'password' => Hash::make('12345678'),
                'is_active' => 1,
            ]
        ]);

        DB::table('admins')->delete();
        DB::table('admins')->truncate();
        DB::table('admins')->insert([
            [
                'username' => 'admin',
                'password' => Hash::make('12345678'),
            ]
        ]);
    }
}