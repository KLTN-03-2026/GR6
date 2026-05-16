<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AiAssistantController;
use App\Http\Controllers\AiChatbotController;
use App\Http\Controllers\ChiTietDatLichController;
use App\Http\Controllers\DanhGiaController;
use App\Http\Controllers\DanhMucDichVuController;
use App\Http\Controllers\DatLichController;
use App\Http\Controllers\DichVuController;
use App\Http\Controllers\HinhAnhDichVuController;
use App\Http\Controllers\HoiThoaiController;
use App\Http\Controllers\KhachHangController;
use App\Http\Controllers\LichLamViecController;
use App\Http\Controllers\NhaCungCapController;
use App\Http\Controllers\NhanVienController;
use App\Http\Controllers\ThanhToanController;
use App\Http\Controllers\ThuongHieuController;
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

//khách hàng đặt lịch
Route::get('/khach-hang/dat-lich/get-data', [DatLichController::class, 'getDataDatLich'])->middleware('auth:sanctum'); //đặt lịch dịch vụ
Route::get('/khach-hang/chi-tiet-dat-lich/{id_chi_tiet_dat_lich}', [DatLichController::class, 'getDataChiTietDatLich'])->middleware('auth:sanctum'); //đặt lịch dịch vụ
Route::post('/khach-hang/dat-lich/create', [DatLichController::class, 'createDatLich'])->middleware('auth:sanctum'); //đặt lịch dịch vụ
Route::get('/khach-hang/nhan-vien/get-data/{id}', [KhachHangController::class, 'getNhanVienData']);

//khách hàng xem hồ sơ thương hiệu
Route::get('/khach-hang/thuong-hieu/get-data/{id_thuong_hieu}', [KhachHangController::class, 'getThuongHieuData']);

//crud thương hiệu của nhà cung cấp
Route::get('nha-cung-cap/thuong-hieu/get-data',[NhaCungCapController::class,'getDataThuongHieu']);
Route::post('nha-cung-cap/thuong-hieu/update',[NhaCungCapController::class,'updateThuongHieu']);

//crud nhân viên của dịch vụ
Route::get('thuong-hieu/nhan-vien/get-data',[ThuongHieuController::class,'getDataNhanVien']);
Route::post('thuong-hieu/nhan-vien/them-moi',[ThuongHieuController::class,'createNhanVien']);
Route::post('thuong-hieu/nhan-vien/update',[ThuongHieuController::class,'updateNhanVien']);
Route::post('thuong-hieu/nhan-vien/delete/{id}',[ThuongHieuController::class,'destroyNhanVien']);
Route::post('thuong-hieu/nhan-vien/update-status/{id}',[ThuongHieuController::class,'changeStauts']);

//Quản lý lịch đặt của thương hiệu
Route::get('thuong-hieu/dat-lich/get-data/{id_thuong_hieu}',[ThuongHieuController::class,'getDataDatLich']);
Route::get('thuong-hieu/dat-lich/hoan-thanh/{id_dat_lich}',[ThuongHieuController::class,'doneDatLich']);
Route::get('dat-lich/huy/{id_dat_lich}',[ThuongHieuController::class,'cancelDatLich']);



// quên mật khẩu
Route::post('/quen-mat-khau', [NhaCungCapController::class, 'quenMatKhau'])->middleware('throttle:quen-mat-khau'); //limit call api (1 lần gọi sau 60 phút)




//Nhà cung cấp
Route::post('/nha-cung-cap/dang-ky', [NhaCungCapController::class, 'createNCC']);
Route::post('/nha-cung-cap/dang-nhap', [NhaCungCapController::class, 'dangNhap']);
Route::post('/nha-cung-cap/dang-xuat', [NhaCungCapController::class, 'dangXuat'])->middleware('auth:sanctum');
Route::get('/nha-cung-cap/thong-tin-ca-nhan', [NhaCungCapController::class, 'thongTinCaNhan'])->middleware('auth:sanctum'); //lấy thông tin nhà cung cấp đang đăng nhập
Route::post('/nha-cung-cap/check-login', [NhaCungCapController::class, 'checkLogin']); // gửi bearer +token
Route::post('/nha-cung-cap/update', [NhaCungCapController::class, 'upDate'])->middleware('auth:sanctum'); //lấy thông tin nhà cung cấp đang đăng nhập
Route::get('/nha-cung-cap/bang-dieu-khien', [NhaCungCapController::class, 'getDataBangDieuKhien']); //lấy dữ liệu hiển thị lên bảng điều khiển của nhà cung cấp
Route::get('/nha-cung-cap/lich-hen/get-data', [NhaCungCapController::class, 'getDataLichHen']); //lấy dữ liệu hiển thị lên bảng điều khiển của nhà cung cấp
Route::post('/nha-cung-cap/thoi-gian-lam-viec/update', [NhaCungCapController::class, 'updateThoiGianLamViec']); //cập nhật thời gian làm việc của nhà cung cấp
Route::get('/nha-cung-cap/thoi-gian-lam-viec/get-data', [NhaCungCapController::class, 'getThoiGianLamViec']); //lấy dữ liệu thời gian làm việc của nhà cung cấp


//dịch vụ
Route::post('/tim-kiem-dich-vu/{keyword}', [DichVuController::class, 'timKiemDichVu']);
Route::get('/dich-vu/chi-tiet-dich-vu/{id}', [DichVuController::class, 'chiTietDichVu']);  //xem chi tiết khi nhấn vào dịch vụ
Route::get('/dich-vu/get-data', [DichVuController::class, 'getDichVu']); //lấy dữ liệu danh mục dịch vụ để hiển thị lên giao diện
Route::get('/dich-vu/get-data-by-ncc/{id}', [DichVuController::class, 'getDichVubyID']); //lấy dữ liệu danh mục dịch vụ để hiển thị lên giao diện
Route::get('/dich-vu/get-data-by-ncc', [DichVuController::class, 'getDichVuByNCC']); //lấy dữ liệu danh mục dịch vụ để hiển thị lên giao diện
Route::get('/dich-vu/get-thuong-hieu/{id}', [DichVuController::class, 'getThuongHieu']);
Route::post('/dich-vu/create', [DichVuController::class, 'createDichVu']);
Route::post('/dich-vu/update', [DichVuController::class, 'updateDichVu']);
Route::post('/dich-vu/delete/{id}', [DichVuController::class, 'destroyDichVu']);
Route::post('/dich-vu/change-status/{id}', [DichVuController::class, 'changeStatusDichVu']);


//hình ảnh dịch vụ
Route::get('/hinh-anh-dich-vu/get-data-hinh-anh', [HinhAnhDichVuController::class, 'getDichVuHinhAnh']); //lấy toàn bộ hình ảnh và id dịch vụ của hình ảnh đó
Route::get('/hinh-anh-dich-vu/get-data-hinh-anh-by-dich-vu/{id}', [HinhAnhDichVuController::class, 'getDichVuHinhAnhById']); //lấy toàn bộ hình ảnh theo id dịch vụ


//mail kích hoạt
Route::get('/nha-cung-cap/kich-hoat-tai-khoan/{hash_active}', [NhaCungCapController::class, 'kichHoat']); //nhà cung cấp
Route::get('/khach-hang/kich-hoat-tai-khoan/{hash_active}', [KhachHangController::class, 'kichHoat']); //khách hàng



//Admin
Route::post('/admin/dang-nhap', [AdminController::class, 'dangNhap']);
Route::post('/admin/dang-xuat', [AdminController::class, 'dangXuat'])->middleware('auth:sanctum');
Route::post('/admin/check-login', [AdminController::class, 'checkLogin'])->middleware('auth:sanctum');


//admin quản lý khách hàng
Route::get('/admin/customers', [AdminController::class, 'getAllCustomers'])->middleware('auth:sanctum'); //lấy toàn bộ khách hàng
Route::get('/admin/customers-count', [AdminController::class, 'getCountCustomers'])->middleware('auth:sanctum'); //lấy toàn bộ khách hàng
Route::get('/admin/customers/block/{id}', [AdminController::class, 'blockCustomer'])->middleware('auth:sanctum'); //block/unblock khách hàng



//admin quản lý nhà cung cấp
Route::get('/admin/providers', [AdminController::class, 'getAllProviders'])->middleware('auth:sanctum'); //lấy toàn bộ nhà cung cấp
Route::get('/admin/providers/block/{id}', [AdminController::class, 'blockProvider'])->middleware('auth:sanctum'); //block/unblock nhà cung cấp
Route::get('/admin/providers-count', [AdminController::class, 'getCountProviders'])->middleware('auth:sanctum'); 

Route::get('/admin/search/{keyword}', [AdminController::class, 'search'])->middleware('auth:sanctum'); //tìm kiếm khách hàng và nhà cung cấp theo tên hoặc email


//admin quản lý danh mục dịch vụ
Route::get('/danh-muc/get-data', [DanhMucDichVuController::class, 'getDanhMuc']);
Route::get('/danh-muc/get-count-data', [DanhMucDichVuController::class, 'getCountDanhMuc']);
Route::post('/danh-muc/create', [DanhMucDichVuController::class, 'createDanhMuc']);
Route::post('/danh-muc/update', [DanhMucDichVuController::class, 'updateDanhMuc'])->middleware('auth:sanctum');
Route::delete('/danh-muc/destroy/{id}', [DanhMucDichVuController::class, 'destroyDanhMuc'])->middleware('auth:sanctum');


//VNPAY payment
Route::post('/vnpay-payment', [ThanhToanController::class, 'createPayment']);
Route::get('/vnpay-payment/return', [ThanhToanController::class, 'handleVnpayReturn']);


//đánh giá
Route::post('/danh-gia/create', [DanhGiaController::class, 'createDanhGia']);
Route::get('/danh-gia/tinh-diem-danh-gia', [DanhGiaController::class, 'tinhDiemDanhGia']);
Route::get('/danh-gia/dich-vu/get-data/{id}', [DanhGiaController::class, 'getDanhGiaByDichVu']); //lấy đánh giá theo id dịch vụ
Route::get('/danh-gia/thuong-hieu/get-data/{id}', [DanhGiaController::class, 'getDanhGiaByThuongHieu']); //lấy đánh giá cho thương hiệu


// AI (Gemini)
Route::post('/ai/assistant', [AiAssistantController::class, 'generate']);
Route::post('/ai/chat', [AiChatbotController::class, 'chat']);

//gửi tin nhắn realtime
// Route::post('/send-message', [HoiThoaiController::class, 'sendMessage']);
// Route::post('/get-or-create', [HoiThoaiController::class, 'getOrCreate']);
// Route::get('/get-all-messages/{id}', [HoiThoaiController::class, 'getAllMessages']);
// Route::get('khach-hang/get-all-conversations', [HoiThoaiController::class, 'khachHangGetAllConversations']);
// Route::get('thuong-hieu/get-all-conversations', [HoiThoaiController::class, 'thuongHieuGetAllConversations']);

//thoi gian làm việc của nhân viên
Route::get('/nhan-vien/thoi-gian-lam-viec/{id}', [NhanVienController::class, 'WorkingHours']);

//lịch làm việc thương hiệu
Route::get('/thuong-hieu/lich-lam-viec/{id_thuong_hieu}', [LichLamViecController::class, 'getWorkingHours']);

//admin thống kê doanh thu
Route::get('/admin/thong-ke-doanh-thu', [AdminController::class, 'thongKeDoanhThu']);

Route::get('/chi-tiet-lich-hen/{id_chi_tiet_dat_lich}', [ChiTietDatLichController::class, 'getChiTietLichHen']);