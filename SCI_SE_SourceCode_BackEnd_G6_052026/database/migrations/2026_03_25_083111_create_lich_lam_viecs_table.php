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
        Schema::create('lich_lam_viecs', function (Blueprint $table) {
            $table->id();
            $table->integer('id_thuong_hieu');
            $table->integer('thu_trong_tuan');
            $table->dateTime('gio_mo_cua');
            $table->dateTime('gio_dong_cua');
            $table->integer('trang_thai');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lich_lam_viecs');
    }
};
