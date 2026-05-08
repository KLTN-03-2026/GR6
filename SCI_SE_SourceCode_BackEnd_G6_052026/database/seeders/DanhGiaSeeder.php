<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DanhGiaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('danh_gias')->delete();
        DB::table('danh_gias')->truncate();
        DB::table('danh_gias')->insert([
            ['id_khach_hang' => 1, 'id_dich_vu' => 1, 'muc_hai_long' => 5, 'noi_dung' => 'Cắt tóc nam rất chuyên nghiệp, thợ có tâm.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 2, 'id_dich_vu' => 3, 'muc_hai_long' => 5, 'noi_dung' => 'Massage body cực kỳ thư giãn, không gian thơm.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 3, 'id_dich_vu' => 4, 'muc_hai_long' => 4, 'noi_dung' => 'Dịch vụ gội đầu tốt nhưng hơi đông vào cuối tuần.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 5, 'id_dich_vu' => 5, 'muc_hai_long' => 5, 'noi_dung' => 'Làm nail tết rất đẹp, bền màu.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 7, 'id_dich_vu' => 11, 'muc_hai_long' => 5, 'noi_dung' => 'Khám tổng quát kỹ lưỡng, bác sĩ tư vấn nhiệt tình.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 9, 'id_dich_vu' => 13, 'muc_hai_long' => 5, 'noi_dung' => 'Sửa máy lạnh nhanh, giá cả minh bạch.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 10, 'id_dich_vu' => 15, 'muc_hai_long' => 4, 'noi_dung' => 'Sửa điện tại nhà rất chuyên nghiệp.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 11, 'id_dich_vu' => 17, 'muc_hai_long' => 5, 'noi_dung' => 'Spa chó mèo sạch sẽ, bé về rất thơm.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 12, 'id_dich_vu' => 1, 'muc_hai_long' => 5, 'noi_dung' => 'Rất hài lòng với kiểu tóc mới.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 13, 'id_dich_vu' => 3, 'muc_hai_long' => 5, 'noi_dung' => 'Dịch vụ massage đá nóng tuyệt vời.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 14, 'id_dich_vu' => 4, 'muc_hai_long' => 5, 'noi_dung' => 'Gội đầu dưỡng sinh rất phê.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 17, 'id_dich_vu' => 5, 'muc_hai_long' => 4, 'noi_dung' => 'Mẫu nail đa dạng, thợ vẽ tay rất khéo.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 18, 'id_dich_vu' => 11, 'muc_hai_long' => 5, 'noi_dung' => 'Bệnh viện thú y sạch sẽ, hiện đại.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 19, 'id_dich_vu' => 13, 'muc_hai_long' => 5, 'noi_dung' => 'Máy lạnh chạy mát lạnh sau khi bảo trì.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 20, 'id_dich_vu' => 15, 'muc_hai_long' => 4, 'noi_dung' => 'Thợ sửa nước đến đúng giờ.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 1, 'id_dich_vu' => 17, 'muc_hai_long' => 5, 'noi_dung' => 'Bé mèo nhà mình rất thích spa ở đây.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 2, 'id_dich_vu' => 1, 'muc_hai_long' => 5, 'noi_dung' => 'Cắt tóc layer cực xinh.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 3, 'id_dich_vu' => 3, 'muc_hai_long' => 5, 'noi_dung' => 'Nhân viên massage nhẹ nhàng, lịch sự.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 5, 'id_dich_vu' => 4, 'muc_hai_long' => 5, 'noi_dung' => 'Dịch vụ gội đầu thảo dược rất tốt.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 7, 'id_dich_vu' => 5, 'muc_hai_long' => 5, 'noi_dung' => 'Sơn gel bền, không bị bong tróc.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 9, 'id_dich_vu' => 11, 'muc_hai_long' => 4, 'noi_dung' => 'Tư vấn sức khỏe rất kỹ.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 10, 'id_dich_vu' => 13, 'muc_hai_long' => 5, 'noi_dung' => 'Xử lý rò rỉ máy lạnh triệt để.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 11, 'id_dich_vu' => 15, 'muc_hai_long' => 5, 'noi_dung' => 'Thay thiết bị điện chính hãng, yên tâm.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 12, 'id_dich_vu' => 17, 'muc_hai_long' => 5, 'noi_dung' => 'Tắm sấy cho cún rất sạch sẽ.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 13, 'id_dich_vu' => 1, 'muc_hai_long' => 4, 'noi_dung' => 'Tiệm hơi đông nhưng phục vụ tốt.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 14, 'id_dich_vu' => 3, 'muc_hai_long' => 5, 'noi_dung' => 'Xông hơi xong thấy người nhẹ nhõm hẳn.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 17, 'id_dich_vu' => 4, 'muc_hai_long' => 5, 'noi_dung' => 'Massage đầu khi gội rất thích.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 18, 'id_dich_vu' => 5, 'muc_hai_long' => 5, 'noi_dung' => 'Màu sơn rất sang trọng.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 19, 'id_dich_vu' => 11, 'muc_hai_long' => 5, 'noi_dung' => 'Xét nghiệm máu nhanh, kết quả chuẩn.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 20, 'id_dich_vu' => 13, 'muc_hai_long' => 4, 'noi_dung' => 'Vệ sinh máy lạnh sạch sẽ, không chảy nước nữa.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 1, 'id_dich_vu' => 15, 'muc_hai_long' => 5, 'noi_dung' => 'Thợ điện tay nghề giỏi.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 2, 'id_dich_vu' => 17, 'muc_hai_long' => 5, 'noi_dung' => 'Dịch vụ khách sạn thú cưng rất tốt.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 3, 'id_dich_vu' => 1, 'muc_hai_long' => 5, 'noi_dung' => 'Cắt tóc đúng form mình muốn.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 5, 'id_dich_vu' => 3, 'muc_hai_long' => 4, 'noi_dung' => 'Thư giãn tuyệt đối sau giờ làm.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 7, 'id_dich_vu' => 4, 'muc_hai_long' => 5, 'noi_dung' => 'Dầu gội thảo thơm lắm.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 9, 'id_dich_vu' => 5, 'muc_hai_long' => 5, 'noi_dung' => 'Nail đẹp, giá hợp túi tiền.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 10, 'id_dich_vu' => 11, 'muc_hai_long' => 5, 'noi_dung' => 'Bác sĩ thú y rất yêu động vật.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 11, 'id_dich_vu' => 13, 'muc_hai_long' => 5, 'noi_dung' => 'Lắp đặt máy lạnh chuyên nghiệp.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 12, 'id_dich_vu' => 15, 'muc_hai_long' => 4, 'noi_dung' => 'Sửa ống nước nhanh gọn.', 'created_at' => now(), 'updated_at' => now()],
            ['id_khach_hang' => 13, 'id_dich_vu' => 17, 'muc_hai_long' => 5, 'noi_dung' => 'Mèo nhà mình tắm xong rất mượt lông.', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}