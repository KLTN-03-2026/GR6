<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThuongHieu extends Model
{
    use HasFactory;
    protected $table = 'thuong_hieus';
    protected $fillable = [
        'id_nha_cung_cap',
        'id_danh_muc_dich_vu',
        'ten_thuong_hieu',
        'dia_chi',
        'so_dien_thoai',
        'logo',
        'mo_ta',
        'ma_so_thue',
        'ten_ngan_hang',
        'tai_khoan_ngan_hang',
        'diem_hai_long',
        'is_active',
    ];
}
