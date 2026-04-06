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
        Schema::create('sesiones_de_estudios', function (Blueprint $table) {
            $table->id();
            $table->string('a_nombre');
            $table->bigInteger('a_tiempo_invertido');
            $table->boolean('a_finalizada')->default(false);
            $table->date('a_fecha');
            $table->unsignedBigInteger('a_user_id');
            $table->timestamps();

            $table->foreign('a_user_id')->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sesiones_de_estudios');
    }
};
