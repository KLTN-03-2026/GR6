<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhanVien extends Model
{
    use HasFactory;
    protected $table = 'nhan_viens';
    protected $fillable = [
        'id_thuong_hieu',
        'ten_nhan_vien',
        'hinh_anh',
        'mo_ta_ngan',
        'trang_thai_lam_viec',
    ];
}
