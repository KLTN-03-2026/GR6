<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThanhToan extends Model
{
    use HasFactory;
    protected $table = 'thanh_toans';
    protected $fillable = [
        'id_chi_tiet_dat_lich',
        'tong_tien_thanh_toan',
        'tong_tien_da_nhan',
        'trang_thai',
        'is_failed',
    ];
}
