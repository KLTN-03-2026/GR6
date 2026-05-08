<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class KhachHangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('khach_hangs')->delete();
        DB::table('khach_hangs')->truncate();
        $data = [
            [
                'ten_khach_hang' => 'Nguyễn Văn Hải',
                'so_dien_thoai' => '0901234567',
                'avatar' => 'https://i.pravatar.cc/150?u=kh1',
                'email' => 'vanhai@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Trần Thị Thu Thủy',
                'so_dien_thoai' => '0912345678',
                'avatar' => 'https://i.pravatar.cc/150?u=kh2',
                'email' => 'thuthuy@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Lê Minh Hoàng',
                'so_dien_thoai' => '0923456789',
                'avatar' => 'https://i.pravatar.cc/150?u=kh3',
                'email' => 'minhhoang@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Phạm Thanh Bình',
                'so_dien_thoai' => '0934567890',
                'avatar' => 'https://i.pravatar.cc/150?u=kh4',
                'email' => 'thanhbinh@gmail.com',
                'is_active' => 0, // Chưa active
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Hoàng Nhật Ánh',
                'so_dien_thoai' => '0945678901',
                'avatar' => 'https://i.pravatar.cc/150?u=kh5',
                'email' => 'nhatanh@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Đặng Hồng Nhung',
                'so_dien_thoai' => '0956789012',
                'avatar' => 'https://i.pravatar.cc/150?u=kh6',
                'email' => 'hongnhung@gmail.com',
                'is_active' => 1,
                'is_blocked' => 1, // Tài khoản bị khóa
            ],
            [
                'ten_khach_hang' => 'Vũ Quốc Cường',
                'so_dien_thoai' => '0967890123',
                'avatar' => 'https://i.pravatar.cc/150?u=kh7',
                'email' => 'quoccuong@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Bùi Gia Bảo',
                'so_dien_thoai' => '0978901234',
                'avatar' => 'https://i.pravatar.cc/150?u=kh8',
                'email' => 'giabao@gmail.com',
                'is_active' => 0,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Ngô Phương Thảo',
                'so_dien_thoai' => '0989012345',
                'avatar' => 'https://i.pravatar.cc/150?u=kh9',
                'email' => 'phuongthao@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Đỗ Kim Liên',
                'so_dien_thoai' => '0990123456',
                'avatar' => 'https://i.pravatar.cc/150?u=kh10',
                'email' => 'kimlien@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Hồ Văn Ý',
                'so_dien_thoai' => '0321654987',
                'avatar' => 'https://i.pravatar.cc/150?u=kh11',
                'email' => 'vany@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Trương Mỹ Tâm',
                'so_dien_thoai' => '0333222111',
                'avatar' => 'https://i.pravatar.cc/150?u=kh12',
                'email' => 'mytam@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Đoàn Ngọc Hồi',
                'so_dien_thoai' => '0344555666',
                'avatar' => 'https://i.pravatar.cc/150?u=kh13',
                'email' => 'ngochoi@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Lý Hùng Dũng',
                'so_dien_thoai' => '0355666777',
                'avatar' => 'https://i.pravatar.cc/150?u=kh14',
                'email' => 'hungdung@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Phan Thu Ngân',
                'so_dien_thoai' => '0366777888',
                'avatar' => 'https://i.pravatar.cc/150?u=kh15',
                'email' => 'thungan@gmail.com',
                'is_active' => 1,
                'is_blocked' => 1, // Tài khoản bị khóa
            ],
            [
                'ten_khach_hang' => 'Thái Minh Khang',
                'so_dien_thoai' => '0377888999',
                'avatar' => 'https://i.pravatar.cc/150?u=kh16',
                'email' => 'minhkhang@gmail.com',
                'is_active' => 0,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Trịnh Công Sơn',
                'so_dien_thoai' => '0388999000',
                'avatar' => 'https://i.pravatar.cc/150?u=kh17',
                'email' => 'congson@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Vương Đình Huệ',
                'so_dien_thoai' => '0399000111',
                'avatar' => 'https://i.pravatar.cc/150?u=kh18',
                'email' => 'dinhhue@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Tô Lâm',
                'so_dien_thoai' => '0700111222',
                'avatar' => 'https://i.pravatar.cc/150?u=kh19',
                'email' => 'tolam@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
            [
                'ten_khach_hang' => 'Phạm Minh Chính',
                'so_dien_thoai' => '0707333444',
                'avatar' => 'https://i.pravatar.cc/150?u=kh20',
                'email' => 'minhchinh@gmail.com',
                'is_active' => 1,
                'is_blocked' => 0,
            ],
        ];

        $finalData = [];
        foreach ($data as $item) {
            $finalData[] = array_merge($item, [
                'password'    => Hash::make('12345678'),
                'hash_active' => $item['is_active'] == 0 ? Str::uuid() : null,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }

        DB::table('khach_hangs')->insert($finalData);
    }
}