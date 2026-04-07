<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class KhachHang extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "khach_hangs";
    protected $fillable = [
        'ten_khach_hang',
        'so_dien_thoai',
        'avatar',
        'email',
        'password',
        'is_blocked',
        'is_active',
        'hash_active'
    ];
}
