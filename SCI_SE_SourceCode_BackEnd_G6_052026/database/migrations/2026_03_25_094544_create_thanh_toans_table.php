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
            $table->decimal('tong_tien_thanh_toan', 15, 2);
            $table->decimal('tong_tien_da_nhan', 15, 2);
            $table->integer('trang_thai'); // 0: chưa thanh toán, 1: đã thanh toán, 2: thanh toán một phần
            $table->integer('is_failed')->default(0); // 0: không thất bại, 1: thất bại
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
