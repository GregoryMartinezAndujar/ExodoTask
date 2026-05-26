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
        Schema::table('sesiones_de_estudios', function (Blueprint $table) {
            $table->integer('a_tiempo_restante')->default(0)->after('a_tiempo_invertido');
            $table->timestamp('a_inicio_actual_at')->nullable()->after('a_tiempo_restante');
            $table->string('a_estado', 20)->default('pendiente')->after('a_inicio_actual_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sesiones_de_estudios', function (Blueprint $table) {
            $table->dropColumn(['a_tiempo_restante', 'a_inicio_actual_at', 'a_estado']);
        });
    }
};