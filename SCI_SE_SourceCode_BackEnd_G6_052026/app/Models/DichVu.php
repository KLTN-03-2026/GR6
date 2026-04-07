<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DichVu extends Model
{
    use HasFactory;
    protected $table = 'dich_vus';
    protected $fillable = [
        'id_thuong_hieu',
        'id_danh_muc_dich_vu',
        'ten_dich_vu',
        'don_gia',
        'thoi_gian_du_kien',
        'thoi_gian_dem',
        'mo_ta_ngan',
        'mo_ta_dai',
        'so_luong_lich_toi_da',
        'trang_thai',
        'kieu_phuc_vu',
    ];
}
