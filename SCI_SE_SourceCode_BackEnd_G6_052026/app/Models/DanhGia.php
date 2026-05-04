<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DanhGia extends Model
{
    use HasFactory;
    protected $table = 'danh_gias';
    protected $fillable = [
        'id_khach_hang',
        'id_dich_vu',
        'noi_dung',
        'muc_hai_long',
    ];
}
