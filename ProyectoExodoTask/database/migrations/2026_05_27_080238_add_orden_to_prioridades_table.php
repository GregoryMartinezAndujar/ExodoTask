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
        Schema::table('prioridades', function (Blueprint $table) {
            $table->integer('a_orden')->default(0)->after('a_nombre');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prioridades', function (Blueprint $table) {
            $table->dropColumn('a_orden');
        });
    }
};
