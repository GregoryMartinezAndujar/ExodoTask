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
        Schema::table('tareas', function (Blueprint $table) {
            $table->unsignedBigInteger('a_prioridad_id')->nullable()->after('id');
            $table->foreign('a_prioridad_id')->references('id')->on('prioridades')->onDelete('set null');
        });
    }
};
