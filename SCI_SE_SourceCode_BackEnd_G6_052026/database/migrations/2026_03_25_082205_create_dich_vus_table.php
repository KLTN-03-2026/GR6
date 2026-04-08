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
        Schema::create('dich_vus', function (Blueprint $table) {
            $table->id();
            $table->integer('id_thuong_hieu');
            $table->integer('id_danh_muc_dich_vu');
            $table->string('ten_dich_vu');
            $table->decimal('don_gia');
            $table->integer('thoi_gian_du_kien');
            $table->integer('thoi_gian_dem');
            $table->string('mo_ta_ngan');
            $table->string('mo_ta_dai');
            $table->integer('so_luong_lich_toi_da');
            $table->integer('trang_thai');
            $table->integer('kieu_phuc_vu'); // 1: tại cửa hàng, 2: tại nhà khách hàng, 3: cả hai
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dich_vus');
    }
};
