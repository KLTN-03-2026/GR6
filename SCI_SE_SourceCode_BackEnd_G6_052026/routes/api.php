<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DanhMucDichVuController;
use App\Http\Controllers\DichVuController;
use App\Http\Controllers\HinhAnhDichVuController;
use App\Http\Controllers\KhachHangController;
use App\Http\Controllers\NhaCungCapController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//khách hàng
Route::post('/khach-hang/check-login', [KhachHangController::class, 'checkLogin']); // gửi bearer +token
Route::post('/khach-hang/dang-ky', [KhachHangController::class, 'create']);
Route::post('/khach-hang/dang-nhap', [KhachHangController::class, 'dangNhap']);
Route::post('/khach-hang/dang-xuat', [KhachHangController::class, 'dangXuat'])->middleware('auth:sanctum');
Route::post('/khach-hang/quen-mat-khau', [KhachHangController::class, 'quenMatKhau'])->middleware('throttle:quen-mat-khau'); //limit call api (1 lần gọi sau 60 phút)
Route::get('/khach-hang/thong-tin-ca-nhan', [KhachHangController::class, 'thongTinCaNhan'])->middleware('auth:sanctum'); //lấy thông tin khách hàng đang đăng nhập
Route::post('/khach-hang/update', [KhachHangController::class, 'upDate'])->middleware('auth:sanctum'); //lấy thông tin khách hàng đang đăng nhập



// quên mật khẩu
Route::post('/quen-mat-khau', [NhaCungCapController::class, 'quenMatKhau'])->middleware('throttle:quen-mat-khau'); //limit call api (1 lần gọi sau 60 phút)




//Nhà cung cấp
Route::post('/nha-cung-cap/dang-ky', [NhaCungCapController::class, 'create']);
Route::post('/nha-cung-cap/dang-nhap', [NhaCungCapController::class, 'dangNhap']);
Route::post('/nha-cung-cap/dang-xuat', [NhaCungCapController::class, 'dangXuat'])->middleware('auth:sanctum');
Route::get('/nha-cung-cap/thong-tin-ca-nhan', [NhaCungCapController::class, 'thongTinCaNhan'])->middleware('auth:sanctum'); //lấy thông tin nhà cung cấp đang đăng nhập
Route::post('/nha-cung-cap/check-login', [NhaCungCapController::class, 'checkLogin']); // gửi bearer +token
Route::post('/nha-cung-cap/update', [NhaCungCapController::class, 'upDate'])->middleware('auth:sanctum'); //lấy thông tin nhà cung cấp đang đăng nhập


//dịch vụ
Route::post('/tim-kiem-dich-vu/{keyword}', [DichVuController::class, 'timKiemDichVu']);
Route::get('/dich-vu/chi-tiet-dich-vu/{id}', [DichVuController::class, 'chiTietDichVu']);  //xem chi tiết khi nhấn vào dịch vụ
Route::get('/dich-vu/get-data', [DichVuController::class, 'getDichVu']); //lấy dữ liệu danh mục dịch vụ để hiển thị lên giao diện

//hình ảnh dịch vụ
Route::get('/hinh-anh-dich-vu/get-data-hinh-anh', [HinhAnhDichVuController::class, 'getDichVuHinhAnh']); //lấy toàn bộ hình ảnh và id dịch vụ của hình ảnh đó
Route::get('/hinh-anh-dich-vu/get-data-hinh-anh-by-dich-vu/{id}', [HinhAnhDichVuController::class, 'getDichVuHinhAnhById']); //lấy toàn bộ hình ảnh theo id dịch vụ
Route::post('/hinh-anh-dich-vu/create', [HinhAnhDichVuController::class, 'create']);


//mail kích hoạt
Route::get('/nha-cung-cap/kich-hoat-tai-khoan/{hash_active}', [NhaCungCapController::class, 'kichHoat']); //nhà cung cấp
Route::get('/khach-hang/kich-hoat-tai-khoan/{hash_active}', [KhachHangController::class, 'kichHoat']); //khách hàng



//Admin
Route::post('/admin/dang-nhap', [AdminController::class, 'dangNhap']);
Route::post('/admin/dang-xuat', [AdminController::class, 'dangXuat'])->middleware('auth:sanctum');
Route::post('/admin/check-login', [AdminController::class, 'checkLogin'])->middleware('auth:sanctum');

Route::get('/admin/customers', [AdminController::class, 'getAllCustomers'])->middleware('auth:sanctum'); //lấy toàn bộ khách hàng
Route::get('/admin/customers/block/{id}', [AdminController::class, 'blockCustomer'])->middleware('auth:sanctum'); //block/unblock khách hàng


Route::get('/admin/providers', [AdminController::class, 'getAllProviders'])->middleware('auth:sanctum'); //lấy toàn bộ nhà cung cấp
Route::get('/admin/providers/block/{id}', [AdminController::class, 'blockProvider'])->middleware('auth:sanctum'); //block/unblock nhà cung cấp


Route::get('/admin/search/{keyword}', [AdminController::class, 'search'])->middleware('auth:sanctum'); //tìm kiếm khách hàng và nhà cung cấp theo tên hoặc email


// danh mục dịch vụ
Route::get('/danh-muc/get-data', [DanhMucDichVuController::class, 'getDanhMuc']);
Route::post('/danh-muc/create', [DanhMucDichVuController::class, 'createDanhMuc']);
Route::post('/danh-muc/update', [DanhMucDichVuController::class, 'updateDanhMuc']);
Route::delete('/danh-muc/destroy/{id}', [DanhMucDichVuController::class, 'destroyDanhMuc']);

 



