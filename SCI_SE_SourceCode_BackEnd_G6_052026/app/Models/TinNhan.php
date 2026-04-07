<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TinNhan extends Model
{
    use HasFactory;
    protected $table = 'tin_nhans';
    protected $fillable = [
        'id_hoi_thoai',
        'role_nguoi_gui',
        'noi_dung',
    ];
}
