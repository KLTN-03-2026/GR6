<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
                'ten_nha_cung_cap' => 'Salon tóc',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'salontoc@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Spa&Massage',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'spamassage@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'nail',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'nail@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Clinic',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'clinic@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Đa khoa',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'dakhoa@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'chuyên khoa',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'chuyenkhoa@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'nha khoa',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'nhakhoa@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'Sửa điện',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'suadien@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'sửa nước',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'suanuoc@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'sửa chữa điện tử',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'suachuadientu@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],
            [
                'ten_nha_cung_cap' => 'chăm sóc thú cưng',
                'dia_chi' => '123 Đường ABC, Quận 1, TP.HCM',
                'so_dien_thoai' => '0123456789',
                'email' => 'chamsocthucung@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ],

        ]);
        // Clone acc khách hàng
        DB::table('khach_hangs')->delete();
        DB::table('khach_hangs')->truncate();
        DB::table('khach_hangs')->insert([
            [
                'ten_khach_hang' => 'Khách hàng',
                'so_dien_thoai' => '0123456789',
                'email' => 'khachhang@gmail.com',
                'password' => bcrypt('12345678'),
                'is_active' => 1,
            ]

        ]);
        //clone acc admin
        DB::table('admins')->delete();
        DB::table('admins')->truncate();
        DB::table('admins')->insert([
            [
                'username' => 'admin',
                'password' => bcrypt('12345678'),
            ]

        ]);
    }
}
