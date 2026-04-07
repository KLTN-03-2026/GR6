<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DanhMucDichVu extends Model
{
    use HasFactory;
    protected $table = 'danh_muc_dich_vus';
    protected $fillable = [
        'ten_dich_vu',
        'id_father',
        'hinh_anh',
        'trang_thai',
    ];
}
