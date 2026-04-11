<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

abstract class Controller
{
    //check role khách hàng
    public function isUserKhachHang()
    {
        $user = Auth::guard('sanctum')->user();

        if ($user instanceof \App\Models\KhachHang) {
            return $user;
        }
        return false;
    }
      public function isUserNhaCungCap()
    {
        $user = Auth::guard('sanctum')->user();

        if ($user instanceof \App\Models\NhaCungCap) {
            return $user;
        }
        return false;
    }
    public function isUserAdmin()
    {
        $user = Auth::guard('sanctum')->user();

        if ($user instanceof \App\Models\Admin) {
            return $user;
        }
        return false;
    }
    //quên mật khẩu chung cho cả khách hàng và nhà cung cấp
    
}
