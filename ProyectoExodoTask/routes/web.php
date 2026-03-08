<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/welcome/{id}', function ($id) {
    $user = User::find($id);
    return view('welcome', [
        'user' => $user
    ]);
})->name('welcome');
