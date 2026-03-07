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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('a_name');
            $table->string('a_email')->unique();
            $table->timestamp('a_email_verified_at')->nullable();
            $table->string('a_password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('a_email')->primary();
            $table->string('a_token');
            $table->timestamp('a_created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('a_id')->primary();
            $table->foreignId('a_user_id')->nullable()->index();
            $table->string('a_ip_address', 45)->nullable();
            $table->text('a_user_agent')->nullable();
            $table->longText('a_payload');
            $table->integer('a_last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
