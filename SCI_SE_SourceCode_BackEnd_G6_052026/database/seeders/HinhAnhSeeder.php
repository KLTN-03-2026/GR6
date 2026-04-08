<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HinhAnhSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('hinh_anh_dich_vus')->delete();
        DB::table('hinh_anh_dich_vus')->truncate();
        DB::table('hinh_anh_dich_vus')->insert([
            [
                'id_dich_vu' => 1,
                'hinh_anh' => 'https://media.loveitopcdn.com/25225/tranh-treo-tuong-barber-shop-tiem-cat-toc-nam-trang-tri-dep.jpg',
            ],
            [
                'id_dich_vu' => 2,
                'hinh_anh' => 'https://dulichtoday.vn/wp-content/uploads/2023/06/tiem-cat-toc-nu-dep-quan-5-7.jpg',
            ],
            [
                'id_dich_vu' => 3,
                'hinh_anh' => 'https://divui.com/content/images/thumbs/0008835_lets-relax-spa-bangkok-massage-thu-gian-goi-co-ban.jpeg',
            ],
            [
                'id_dich_vu' => 4,
                'hinh_anh' => 'https://toplist.vn/images/800px/dong-y-hoa-yen-tri-lieu-co-vai-gay-1352803.jpg',
            ],
            [
                'id_dich_vu' => 5,
                'hinh_anh' => 'https://cdn2.fptshop.com.vn/unsafe/massage_da_nong_4_892fee81cd.jpg',
            ],
            [
                'id_dich_vu' => 6,
                'hinh_anh' => 'https://statics.vinpearl.com/massage-chan-4_1686394893.jpg',
            ],
            [
                'id_dich_vu' => 7,
                'hinh_anh' => 'https://vinmec-prod.s3.amazonaws.com/images/20211123_004354_589374_massage-mat-6.max-1800x1800.jpg',
            ],
            [
                'id_dich_vu' => 8,
                'hinh_anh' => 'https://wallpapercave.com/wp/wp11244907.jpg',
            ],
            [
                'id_dich_vu' => 9,
                'hinh_anh' => 'https://tiki.vn/blog/wp-content/uploads/2023/01/C7BkurNn8g8jAb-MOvFpLn_Ca8tOXMmpjmp42_wAxGKpB4DwC50ZoIIXMiZigM9TWu7aKK6eMTOTvMQ4FBKIE7rQWd7OkRYCCyZF0VKGzyKu6k3MUoCXxXFUpXqmMx_bm4wg9UprAudd2hN_s8qN-Cc.png',
            ],
            [
                'id_dich_vu' => 10,
                'hinh_anh' => 'https://tiki.vn/blog/wp-content/uploads/2023/04/UjvxbXsvnCH_T55QBPP1p4I0bQZkY621eKxOKiGZkMiTaxOqPIQ0DZwT1dG-O73fdEwq0iVDYzOstuLvcAaGYEe7tYlNL2dlgRtDrVMKvN88oSg9ryZLSYOofko5-37EaunDRHyg9s6ws-KciLMSjmE.png',
            ],
            [
                'id_dich_vu' => 11,
                'hinh_anh' => 'https://medlatec.vn/media/13130/content/20201106_cach-cham-soc-da-mun-5.jpg',
            ],
            [
                'id_dich_vu' => 12,
                'hinh_anh' => 'https://careplusvn.com/files/kham-tong-quat-1.jpg',
            ],
            [
                'id_dich_vu' => 13,
                'hinh_anh' => 'https://isofhcare-backup.s3-ap-southeast-1.amazonaws.com/images/chuyen-khoa-kham-benh-tai-mediplus-co-nhung-gi-ivie-3_f9475524_238d_4283_bdda_b3ece24797c6.jpg',
            ],
            [
                'id_dich_vu' => 14,
                'hinh_anh' => 'https://nhakhoathuyanh.com/wp-content/uploads/2019/10/nho-rang-trong-chinh-nha-1.jpg',
            ],
            [
                'id_dich_vu' => 15,
                'hinh_anh' => 'https://tiki.vn/blog/wp-content/uploads/2023/03/sua-chua-may-lanh.jpg',
            ],
            [
                'id_dich_vu' => 16,
                'hinh_anh' => 'https://thodiennuocquangminh.com/wp-content/uploads/2020/04/dich-vu-sua-chua-dien-nuoc-tai-dong-da.jpg',
            ],
            [
                'id_dich_vu' => 17,
                'hinh_anh' => 'https://topdongnai.com/wp-content/uploads/2021/06/sua-may-tinh-bien-hoa-1-min.png',
            ],
            [
                'id_dich_vu' => 18,
                'hinh_anh' => 'https://product.hstatic.net/200000731893/product/nam07634-1024x683_6f2698f62f904c6e8302a5cb3835b5d2.png',
            ],
            [
                'id_dich_vu' => 19,
                'hinh_anh' => 'https://vethospital.vnua.edu.vn/wp-content/uploads/2019/11/zUZ7fot.jpg',
            ],





        ]);
    }
}
