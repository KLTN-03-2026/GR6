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
        Schema::create('thanh_toans', function (Blueprint $table) {
            $table->id();
            $table->integer('id_chi_tiet_dat_lich');
            $table->string('ma_hoa_don');
            $table->decimal('tong_tien_thanh_toan');
            $table->decimal('tong_tien_da_nhan');
            $table->integer('trang_thai');
            $table->integer('is_falied');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thanh_toans');
    }
};
