<?php

use App\Http\Controllers\DichVuController;
use App\Http\Controllers\KhachHangController;
use App\Http\Controllers\NhaCungCapController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//khách hàng
Route::post('/khach-hang/dang-ky', [KhachHangController::class, 'create']);
Route::post('/khach-hang/dang-nhap', [KhachHangController::class, 'dangNhap']);
Route::post('/khach-hang/dang-xuat', [KhachHangController::class, 'dangXuat'])->middleware('auth:sanctum');
Route::post('/khach-hang/quen-mat-khau', [KhachHangController::class, 'quenMatKhau'])->middleware('throttle:quen-mat-khau'); //limit call api (1 lần gọi sau 60 phút)



//Nhà cung cấp
Route::post('/nha-cung-cap/dang-ky', [NhaCungCapController::class, 'create']);
Route::post('/nha-cung-cap/dang-nhap', [NhaCungCapController::class, 'dangNhap']);
Route::post('/nha-cung-cap/dang-xuat', [NhaCungCapController::class, 'dangXuat'])->middleware('auth:sanctum');
Route::post('/nha-cung-cap/quen-mat-khau', [NhaCungCapController::class, 'quenMatKhau'])->middleware('throttle:quen-mat-khau'); //limit call api (1 lần gọi sau 60 phút)

Route::post('/tim-kiem-dich-vu/{keyword}', [DichVuController::class, 'timKiemDichVu']);

//mail kích hoạt
Route::get('/nha-cung-cap/kich-hoat-tai-khoan/{hash_active}', [NhaCungCapController::class, 'kichHoat']);//nhà cung cấp
Route::get('/khach-hang/kich-hoat-tai-khoan/{hash_active}', [KhachHangController::class, 'kichHoat']);//khách hàng
