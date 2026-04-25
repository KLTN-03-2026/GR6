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
        Schema::create('chi_tiet_dat_lichs', function (Blueprint $table) {
            $table->id();
            $table->integer('id_dat_lich');
            $table->integer('id_dich_vu');
            $table->integer('id_nhan_vien')->nullable();
            $table->string('dia_chi_thuc_hien');
            $table->time('gio_bat_dau');
            $table->date('ngay_dat_lich');
            $table->integer('so_luong');
            $table->decimal('don_gia', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chi_tiet_dat_lichs');
    }
};
