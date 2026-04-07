<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DanhMucSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('danh_mucs')->delete();
        DB::table('danh_mucs')->truncate();
        DB::table('danh_mucs')->insert([
            [
                'ten_dich_vu' => 'Làm đẹp',
                'id_father' => 0,
                'hinh_anh' => null,
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Sức khỏe',
                'id_father' => 0,
                'hinh_anh' => null,
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Kỹ thuật gia đình',
                'id_father' => 0,
                'hinh_anh' => null,
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Thú cưng',
                'id_father' => 0,
                'hinh_anh' => null,
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Salon Tóc',
                'id_father' => 1,
                'hinh_anh' => null,
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Spa & Massage',
                'id_father' => 1,
                'hinh_anh' => null,
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Kỹ thuật gia đình',
                'id_father' => 0,
                'hinh_anh' => null,
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Thú cưng',
                'id_father' => 0,
                'hinh_anh' => null,
                'trang_thai' => 1,
            ],


        ]);
    }
}
