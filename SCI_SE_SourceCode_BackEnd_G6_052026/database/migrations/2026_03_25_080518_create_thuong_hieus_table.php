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
        Schema::create('thuong_hieus', function (Blueprint $table) {
            $table->id();
            $table->integer('id_nha_cung_cap');
            $table->integer('id_danh_muc_dich_vu');
            $table->string('ten_thuong_hieu');
            $table->string('dia_chi');
            $table->string('so_dien_thoai');
            $table->text('logo')->nullable();
            $table->text('anh_bia')->nullable();
            $table->string('mo_ta')->nullable();
            $table->string('ma_so_thue');
            $table->string('ma_bin_ngan_hang');
            $table->string('tai_khoan_ngan_hang');
            $table->double('diem_hai_long', 10, 2)->default(0);
            $table->integer('is_active')->default(1); // 0: chưa kích hoạt, 1: đã kích hoạt
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thuong_hieus');
    }
};
