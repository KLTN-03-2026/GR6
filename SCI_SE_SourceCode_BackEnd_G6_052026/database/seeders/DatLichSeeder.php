<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatLichSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dat_lichs')->delete();
        DB::table('dat_lichs')->truncate();
        DB::table('dat_lichs')->insert([
            //Các lịch đã hoàn thành (Trạng thái 2)
            ['id_thuong_hieu' => 1, 'id_khach_hang' => 1, 'ten_nguoi_dat' => 'Nguyễn Văn Hải', 'so_dien_thoai_nguoi_dat' => '0901234567', 'ghi_chu' => 'Cắt kiểu layer', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 2, 'id_khach_hang' => 2, 'ten_nguoi_dat' => 'Trần Thị Thu Thủy', 'so_dien_thoai_nguoi_dat' => '0912345678', 'ghi_chu' => 'Massage đá nóng 90p', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 3, 'id_khach_hang' => 3, 'ten_nguoi_dat' => 'Lê Minh Hoàng', 'so_dien_thoai_nguoi_dat' => '0923456789', 'ghi_chu' => 'Làm nail tết', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 4, 'id_khach_hang' => 5, 'ten_nguoi_dat' => 'Hoàng Nhật Ánh', 'so_dien_thoai_nguoi_dat' => '0945678901', 'ghi_chu' => 'Khám tổng quát', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 12, 'id_khach_hang' => 7, 'ten_nguoi_dat' => 'Vũ Quốc Cường', 'so_dien_thoai_nguoi_dat' => '0967890123', 'ghi_chu' => 'Tư vấn trẻ hóa da', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 13, 'id_khach_hang' => 9, 'ten_nguoi_dat' => 'Ngô Phương Thảo', 'so_dien_thoai_nguoi_dat' => '0989012345', 'ghi_chu' => 'Sửa máy lạnh phòng khách', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 14, 'id_khach_hang' => 10, 'ten_nguoi_dat' => 'Đỗ Kim Liên', 'so_dien_thoai_nguoi_dat' => '0990123456', 'ghi_chu' => 'Gửi cún 2 ngày', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 1, 'id_khach_hang' => 11, 'ten_nguoi_dat' => 'Hồ Văn Ý', 'so_dien_thoai_nguoi_dat' => '0321654987', 'ghi_chu' => 'Gội đầu dưỡng sinh', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 5, 'id_khach_hang' => 12, 'ten_nguoi_dat' => 'Trương Mỹ Tâm', 'so_dien_thoai_nguoi_dat' => '0333222111', 'ghi_chu' => 'Xét nghiệm máu', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 8, 'id_khach_hang' => 13, 'ten_nguoi_dat' => 'Đoàn Ngọc Hồi', 'so_dien_thoai_nguoi_dat' => '0344555666', 'ghi_chu' => 'Sửa điện chập', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 11, 'id_khach_hang' => 14, 'ten_nguoi_dat' => 'Lý Hùng Dũng', 'so_dien_thoai_nguoi_dat' => '0355666777', 'ghi_chu' => 'Cắt tỉa lông mèo', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 12, 'id_khach_hang' => 17, 'ten_nguoi_dat' => 'Trịnh Công Sơn', 'so_dien_thoai_nguoi_dat' => '0388999000', 'ghi_chu' => 'Chăm sóc da mặt', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 13, 'id_khach_hang' => 18, 'ten_nguoi_dat' => 'Vương Đình Huệ', 'so_dien_thoai_nguoi_dat' => '0399000111', 'ghi_chu' => 'Thay ga máy lạnh', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 14, 'id_khach_hang' => 19, 'ten_nguoi_dat' => 'Tô Lâm', 'so_dien_thoai_nguoi_dat' => '0700111222', 'ghi_chu' => 'Spa chó Poodle', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 2, 'id_khach_hang' => 20, 'ten_nguoi_dat' => 'Phạm Minh Chính', 'so_dien_thoai_nguoi_dat' => '0707333444', 'ghi_chu' => 'Xông hơi giải độc', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 1, 'id_khach_hang' => 1, 'ten_nguoi_dat' => 'Nguyễn Văn Hải', 'so_dien_thoai_nguoi_dat' => '0901234567', 'ghi_chu' => 'Uốn tóc', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 3, 'id_khach_hang' => 2, 'ten_nguoi_dat' => 'Trần Thị Thu Thủy', 'so_dien_thoai_nguoi_dat' => '0912345678', 'ghi_chu' => 'Sơn gel', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 12, 'id_khach_hang' => 3, 'ten_nguoi_dat' => 'Lê Minh Hoàng', 'so_dien_thoai_nguoi_dat' => '0923456789', 'ghi_chu' => 'Hút chì da mặt', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 8, 'id_khach_hang' => 5, 'ten_nguoi_dat' => 'Hoàng Nhật Ánh', 'so_dien_thoai_nguoi_dat' => '0945678901', 'ghi_chu' => 'Sửa tủ lạnh', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 14, 'id_khach_hang' => 7, 'ten_nguoi_dat' => 'Vũ Quốc Cường', 'so_dien_thoai_nguoi_dat' => '0967890123', 'ghi_chu' => 'Cắt móng cho mèo', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 2, 'id_khach_hang' => 2, 'ten_nguoi_dat' => 'Trần Thị Thu Thủy', 'so_dien_thoai_nguoi_dat' => '0912345678', 'ghi_chu' => 'Xông hơi', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 12, 'id_khach_hang' => 3, 'ten_nguoi_dat' => 'Lê Minh Hoàng', 'so_dien_thoai_nguoi_dat' => '0923456789', 'ghi_chu' => 'Triệt lông', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 13, 'id_khach_hang' => 5, 'ten_nguoi_dat' => 'Hoàng Nhật Ánh', 'so_dien_thoai_nguoi_dat' => '0945678901', 'ghi_chu' => 'Bảo trì tủ lạnh', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 14, 'id_khach_hang' => 7, 'ten_nguoi_dat' => 'Vũ Quốc Cường', 'so_dien_thoai_nguoi_dat' => '0967890123', 'ghi_chu' => 'Tắm cho cún', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 1, 'id_khach_hang' => 9, 'ten_nguoi_dat' => 'Ngô Phương Thảo', 'so_dien_thoai_nguoi_dat' => '0989012345', 'ghi_chu' => 'Tỉa tóc mái', 'trang_thai_dat_lich' => 2, 'created_at' => now(), 'updated_at' => now()],

            //Lịch đang chờ xác nhận (Trạng thái 0)
            ['id_thuong_hieu' => 12, 'id_khach_hang' => 1, 'ten_nguoi_dat' => 'Nguyễn Văn Hải', 'so_dien_thoai_nguoi_dat' => '0901234567', 'ghi_chu' => 'Đặt lịch tư vấn mụn', 'trang_thai_dat_lich' => 0, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 13, 'id_khach_hang' => 2, 'ten_nguoi_dat' => 'Trần Thị Thu Thủy', 'so_dien_thoai_nguoi_dat' => '0912345678', 'ghi_chu' => 'Lắp mới máy lạnh', 'trang_thai_dat_lich' => 0, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 1, 'id_khach_hang' => 3, 'ten_nguoi_dat' => 'Lê Minh Hoàng', 'so_dien_thoai_nguoi_dat' => '0923456789', 'ghi_chu' => 'Nhuộm tóc đen', 'trang_thai_dat_lich' => 0, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 11, 'id_khach_hang' => 5, 'ten_nguoi_dat' => 'Hoàng Nhật Ánh', 'so_dien_thoai_nguoi_dat' => '0945678901', 'ghi_chu' => 'Tiêm phòng cho cún', 'trang_thai_dat_lich' => 0, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 14, 'id_khach_hang' => 9, 'ten_nguoi_dat' => 'Ngô Phương Thảo', 'so_dien_thoai_nguoi_dat' => '0989012345', 'ghi_chu' => 'Tỉa lông cho Becgie', 'trang_thai_dat_lich' => 0, 'created_at' => now(), 'updated_at' => now()],

            //Lịch đã xác nhận (Trạng thái 1)
            ['id_thuong_hieu' => 12, 'id_khach_hang' => 10, 'ten_nguoi_dat' => 'Đỗ Kim Liên', 'so_dien_thoai_nguoi_dat' => '0990123456', 'ghi_chu' => 'Liệu trình Hifu lần 2', 'trang_thai_dat_lich' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 2, 'id_khach_hang' => 11, 'ten_nguoi_dat' => 'Hồ Văn Ý', 'so_dien_thoai_nguoi_dat' => '0321654987', 'ghi_chu' => 'Massage body', 'trang_thai_dat_lich' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 3, 'id_khach_hang' => 12, 'ten_nguoi_dat' => 'Trương Mỹ Tâm', 'so_dien_thoai_nguoi_dat' => '0333222111', 'ghi_chu' => 'Phá gel cũ làm mới', 'trang_thai_dat_lich' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 13, 'id_khach_hang' => 13, 'ten_nguoi_dat' => 'Đoàn Ngọc Hồi', 'so_dien_thoai_nguoi_dat' => '0344555666', 'ghi_chu' => 'Vệ sinh máy giặt', 'trang_thai_dat_lich' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 14, 'id_khach_hang' => 14, 'ten_nguoi_dat' => 'Lý Hùng Dũng', 'so_dien_thoai_nguoi_dat' => '0355666777', 'ghi_chu' => 'Khám định kỳ cho mèo', 'trang_thai_dat_lich' => 1, 'created_at' => now(), 'updated_at' => now()],

            //Lịch đã hủy (Trạng thái 3)
            ['id_thuong_hieu' => 12, 'id_khach_hang' => 17, 'ten_nguoi_dat' => 'Trịnh Công Sơn', 'so_dien_thoai_nguoi_dat' => '0388999000', 'ghi_chu' => 'Hủy do bận việc đột xuất', 'trang_thai_dat_lich' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 8, 'id_khach_hang' => 18, 'ten_nguoi_dat' => 'Vương Đình Huệ', 'so_dien_thoai_nguoi_dat' => '0399000111', 'ghi_chu' => 'Không cần sửa nữa', 'trang_thai_dat_lich' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 1, 'id_khach_hang' => 19, 'ten_nguoi_dat' => 'Tô Lâm', 'so_dien_thoai_nguoi_dat' => '0700111222', 'ghi_chu' => 'Đổi salon khác', 'trang_thai_dat_lich' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 14, 'id_khach_hang' => 20, 'ten_nguoi_dat' => 'Phạm Minh Chính', 'so_dien_thoai_nguoi_dat' => '0707333444', 'ghi_chu' => 'Thú cưng đã khỏe', 'trang_thai_dat_lich' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['id_thuong_hieu' => 11, 'id_khach_hang' => 1, 'ten_nguoi_dat' => 'Nguyễn Văn Hải', 'so_dien_thoai_nguoi_dat' => '0901234567', 'ghi_chu' => 'Nhầm ngày', 'trang_thai_dat_lich' => 3, 'created_at' => now(), 'updated_at' => now()],

        ]);
    }
}