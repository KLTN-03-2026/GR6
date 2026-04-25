<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NhanVienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('nhan_viens')->delete();
        DB::table('nhan_viens')->truncate();

        $data = [
            // --- ID_THUONG_HIEU: 1 (Salon tóc) ---
            ['id_thuong_hieu' => 1, 'ten_nhan_vien' => 'Nguyễn Hoàng Anh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=1', 'mo_ta_ngan' => 'Chuyên gia tạo mẫu tóc nam.'],
            ['id_thuong_hieu' => 1, 'ten_nhan_vien' => 'Lê Thu Thảo', 'hinh_anh' => 'https://i.pravatar.cc/150?u=2', 'mo_ta_ngan' => 'Thợ chính chuyên uốn nhuộm.'],
            ['id_thuong_hieu' => 1, 'ten_nhan_vien' => 'Phạm Minh Đức', 'hinh_anh' => 'https://i.pravatar.cc/150?u=3', 'mo_ta_ngan' => 'Chuyên viên phục hồi tóc hư tổn.'],
            ['id_thuong_hieu' => 1, 'ten_nhan_vien' => 'Trần Mỹ Linh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=4', 'mo_ta_ngan' => 'Thợ phụ nhiệt tình, chu đáo.'],

            // --- ID_THUONG_HIEU: 2 (Spa&Massage) ---
            ['id_thuong_hieu' => 2, 'ten_nhan_vien' => 'Đặng Hồng Ngọc', 'hinh_anh' => 'https://i.pravatar.cc/150?u=5', 'mo_ta_ngan' => 'Kỹ thuật viên massage body.'],
            ['id_thuong_hieu' => 2, 'ten_nhan_vien' => 'Vũ Kiều Oanh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=6', 'mo_ta_ngan' => 'Chuyên viên chăm sóc da mặt.'],
            ['id_thuong_hieu' => 2, 'ten_nhan_vien' => 'Ngô Thanh Vân', 'hinh_anh' => 'https://i.pravatar.cc/150?u=7', 'mo_ta_ngan' => 'Chuyên gia tư vấn liệu trình.'],
            ['id_thuong_hieu' => 2, 'ten_nhan_vien' => 'Hoàng Thùy Dung', 'hinh_anh' => 'https://i.pravatar.cc/150?u=8', 'mo_ta_ngan' => 'Kỹ thuật viên đá nóng.'],

            // --- ID_THUONG_HIEU: 3 (Nail) ---
            ['id_thuong_hieu' => 3, 'ten_nhan_vien' => 'Bùi Thị Tuyết', 'hinh_anh' => 'https://i.pravatar.cc/150?u=9', 'mo_ta_ngan' => 'Nghệ nhân vẽ móng nghệ thuật.'],
            ['id_thuong_hieu' => 3, 'ten_nhan_vien' => 'Nguyễn Lan Anh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=10', 'mo_ta_ngan' => 'Chuyên viên đắp bột, đính đá.'],
            ['id_thuong_hieu' => 3, 'ten_nhan_vien' => 'Phan Kim Liên', 'hinh_anh' => 'https://i.pravatar.cc/150?u=11', 'mo_ta_ngan' => 'Thợ làm móng tay chuyên nghiệp.'],
            ['id_thuong_hieu' => 3, 'ten_nhan_vien' => 'Đỗ Bảo Châu', 'hinh_anh' => 'https://i.pravatar.cc/150?u=12', 'mo_ta_ngan' => 'Chuyên viên chăm sóc gót chân.'],

            // --- ID_THUONG_HIEU: 4 (Clinic) ---
            ['id_thuong_hieu' => 4, 'ten_nhan_vien' => 'Bác sĩ Lê Mạnh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=13', 'mo_ta_ngan' => 'Bác sĩ da liễu giàu kinh nghiệm.'],
            ['id_thuong_hieu' => 4, 'ten_nhan_vien' => 'Y tá Mai Phương', 'hinh_anh' => 'https://i.pravatar.cc/150?u=14', 'mo_ta_ngan' => 'Hỗ trợ điều trị và chăm sóc sau tiểu phẫu.'],
            ['id_thuong_hieu' => 4, 'ten_nhan_vien' => 'Bác sĩ Trần Tâm', 'hinh_anh' => 'https://i.pravatar.cc/150?u=15', 'mo_ta_ngan' => 'Chuyên gia thẩm mỹ nội khoa.'],
            ['id_thuong_hieu' => 4, 'ten_nhan_vien' => 'Dược sĩ Thu Hà', 'hinh_anh' => 'https://i.pravatar.cc/150?u=16', 'mo_ta_ngan' => 'Tư vấn sử dụng dược mỹ phẩm.'],

            // --- ID_THUONG_HIEU: 5 (Đa khoa) ---
            ['id_thuong_hieu' => 5, 'ten_nhan_vien' => 'GS. Nguyễn Văn An', 'hinh_anh' => 'https://i.pravatar.cc/150?u=17', 'mo_ta_ngan' => 'Chuyên khoa nội tổng quát.'],
            ['id_thuong_hieu' => 5, 'ten_nhan_vien' => 'Bác sĩ Đặng Tiến', 'hinh_anh' => 'https://i.pravatar.cc/150?u=18', 'mo_ta_ngan' => 'Chuyên khoa xét nghiệm.'],
            ['id_thuong_hieu' => 5, 'ten_nhan_vien' => 'Điều dưỡng Minh Nguyệt', 'hinh_anh' => 'https://i.pravatar.cc/150?u=19', 'mo_ta_ngan' => 'Điều dưỡng trưởng khoa.'],
            ['id_thuong_hieu' => 5, 'ten_nhan_vien' => 'Bác sĩ Vũ Hùng', 'hinh_anh' => 'https://i.pravatar.cc/150?u=20', 'mo_ta_ngan' => 'Chuyên khoa chẩn đoán hình ảnh.'],

            // --- ID_THUONG_HIEU: 6 (Chuyên khoa) ---
            ['id_thuong_hieu' => 6, 'ten_nhan_vien' => 'Bác sĩ Ngô Quang', 'hinh_anh' => 'https://i.pravatar.cc/150?u=21', 'mo_ta_ngan' => 'Chuyên gia cơ xương khớp.'],
            ['id_thuong_hieu' => 6, 'ten_nhan_vien' => 'Bác sĩ Lê Thịnh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=22', 'mo_ta_ngan' => 'Chuyên gia tim mạch.'],
            ['id_thuong_hieu' => 6, 'ten_nhan_vien' => 'Y tá Hoàng Nam', 'hinh_anh' => 'https://i.pravatar.cc/150?u=23', 'mo_ta_ngan' => 'Hỗ trợ bệnh nhân chuyên khoa.'],
            ['id_thuong_hieu' => 6, 'ten_nhan_vien' => 'Bác sĩ Phạm Bình', 'hinh_anh' => 'https://i.pravatar.cc/150?u=24', 'mo_ta_ngan' => 'Chuyên gia tiêu hóa.'],

            // --- ID_THUONG_HIEU: 7 (Nha khoa) ---
            ['id_thuong_hieu' => 7, 'ten_nhan_vien' => 'Nha sĩ Minh Tuấn', 'hinh_anh' => 'https://i.pravatar.cc/150?u=25', 'mo_ta_ngan' => 'Chuyên răng sứ thẩm mỹ.'],
            ['id_thuong_hieu' => 7, 'ten_nhan_vien' => 'Nha sĩ Thanh Thảo', 'hinh_anh' => 'https://i.pravatar.cc/150?u=26', 'mo_ta_ngan' => 'Chuyên chỉnh nha, niềng răng.'],
            ['id_thuong_hieu' => 7, 'ten_nhan_vien' => 'Kỹ thuật viên Nam', 'hinh_anh' => 'https://i.pravatar.cc/150?u=27', 'mo_ta_ngan' => 'Vệ sinh răng miệng định kỳ.'],
            ['id_thuong_hieu' => 7, 'ten_nhan_vien' => 'Nha sĩ Quốc Anh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=28', 'mo_ta_ngan' => 'Chuyên lấy cao răng và tẩy trắng.'],

            // --- ID_THUONG_HIEU: 8 (Sửa điện) ---
            ['id_thuong_hieu' => 8, 'ten_nhan_vien' => 'Thợ điện Văn Hùng', 'hinh_anh' => 'https://i.pravatar.cc/150?u=29', 'mo_ta_ngan' => 'Xử lý sự cố điện dân dụng 24/7.'],
            ['id_thuong_hieu' => 8, 'ten_nhan_vien' => 'Thợ điện Trần Kiên', 'hinh_anh' => 'https://i.pravatar.cc/150?u=30', 'mo_ta_ngan' => 'Lắp đặt hệ thống điện thông minh.'],
            ['id_thuong_hieu' => 8, 'ten_nhan_vien' => 'Kỹ thuật viên Sơn', 'hinh_anh' => 'https://i.pravatar.cc/150?u=31', 'mo_ta_ngan' => 'Bảo trì tủ điện công nghiệp.'],
            ['id_thuong_hieu' => 8, 'ten_nhan_vien' => 'Thợ điện Nguyễn Thành', 'hinh_anh' => 'https://i.pravatar.cc/150?u=32', 'mo_ta_ngan' => 'Sửa chữa đồ gia dụng điện.'],

            // --- ID_THUONG_HIEU: 9 (Sửa nước) ---
            ['id_thuong_hieu' => 9, 'ten_nhan_vien' => 'Thợ nước Minh Chiến', 'hinh_anh' => 'https://i.pravatar.cc/150?u=33', 'mo_ta_ngan' => 'Chuyên thông tắc bồn cầu, cống.'],
            ['id_thuong_hieu' => 9, 'ten_nhan_vien' => 'Thợ nước Lê Hoàng', 'hinh_anh' => 'https://i.pravatar.cc/150?u=34', 'mo_ta_ngan' => 'Sửa rò rỉ đường ống âm tường.'],
            ['id_thuong_hieu' => 9, 'ten_nhan_vien' => 'Thợ nước Gia Bảo', 'hinh_anh' => 'https://i.pravatar.cc/150?u=35', 'mo_ta_ngan' => 'Lắp đặt bồn nước, máy bơm.'],
            ['id_thuong_hieu' => 9, 'ten_nhan_vien' => 'Thợ nước Duy Mạnh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=36', 'mo_ta_ngan' => 'Vệ sinh bể nước ngầm.'],

            // --- ID_THUONG_HIEU: 10 (Sửa điện tử) ---
            ['id_thuong_hieu' => 10, 'ten_nhan_vien' => 'Kỹ thuật viên Tivi', 'hinh_anh' => 'https://i.pravatar.cc/150?u=37', 'mo_ta_ngan' => 'Sửa chữa tivi LED, LCD, OLED.'],
            ['id_thuong_hieu' => 10, 'ten_nhan_vien' => 'Thợ loa âm thanh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=38', 'mo_ta_ngan' => 'Phục hồi loa và dàn karaoke.'],
            ['id_thuong_hieu' => 10, 'ten_nhan_vien' => 'Thợ sửa tủ lạnh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=39', 'mo_ta_ngan' => 'Bơm ga, sửa block tủ lạnh.'],
            ['id_thuong_hieu' => 10, 'ten_nhan_vien' => 'Thợ máy giặt', 'hinh_anh' => 'https://i.pravatar.cc/150?u=40', 'mo_ta_ngan' => 'Vệ sinh và sửa mạch máy giặt.'],

            // --- ID_THUONG_HIEU: 11 (Chăm sóc thú cưng) ---
            ['id_thuong_hieu' => 11, 'ten_nhan_vien' => 'Groomer Ngọc Linh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=41', 'mo_ta_ngan' => 'Cắt tỉa lông thú cưng thẩm mỹ.'],
            ['id_thuong_hieu' => 11, 'ten_nhan_vien' => 'BSTY Phan Anh', 'hinh_anh' => 'https://i.pravatar.cc/150?u=42', 'mo_ta_ngan' => 'Bác sĩ thú y nội khoa.'],
            ['id_thuong_hieu' => 11, 'ten_nhan_vien' => 'Nhân viên Spa Pet', 'hinh_anh' => 'https://i.pravatar.cc/150?u=43', 'mo_ta_ngan' => 'Tắm sấy và vệ sinh tai móng.'],
            ['id_thuong_hieu' => 11, 'ten_nhan_vien' => 'Huấn luyện viên', 'hinh_anh' => 'https://i.pravatar.cc/150?u=44', 'mo_ta_ngan' => 'Tư vấn hành vi và huấn luyện cơ bản.'],
        ];

        foreach ($data as &$item) {
            $item['trang_thai_lam_viec'] = 1;
            $item['created_at'] = now();
            $item['updated_at'] = now();
        }

        DB::table('nhan_viens')->insert($data);
    }
}