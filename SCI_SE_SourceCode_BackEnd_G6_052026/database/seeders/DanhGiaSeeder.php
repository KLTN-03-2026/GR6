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
            // --- ID 1: Cắt tóc nam Combo ---
            ['id_khach_hang' => 1, 'id_dich_vu' => 1, 'muc_hai_long' => 5, 'noi_dung' => 'Thợ cắt rất chắc tay, combo gội đầu massage cực kỳ thư giãn.'],
            ['id_khach_hang' => 2, 'id_dich_vu' => 1, 'muc_hai_long' => 4, 'noi_dung' => 'Cắt đẹp nhưng cuối tuần hơi đông, phải chờ khoảng 15 phút.'],
            ['id_khach_hang' => 3, 'id_dich_vu' => 1, 'muc_hai_long' => 5, 'noi_dung' => 'Không gian tiệm rất chất, nhân viên tư vấn kiểu tóc hợp mặt.'],
            ['id_khach_hang' => 4, 'id_dich_vu' => 1, 'muc_hai_long' => 5, 'noi_dung' => 'Giá 100k cho combo này ở Quận 3 là quá rẻ, sẽ quay lại.'],

            // --- ID 2: Cắt tóc nữ Layer ---
            ['id_khach_hang' => 5, 'id_dich_vu' => 2, 'muc_hai_long' => 5, 'noi_dung' => 'Cắt layer rất chuẩn, tóc về nhà tự sấy vẫn ra form đẹp.'],
            ['id_khach_hang' => 6, 'id_dich_vu' => 2, 'muc_hai_long' => 5, 'noi_dung' => 'Thợ nữ tư vấn rất kỹ, không chèo kéo làm thêm dịch vụ.'],
            ['id_khach_hang' => 7, 'id_dich_vu' => 2, 'muc_hai_long' => 4, 'noi_dung' => 'Dịch vụ tốt, dụng cụ sạch sẽ nhưng chỗ để xe hơi chật.'],
            ['id_khach_hang' => 8, 'id_dich_vu' => 2, 'muc_hai_long' => 5, 'noi_dung' => 'Rất hài lòng với kiểu tóc mới, bạn bè ai cũng khen.'],

            // --- ID 3: Massage Body tinh dầu ---
            ['id_khach_hang' => 9, 'id_dich_vu' => 3, 'muc_hai_long' => 5, 'noi_dung' => 'Mùi tinh dầu oải hương rất thơm, phòng yên tĩnh, ngủ quên luôn.'],
            ['id_khach_hang' => 10, 'id_dich_vu' => 3, 'muc_hai_long' => 5, 'noi_dung' => 'Kỹ thuật viên bóp rất lực, hết hẳn đau mỏi sau 60 phút.'],
            ['id_khach_hang' => 1, 'id_dich_vu' => 3, 'muc_hai_long' => 4, 'noi_dung' => 'Không gian thư giãn, nhạc thiền dễ nghe, rất hài lòng.'],
            ['id_khach_hang' => 2, 'id_dich_vu' => 3, 'muc_hai_long' => 5, 'noi_dung' => 'Lễ tân niềm nở, trà gừng sau khi làm xong rất ấm bụng.'],

            // --- ID 4: Massage Cổ Vai Gáy ---
            ['id_khach_hang' => 3, 'id_dich_vu' => 4, 'muc_hai_long' => 5, 'noi_dung' => 'Cứu cánh cho dân văn phòng, ấn huyệt xong vùng cổ nhẹ hẳn.'],
            ['id_khach_hang' => 4, 'id_dich_vu' => 4, 'muc_hai_long' => 5, 'noi_dung' => 'Nhân viên có chuyên môn, giải thích kỹ các điểm tắc nghẽn.'],
            ['id_khach_hang' => 5, 'id_dich_vu' => 4, 'muc_hai_long' => 4, 'noi_dung' => 'Dịch vụ ổn, tuy nhiên điều hòa trong phòng hơi lạnh.'],
            ['id_khach_hang' => 6, 'id_dich_vu' => 4, 'muc_hai_long' => 5, 'noi_dung' => 'Giá hợp lý, liệu trình chuyên sâu, sẽ dẫn người thân tới.'],

            // --- ID 5: Massage Đá nóng ---
            ['id_khach_hang' => 7, 'id_dich_vu' => 5, 'muc_hai_long' => 5, 'noi_dung' => 'Đá núi lửa giữ nhiệt tốt, massage rất sướng, người ấm hẳn lên.'],
            ['id_khach_hang' => 8, 'id_dich_vu' => 5, 'muc_hai_long' => 5, 'noi_dung' => 'Trải nghiệm tuyệt vời, kỹ thuật viên làm đủ thời gian.'],
            ['id_khach_hang' => 9, 'id_dich_vu' => 5, 'muc_hai_long' => 4, 'noi_dung' => 'Rất thư giãn, tuy nhiên cần đặt trước 1 ngày mới có chỗ.'],
            ['id_khach_hang' => 10, 'id_dich_vu' => 5, 'muc_hai_long' => 5, 'noi_dung' => 'Phòng massage decor theo phong cách Zen rất tịnh tâm.'],

            // --- ID 6: Massage chân (Foot) ---
            ['id_khach_hang' => 11, 'id_dich_vu' => 6, 'muc_hai_long' => 5, 'noi_dung' => 'Bấm huyệt bàn chân cực phê, hết nhức mỏi ngay lập tức.'],
            ['id_khach_hang' => 12, 'id_dich_vu' => 6, 'muc_hai_long' => 4, 'noi_dung' => 'Ngâm chân thảo dược thơm, nhân viên massage đều tay.'],
            ['id_khach_hang' => 13, 'id_dich_vu' => 6, 'muc_hai_long' => 5, 'noi_dung' => 'Giá rẻ so với chất lượng phục vụ, ghế ngồi rất thoải mái.'],
            ['id_khach_hang' => 14, 'id_dich_vu' => 6, 'muc_hai_long' => 5, 'noi_dung' => 'Nhân viên nói chuyện nhẹ nhàng, không gian sạch sẽ.'],

            // --- ID 7: Massage mặt thư giãn ---
            ['id_khach_hang' => 15, 'id_dich_vu' => 7, 'muc_hai_long' => 5, 'noi_dung' => 'Da mặt căng bóng sau khi làm, sản phẩm sử dụng mùi rất tự nhiên.'],
            ['id_khach_hang' => 16, 'id_dich_vu' => 7, 'muc_hai_long' => 5, 'noi_dung' => 'Kỹ thuật massage mặt giúp thon gọn cơ mặt, rất thích.'],
            ['id_khach_hang' => 1, 'id_dich_vu' => 7, 'muc_hai_long' => 4, 'noi_dung' => 'Làm rất kỹ nhưng mình mong muốn massage đầu lâu hơn chút.'],
            ['id_khach_hang' => 2, 'id_dich_vu' => 7, 'muc_hai_long' => 5, 'noi_dung' => 'Phòng ốc sạch đẹp, cảm giác rất sảng khoái sau khi xong.'],

            // --- ID 8: Massage toàn thân VIP ---
            ['id_khach_hang' => 3, 'id_dich_vu' => 8, 'muc_hai_long' => 5, 'noi_dung' => 'Gói VIP 120 phút cực kỳ đáng tiền, trải nghiệm thượng lưu.'],
            ['id_khach_hang' => 4, 'id_dich_vu' => 8, 'muc_hai_long' => 5, 'noi_dung' => 'Phòng riêng hoàn toàn, có cả xông hơi, cực kỳ riêng tư.'],
            ['id_khach_hang' => 5, 'id_dich_vu' => 8, 'muc_hai_long' => 5, 'noi_dung' => 'Kỹ thuật viên giỏi nhất tiệm, phục vụ rất chu đáo.'],
            ['id_khach_hang' => 6, 'id_dich_vu' => 8, 'muc_hai_long' => 4, 'noi_dung' => 'Dịch vụ hoàn hảo, chỉ tiếc là khó đặt lịch vào giờ cao điểm.'],
            
            // --- ID 9: Làm móng tay (Nail) ---
            ['id_khach_hang' => 7, 'id_dich_vu' => 9, 'muc_hai_long' => 5, 'noi_dung' => 'Nhặt da rất sạch, không bị đau hay chảy máu, sơn gel đều.'],
            ['id_khach_hang' => 8, 'id_dich_vu' => 9, 'muc_hai_long' => 5, 'noi_dung' => 'Mẫu mã đa dạng, thợ vẽ móng rất tỉ mỉ từng chi tiết.'],
            ['id_khach_hang' => 9, 'id_dich_vu' => 9, 'muc_hai_long' => 4, 'noi_dung' => 'Sơn bền, giữ được hơn 3 tuần vẫn còn bóng.'],
            ['id_khach_hang' => 10, 'id_dich_vu' => 9, 'muc_hai_long' => 5, 'noi_dung' => 'Dụng cụ lấy từ máy tiệt trùng ra nên cực kỳ yên tâm.'],

            // --- ID 10: Làm móng chân ---
            ['id_khach_hang' => 11, 'id_dich_vu' => 10, 'muc_hai_long' => 5, 'noi_dung' => 'Combo chà gót chân làm rất kỹ, da mềm mịn hẳn ra.'],
            ['id_khach_hang' => 12, 'id_dich_vu' => 10, 'muc_hai_long' => 5, 'noi_dung' => 'Nhân viên làm nhiệt tình, móng chân cắt tỉa gọn gàng.'],
            ['id_khach_hang' => 13, 'id_dich_vu' => 10, 'muc_hai_long' => 4, 'noi_dung' => 'Dịch vụ tốt, phòng làm nail hơi nhỏ nhưng sạch sẽ.'],
            ['id_khach_hang' => 14, 'id_dich_vu' => 10, 'muc_hai_long' => 5, 'noi_dung' => 'Giá rẻ so với các tiệm nail khác ở Quận 4.'],

            // --- ID 11: Lấy nhân mụn Y khoa ---
            ['id_khach_hang' => 15, 'id_dich_vu' => 11, 'muc_hai_long' => 5, 'noi_dung' => 'Lấy nhân mụn rất kỹ, không bị sưng viêm sau khi làm.'],
            ['id_khach_hang' => 16, 'id_dich_vu' => 11, 'muc_hai_long' => 4, 'noi_dung' => 'Quy trình chuẩn y khoa, sát khuẩn cực kỳ nghiêm ngặt.'],
            ['id_khach_hang' => 17, 'id_dich_vu' => 11, 'muc_hai_long' => 5, 'noi_dung' => 'Bác sĩ soi da và tư vấn phác đồ điều trị rất tận tâm.'],
            ['id_khach_hang' => 18, 'id_dich_vu' => 11, 'muc_hai_long' => 5, 'noi_dung' => 'Da cải thiện rõ rệt sau 3 buổi liệu trình.'],

            // --- ID 12: Khám tổng quát cơ bản ---
            ['id_khach_hang' => 19, 'id_dich_vu' => 12, 'muc_hai_long' => 5, 'noi_dung' => 'Bệnh viện sạch sẽ, quy trình khám nhanh, không phải chờ lâu.'],
            ['id_khach_hang' => 20, 'id_dich_vu' => 12, 'muc_hai_long' => 5, 'noi_dung' => 'Bác sĩ giải thích kết quả xét nghiệm rất chi tiết, dễ hiểu.'],
            ['id_khach_hang' => 1, 'id_dich_vu' => 12, 'muc_hai_long' => 4, 'noi_dung' => 'Gói khám đầy đủ, giá cả minh bạch đúng như website.'],
            ['id_khach_hang' => 2, 'id_dich_vu' => 12, 'muc_hai_long' => 5, 'noi_dung' => 'Nhân viên hướng dẫn các phòng ban nhiệt tình.'],

            // --- ID 13: Nội soi Tai Mũi Họng ---
            ['id_khach_hang' => 3, 'id_dich_vu' => 13, 'muc_hai_long' => 5, 'noi_dung' => 'Ống nội soi mềm nên làm không bị đau hay khó chịu.'],
            ['id_khach_hang' => 4, 'id_dich_vu' => 13, 'muc_hai_long' => 5, 'noi_dung' => 'Hình ảnh rõ nét, bác sĩ chỉ rõ vùng viêm cho mình xem.'],
            ['id_khach_hang' => 5, 'id_dich_vu' => 13, 'muc_hai_long' => 4, 'noi_dung' => 'Quy trình chuyên nghiệp, kết quả có ngay sau khi khám.'],
            ['id_khach_hang' => 6, 'id_dich_vu' => 13, 'muc_hai_long' => 5, 'noi_dung' => 'Phòng khám hiện đại, an tâm về khâu vệ sinh máy móc.'],

            // --- ID 14: Nhổ răng khôn ---
            ['id_khach_hang' => 7, 'id_dich_vu' => 14, 'muc_hai_long' => 5, 'noi_dung' => 'Nhổ răng khôn bằng máy Piezotome nhanh và không đau.'],
            ['id_khach_hang' => 8, 'id_dich_vu' => 14, 'muc_hai_long' => 5, 'noi_dung' => 'Bác sĩ tay nghề giỏi, nhổ xong không bị sưng mặt.'],
            ['id_khach_hang' => 9, 'id_dich_vu' => 14, 'muc_hai_long' => 4, 'noi_dung' => 'Giá hơi cao nhưng chất lượng dịch vụ rất tốt.'],
            ['id_khach_hang' => 10, 'id_dich_vu' => 14, 'muc_hai_long' => 5, 'noi_dung' => 'Chăm sóc hậu phẫu chu đáo, gọi điện hỏi thăm khách hàng.'],

            // --- ID 15: Vệ sinh máy lạnh ---
            ['id_khach_hang' => 11, 'id_dich_vu' => 15, 'muc_hai_long' => 5, 'noi_dung' => 'Thợ đến đúng giờ, làm việc sạch sẽ, bạt che chắn kỹ.'],
            ['id_khach_hang' => 12, 'id_dich_vu' => 15, 'muc_hai_long' => 5, 'noi_dung' => 'Máy lạnh chạy cực mát sau khi vệ sinh, thợ kiểm tra ga kỹ.'],
            ['id_khach_hang' => 13, 'id_dich_vu' => 15, 'muc_hai_long' => 4, 'noi_dung' => 'Giá cả rõ ràng, không vẽ thêm bệnh.'],
            ['id_khach_hang' => 14, 'id_dich_vu' => 15, 'muc_hai_long' => 5, 'noi_dung' => 'Dịch vụ nhanh chóng, thái độ thợ rất lịch sự.'],

            // --- ID 16: Thông nghẹt ống nước ---
            ['id_khach_hang' => 15, 'id_dich_vu' => 16, 'muc_hai_long' => 5, 'noi_dung' => 'Sử dụng máy lò xo hiện đại, thông nghẹt triệt để.'],
            ['id_khach_hang' => 16, 'id_dich_vu' => 16, 'muc_hai_long' => 5, 'noi_dung' => 'Thợ tìm đúng nguyên nhân nghẹt, sửa rất nhanh.'],
            ['id_khach_hang' => 17, 'id_dich_vu' => 16, 'muc_hai_long' => 4, 'noi_dung' => 'Giá hợp lý, làm việc có trách nhiệm.'],
            ['id_khach_hang' => 18, 'id_dich_vu' => 16, 'muc_hai_long' => 5, 'noi_dung' => 'Xử lý xong còn hướng dẫn mình cách tránh bị nghẹt lại.'],

            // --- ID 17: Sửa chữa Laptop/PC ---
            ['id_khach_hang' => 19, 'id_dich_vu' => 17, 'muc_hai_long' => 5, 'noi_dung' => 'Cài lại Win và vệ sinh máy xong chạy nhanh hẳn ra.'],
            ['id_khach_hang' => 20, 'id_dich_vu' => 17, 'muc_hai_long' => 5, 'noi_dung' => 'Thợ báo giá linh kiện thay thế rõ ràng, bảo hành lâu.'],
            ['id_khach_hang' => 1, 'id_dich_vu' => 17, 'muc_hai_long' => 4, 'noi_dung' => 'Làm việc nhiệt tình, hỗ trợ cài đặt các phần mềm đồ họa.'],
            ['id_khach_hang' => 2, 'id_dich_vu' => 17, 'muc_hai_long' => 5, 'noi_dung' => 'Sửa tận nhà rất tiện lợi cho người bận rộn.'],

            // --- ID 18: Spa thú cưng (Grooming) ---
            ['id_khach_hang' => 3, 'id_dich_vu' => 18, 'muc_hai_long' => 5, 'noi_dung' => 'Cắt tỉa lông cho bé cún rất xinh, bé về thơm phức.'],
            ['id_khach_hang' => 4, 'id_dich_vu' => 18, 'muc_hai_long' => 5, 'noi_dung' => 'Nhân viên yêu động vật, dỗ dành bé rất khéo léo.'],
            ['id_khach_hang' => 5, 'id_dich_vu' => 18, 'muc_hai_long' => 4, 'noi_dung' => 'Dịch vụ tốt, dụng cụ spa nhìn rất sạch và chuyên nghiệp.'],
            ['id_khach_hang' => 6, 'id_dich_vu' => 18, 'muc_hai_long' => 5, 'noi_dung' => 'Bé mèo nhà mình tắm xong lông mượt và không bị hoảng.'],

            // --- ID 19: Khám thú y tổng quát ---
            ['id_khach_hang' => 7, 'id_dich_vu' => 19, 'muc_hai_long' => 5, 'noi_dung' => 'Bác sĩ thú y khám kỹ, tư vấn chế độ ăn rất chi tiết.'],
            ['id_khach_hang' => 8, 'id_dich_vu' => 19, 'muc_hai_long' => 5, 'noi_dung' => 'Tiêm phòng nhẹ nhàng, bé không bị sốt hay bỏ ăn.'],
            ['id_khach_hang' => 9, 'id_dich_vu' => 19, 'muc_hai_long' => 4, 'noi_dung' => 'Cơ sở vật chất hiện đại, có đầy đủ máy xét nghiệm.'],
            ['id_khach_hang' => 10, 'id_dich_vu' => 19, 'muc_hai_long' => 5, 'noi_dung' => 'Bác sĩ có tâm, gọi điện hỏi thăm tình hình bé sau khám.'],

            // --- ID 20: Nâng cơ mặt Hifu ---
            ['id_khach_hang' => 11, 'id_dich_vu' => 20, 'muc_hai_long' => 5, 'noi_dung' => 'Hiệu quả thấy rõ ngay sau khi làm, da mặt săn chắc hẳn.'],
            ['id_khach_hang' => 12, 'id_dich_vu' => 20, 'muc_hai_long' => 5, 'noi_dung' => 'Công nghệ hiện đại, làm không bị đau hay sưng đỏ.'],
            ['id_khach_hang' => 13, 'id_dich_vu' => 20, 'muc_hai_long' => 4, 'noi_dung' => 'Nhân viên tư vấn nhiệt tình, không gian sang trọng.'],
            ['id_khach_hang' => 14, 'id_dich_vu' => 20, 'muc_hai_long' => 5, 'noi_dung' => 'Dịch vụ cao cấp, xứng đáng với giá tiền.'],

            // --- ID 21: Chăm sóc da mặt Oxy ---
            ['id_khach_hang' => 15, 'id_dich_vu' => 21, 'muc_hai_long' => 5, 'noi_dung' => 'Da sáng mịn và đều màu hẳn sau khi cấp oxy tươi.'],
            ['id_khach_hang' => 16, 'id_dich_vu' => 21, 'muc_hai_long' => 5, 'noi_dung' => 'Cảm giác da được phục hồi sau những ngày đi nắng.'],
            ['id_khach_hang' => 17, 'id_dich_vu' => 21, 'muc_hai_long' => 4, 'noi_dung' => 'Sảng khoái, se khít lỗ chân lông hiệu quả.'],
            ['id_khach_hang' => 18, 'id_dich_vu' => 21, 'muc_hai_long' => 5, 'noi_dung' => 'Kỹ thuật viên làm nhẹ nhàng, phòng thơm mùi sả chanh.'],

            // --- ID 22: Vệ sinh máy giặt ---
            ['id_khach_hang' => 19, 'id_dich_vu' => 22, 'muc_hai_long' => 5, 'noi_dung' => 'Tháo lồng giặt ra vệ sinh thấy kinh khủng thật, thợ làm rất kỹ.'],
            ['id_khach_hang' => 20, 'id_dich_vu' => 22, 'muc_hai_long' => 5, 'noi_dung' => 'Máy giặt hết hẳn mùi hôi bám vào quần áo.'],
            ['id_khach_hang' => 1, 'id_dich_vu' => 22, 'muc_hai_long' => 4, 'noi_dung' => 'Thợ chuyên nghiệp, dọn dẹp sạch sẽ nhà tắm sau làm.'],
            ['id_khach_hang' => 2, 'id_dich_vu' => 22, 'muc_hai_long' => 5, 'noi_dung' => 'Giá tốt, vệ sinh xong máy chạy êm hơn.'],

            // --- ID 23: Nạp ga máy lạnh ---
            ['id_khach_hang' => 3, 'id_dich_vu' => 23, 'muc_hai_long' => 5, 'noi_dung' => 'Nạp ga đúng loại R32, máy lạnh sâu nhanh chóng.'],
            ['id_khach_hang' => 4, 'id_dich_vu' => 23, 'muc_hai_long' => 5, 'noi_dung' => 'Thợ đo áp suất ga cho mình xem rồi mới nạp, rất uy tín.'],
            ['id_khach_hang' => 5, 'id_dich_vu' => 23, 'muc_hai_long' => 4, 'noi_dung' => 'Xử lý rò rỉ ga triệt để trước khi nạp thêm.'],
            ['id_khach_hang' => 6, 'id_dich_vu' => 23, 'muc_hai_long' => 5, 'noi_dung' => 'Phục vụ tận tình, có mặt sau 30 phút gọi điện.'],

            // --- ID 24: Khách sạn thú cưng (24h) ---
            ['id_khach_hang' => 7, 'id_dich_vu' => 24, 'muc_hai_long' => 5, 'noi_dung' => 'Gửi bé đi du lịch rất yên tâm vì có camera xem trực tiếp.'],
            ['id_khach_hang' => 8, 'id_dich_vu' => 24, 'muc_hai_long' => 5, 'noi_dung' => 'Chuồng trại sạch sẽ, máy lạnh mát mẻ, bé về không bị sụt cân.'],
            ['id_khach_hang' => 9, 'id_dich_vu' => 24, 'muc_hai_long' => 4, 'noi_dung' => 'Các bạn nhân viên cập nhật tình hình bé hàng ngày rất đều.'],
            ['id_khach_hang' => 10, 'id_dich_vu' => 24, 'muc_hai_long' => 5, 'noi_dung' => 'Môi trường thân thiện, bé mèo nhà mình không bị stress.'],
        ]);
    }
}