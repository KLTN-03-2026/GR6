<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dat_lichs', function (Blueprint $table) {
            $table->id();
            $table->integer('id_thuong_hieu');
            $table->integer('id_khach_hang');
            $table->string('ten_nguoi_dat');
            $table->string('so_dien_thoai_nguoi_dat');
            $table->string('ghi_chu');
            $table->integer('trang_thai_dat_lich')->default(0); // 0: chưa xác nhận, 1: đã xác nhận, 2: đã hoàn thành, 3: đã hủy
                                                                // Trạng thái đặt lịch được cập nhật chính bởi nhà cung cấp khi xác nhận lịch đặt của khách hàng
                                                                // Khách hàng chỉ có thể chuyển trạng thái sang hủy bất cứ khi nào
                                                                // Nhà cung cấp chỉ có nhận hoặc không nhận, nếu sau 60 phút không xác nhận thì hệ thống sẽ tự động hủy lịch đặt của khách hàng
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dat_lichs');
    }
};
