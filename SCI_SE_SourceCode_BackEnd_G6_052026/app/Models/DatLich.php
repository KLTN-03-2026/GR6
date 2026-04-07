<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatLich extends Model
{
    use HasFactory;
    protected $table = 'dat_lichs';
    protected $fillable = [
        'id_thuong_hieu',
        'id_khach_hang',
        'ten_nguoi_dat',
        'so_dien_thoai_nguoi_dat',
        'ghi_chu',
        'trang_thai_dat_lich',
    ];
}
