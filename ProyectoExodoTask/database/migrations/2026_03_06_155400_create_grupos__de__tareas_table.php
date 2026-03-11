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
        Schema::create('grupos_de_tareas', function (Blueprint $table) {
            $table->id();

            $table->string('a_nombre');
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
        Schema::dropIfExists('grupos_de_tareas');
    }
};
