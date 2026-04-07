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
            $table->integer('trang_thai_dat_lich');
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
