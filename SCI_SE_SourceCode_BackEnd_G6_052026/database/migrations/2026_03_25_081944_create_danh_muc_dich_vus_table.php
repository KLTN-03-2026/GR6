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
        Schema::create('danh_muc_dich_vus', function (Blueprint $table) {
            $table->id();
            $table->string('ten_dich_vu');
            $table->integer('id_father');
            $table->string('hinh_anh'); 
            $table->integer('trang_thai'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('danh_muc_dich_vus');
    }
};
