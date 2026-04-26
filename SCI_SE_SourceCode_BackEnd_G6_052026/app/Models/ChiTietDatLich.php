<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietDatLich extends Model
{
    use HasFactory;
    protected $table = 'chi_tiet_dat_lichs';
    protected $fillable = [
        'id_dat_lich',
        'id_dich_vu',
        'id_nhan_vien',
        'ma_hoa_don',
        'dia_chi_thuc_hien',
        'gio_bat_dau',
        'ngay_dat_lich',
        'so_luong',
        'don_gia',
    ];
}
