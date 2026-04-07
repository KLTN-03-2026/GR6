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
            $table->integer('id_nhan_vien');
            $table->string('dia_chi_thuc_hien');
            $table->dateTime('gio_bat_dau');
            $table->dateTime('gio_ket_thuc');
            $table->integer('so_luong');
            $table->decimal('don_gia');
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
