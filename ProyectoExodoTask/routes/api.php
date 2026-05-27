<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', function () {
        return \App\Models\User::where('id', auth()->id())->get();
    });

    Route::get('/tareas', function () {
        return \App\Models\Tareas::where('a_user_id', auth()->id())->get();
    });
});
