<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class NhaCungCap extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'nha_cung_caps';
    protected $fillable = [
        'ten_nha_cung_cap',
        'so_dien_thoai',
        'avatar',
        'email',
        'password',
        'dia_chi',
        'is_blocked',
        'is_active',
        'hash_active'
    ];
}
