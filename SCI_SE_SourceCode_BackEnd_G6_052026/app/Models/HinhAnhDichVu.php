<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HinhAnhDichVu extends Model
{
    use HasFactory;
    protected $table = 'hinh_anh_dich_vus';
    protected $fillable = [
        'id_dich_vu',
        'hinh_anh'
    ];
}
