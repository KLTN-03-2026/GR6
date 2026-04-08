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
        DB::table('danh_muc_dich_vus')->delete();
        DB::table('danh_muc_dich_vus')->truncate();
        DB::table('danh_muc_dich_vus')->insert([
            [
                'ten_dich_vu' => 'Làm đẹp',
                'id_father' => 0,
                'hinh_anh' => 'https://img.freepik.com/premium-photo/beauty-salon-logo-with-woman-face-leaves-vector-illustration_1308175-62405.jpg',
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Sức khỏe',
                'id_father' => 0,
                'hinh_anh' => 'https://img.freepik.com/premium-photo/health-wellness-digital-art_1139464-1697.jpg?w=2000',
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Kỹ thuật gia đình',
                'id_father' => 0,
                'hinh_anh' => 'https://tse3.mm.bing.net/th/id/OIP.BUjZ5fuq7vcEbOscQeWXSQHaEc?rs=1&pid=ImgDetMain&o=7&rm=3',
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Thú cưng',
                'id_father' => 0,
                'hinh_anh' => 'https://tse2.mm.bing.net/th/id/OIP.ajnnBO71NGH7idm4pDAdQAAAAA?w=360&h=360&rs=1&pid=ImgDetMain&o=7&rm=3',
                'trang_thai' => 1,
            ],

            // Dịch vụ con của Làm đẹp
            [
                'ten_dich_vu' => 'Salon Tóc',
                'id_father' => 1,
                'hinh_anh' => 'https://thietkenoithatatz.com/wp-content/uploads/2022/09/Thiet-ke-salon-toc-16-9-23.jpg',
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Spa & Massage',
                'id_father' => 1,
                'hinh_anh' => 'https://th.bing.com/th/id/R.86ab550334214bfae75306298ec8da05?rik=DanSlFx5kQENMw&pid=ImgRaw&r=0',
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Nail',
                'id_father' => 1,
                'hinh_anh' => 'https://th.bing.com/th/id/R.86ab550334214bfae75306298ec8da05?rik=DanSlFx5kQENMw&pid=ImgRaw&r=0',
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Clinic',
                'id_father' => 1,
                'hinh_anh' => 'https://i.pinimg.com/originals/71/41/a7/7141a7da46bad58cbe7070a06f35645d.jpg',
                'trang_thai' => 1,
            ],
            // Dịch vụ con của Sức khỏe
            [
                'ten_dich_vu' => 'Phòng khám đa khoa',
                'id_father' => 2,
                'hinh_anh' => 'https://img.freepik.com/premium-photo/health-wellness-digital-art_1139464-1697.jpg?w=2000',
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Phòng khám chuyên khoa',
                'id_father' => 2,
                'hinh_anh' => 'https://toplist.vn/images/800px/phong-kham-da-khoa-dinh-trong-son-440568.jpg',
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Phòng khám nha khoa',
                'id_father' => 2,
                'hinh_anh' => 'https://tse2.mm.bing.net/th/id/OIP.8vrgB-cN8QHTs3XajTvSEgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3',
                'trang_thai' => 1,
            ],
            // Dịch vụ con của Kỹ thuật gia đình
            [
                'ten_dich_vu' => 'Sửa chữa điện',
                'id_father' => 3,
                'hinh_anh' => 'https://top10tphcm.com/wp-content/uploads/2019/03/top-dich-vu-sua-chua-dien-nuoc-tai-nha-hcm.jpg',
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Sửa chữa nước',
                'id_father' => 3,
                'hinh_anh' => 'https://lh5.googleusercontent.com/O4ohq_4k3OMiXoZxr0Rmi7XSnl8eZhhxHwI8J7AroJdtKoyYCXqll-IzTJqChd1INidiYuN1iSxXwdWEG9QO5BlY-Xt0WfxTMchvtvKGJ7COKgC2rEamxKB011iRFykcO8xrXpDDvBoeO9MYzbepXoNe6NYTRqk76v1yYuDqDyVaAkcNEkXoruKD',
                'trang_thai' => 1,
            ],
            [
                'ten_dich_vu' => 'Sửa chữa điện tử',
                'id_father' => 3,
                'hinh_anh' => 'https://tse1.explicit.bing.net/th/id/OIP.ZSFBCUweUrTg8JC6q2hTzQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3',
                'trang_thai' => 1,
            ],
            // Dịch vụ con của Thú cưng
            [
                'ten_dich_vu' => 'Dịch vụ chăm sóc thú cưng',
                'id_father' => 4,
                'hinh_anh' => 'https://top3.vn/uploads/source/OanhOanh/thu-cung/tim-viec-spa-thu-cung.jpg',
                'trang_thai' => 1,
            ],


        ]);
    }
}
