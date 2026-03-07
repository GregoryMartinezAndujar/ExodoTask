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
        Schema::create('tareas_sesiones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('a_tarea_id');
            $table->unsignedBigInteger('a_sesion_estudio_id');
            $table->timestamps();


            $table->foreign('a_tarea_id')->references('id')->on('tareas');
            $table->foreign('a_sesion_estudio_id')->references('id')->on('sesiones_de_estudios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tareas_sesiones');
    }
};
