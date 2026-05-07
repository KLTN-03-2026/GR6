<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LichLamViecSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('lich_lam_viecs')->delete();
        DB::table('lich_lam_viecs')->truncate();
        DB::table('lich_lam_viecs')->insert([
            [
                'id_thuong_hieu' => 1,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],
              [
                'id_thuong_hieu' => 2,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],  [
                'id_thuong_hieu' => 3,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],  [
                'id_thuong_hieu' => 4,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],  [
                'id_thuong_hieu' => 5,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],  [
                'id_thuong_hieu' => 6,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],  [
                'id_thuong_hieu' => 7,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],  [
                'id_thuong_hieu' => 8,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],  [
                'id_thuong_hieu' => 9,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],  [
                'id_thuong_hieu' => 10,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],  [
                'id_thuong_hieu' => 11,
                'gio_mo_cua' => '08:00:00',
                'gio_dong_cua' => '17:30:00',
            ],
        ]);
    }
}
