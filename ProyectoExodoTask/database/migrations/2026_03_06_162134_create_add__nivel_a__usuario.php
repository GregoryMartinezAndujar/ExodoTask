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
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('a_niveles_id')->nullable();

            $table->foreign('a_niveles_id')->references('id')->on('niveles')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }


    public function down(): void {}
};
