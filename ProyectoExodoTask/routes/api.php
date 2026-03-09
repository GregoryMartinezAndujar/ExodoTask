<?php

use App\Models\Tareas;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/users', function () {
    return User::all();
});


Route::get('/tareas', function () {
    return Tareas::all();
});
