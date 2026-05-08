<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DichVuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dich_vus')->delete();
        DB::table('dich_vus')->truncate();
        DB::table('dich_vus')->insert([
            // --- THƯƠNG HIỆU 1: Salon tóc ---
            [
                'id_thuong_hieu' => 1,
                'id_danh_muc_dich_vu' => 5,
                'ten_dich_vu' => 'Cắt tóc nam',
                'don_gia' => 100000,
                'thoi_gian_du_kien' => 30,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Dịch vụ cắt tóc nam chuyên nghiệp',
                'mo_ta_dai' => 'Dịch vụ cắt tóc nam chuyên nghiệp với đội ngũ thợ tay nghề cao.',
                'so_luong_lich_toi_da' => 10,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 1,
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'id_thuong_hieu' => 1,
                'id_danh_muc_dich_vu' => 5,
                'ten_dich_vu' => 'Cắt tóc nữ',
                'don_gia' => 150000,
                'thoi_gian_du_kien' => 45,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Dịch vụ cắt tóc nữ chuyên nghiệp',
                'mo_ta_dai' => 'Dịch vụ cắt tóc nữ chuyên nghiệp, tư vấn kiểu tóc phù hợp khuôn mặt.',
                'so_luong_lich_toi_da' => 10,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 1,
                'created_at' => now(), 'updated_at' => now(),
            ],

            // --- THƯƠNG HIỆU 2: Spa & Massage ---
            [
                'id_thuong_hieu' => 2,
                'id_danh_muc_dich_vu' => 6,
                'ten_dich_vu' => 'Massage đá nóng',
                'don_gia' => 300000,
                'thoi_gian_du_kien' => 120,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Dịch vụ massage đá nóng thư giãn',
                'mo_ta_dai' => 'Kết hợp đá nóng và tinh dầu giúp giảm căng thẳng và cải thiện tuần hoàn máu.',
                'so_luong_lich_toi_da' => 10,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 2,
                'created_at' => now(), 'updated_at' => now(),
            ],

            // --- THƯƠNG HIỆU 3: Nail ---
            [
                'id_thuong_hieu' => 3,
                'id_danh_muc_dich_vu' => 7,
                'ten_dich_vu' => 'Làm móng tay nghệ thuật',
                'don_gia' => 100000,
                'thoi_gian_du_kien' => 60,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Dịch vụ làm móng tay chuyên nghiệp',
                'mo_ta_dai' => 'Sử dụng kỹ thuật làm móng hiện đại để bộ móng đẹp và khỏe mạnh.',
                'so_luong_lich_toi_da' => 10,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 1,
                'created_at' => now(), 'updated_at' => now(),
            ],

            // --- THƯƠNG HIỆU 8: Sửa điện ---
            [
                'id_thuong_hieu' => 8,
                'id_danh_muc_dich_vu' => 12,
                'ten_dich_vu' => 'Sửa máy lạnh',
                'don_gia' => 500000,
                'thoi_gian_du_kien' => 120,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Dịch vụ sửa máy lạnh chuyên nghiệp',
                'mo_ta_dai' => 'Khắc phục nhanh các sự cố máy lạnh không lạnh, rò rỉ nước.',
                'so_luong_lich_toi_da' => 10,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 3,
                'created_at' => now(), 'updated_at' => now(),
            ],

            // --- THƯƠNG HIỆU 11: Thú cưng ---
            [
                'id_thuong_hieu' => 11,
                'id_danh_muc_dich_vu' => 15,
                'ten_dich_vu' => 'Spa chó mèo',
                'don_gia' => 200000,
                'thoi_gian_du_kien' => 60,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Dịch vụ Spa chó mèo chuyên nghiệp',
                'mo_ta_dai' => 'Tắm gội, cắt tỉa và vệ sinh toàn diện cho thú cưng.',
                'so_luong_lich_toi_da' => 10,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 3,
                'created_at' => now(), 'updated_at' => now(),
            ],

            // --- THƯƠNG HIỆU 12 (TMV Korea Beauty) ---
            [
                'id_thuong_hieu' => 12,
                'id_danh_muc_dich_vu' => 8,
                'ten_dich_vu' => 'Trẻ hóa da Hifu công nghệ cao',
                'don_gia' => 5000000,
                'thoi_gian_du_kien' => 90,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Nâng cơ trẻ hóa da không xâm lấn.',
                'mo_ta_dai' => 'Công nghệ Hifu giúp săn chắc da, xóa nhăn và tạo khuôn mặt V-line hiệu quả.',
                'so_luong_lich_toi_da' => 5,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 1,
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'id_thuong_hieu' => 12,
                'id_danh_muc_dich_vu' => 8,
                'ten_dich_vu' => 'Chăm sóc da mặt chuyên sâu',
                'don_gia' => 800000,
                'thoi_gian_du_kien' => 60,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Cung cấp dưỡng chất cho da.',
                'mo_ta_dai' => 'Liệu trình bao gồm làm sạch sâu, hút chì và điện di tinh dầu phục hồi da.',
                'so_luong_lich_toi_da' => 12,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 1,
                'created_at' => now(), 'updated_at' => now(),
            ],

            // --- THƯƠNG HIỆU 13 (Điện máy Xanh Service) ---
            [
                'id_thuong_hieu' => 13,
                'id_danh_muc_dich_vu' => 12,
                'ten_dich_vu' => 'Vệ sinh lồng giặt máy giặt',
                'don_gia' => 250000,
                'thoi_gian_du_kien' => 60,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Vệ sinh máy giặt cửa ngang/cửa đứng.',
                'mo_ta_dai' => 'Tháo lồng vệ sinh sạch sẽ, diệt khuẩn và kiểm tra các bộ phận truyền động.',
                'so_luong_lich_toi_da' => 15,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 2,
                'created_at' => now(), 'updated_at' => now(),
            ],
            [
                'id_thuong_hieu' => 13,
                'id_danh_muc_dich_vu' => 12,
                'ten_dich_vu' => 'Bơm ga máy lạnh bổ sung',
                'don_gia' => 150000,
                'thoi_gian_du_kien' => 30,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Bơm ga máy lạnh R32, R410A.',
                'mo_ta_dai' => 'Kiểm tra áp suất ga, kiểm tra rò rỉ và nạp bổ sung cho máy làm lạnh sâu.',
                'so_luong_lich_toi_da' => 20,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 2,
                'created_at' => now(), 'updated_at' => now(),
            ],

            // --- THƯƠNG HIỆU 14 (Pet Paradise Resort) ---
            [
                'id_thuong_hieu' => 14,
                'id_danh_muc_dich_vu' => 15,
                'ten_dich_vu' => 'Khách sạn thú cưng 24h',
                'don_gia' => 200000,
                'thoi_gian_du_kien' => 1440,
                'thoi_gian_dem' => 30,
                'mo_ta_ngan' => 'Dịch vụ lưu trú cao cấp.',
                'mo_ta_dai' => 'Phòng máy lạnh sạch sẽ, có camera theo dõi, chế độ ăn dinh dưỡng cho chó mèo.',
                'so_luong_lich_toi_da' => 10,
                'trang_thai' => 1,
                'kieu_phuc_vu' => 1,
                'created_at' => now(), 'updated_at' => now(),
            ],
        ]);
    }
}