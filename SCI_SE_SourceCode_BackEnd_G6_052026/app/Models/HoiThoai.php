<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HoiThoai extends Model
{
    use HasFactory;
    protected $table = 'hoi_thoais';
    protected $fillable = [
        'id_khach_hang',
        'id_thuong_hieu',
    ];
}
