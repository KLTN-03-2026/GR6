<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LichLamViec extends Model
{
    use HasFactory;
    protected $table = 'lich_lam_viecs';
    protected $fillable = [
        'id_thuong_hieu',
        'thu_trong_tuan',
        'gio_mo_cua',
        'gio_dong_cua',
        'trang_thai',
    ];
}
