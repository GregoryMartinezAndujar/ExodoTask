<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TareasController;
use App\Models\Tareas;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('login', [
        // 'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'tareas' => Tareas::with('user:id,name')->where('a_user_id', auth()->id())->latest()->get()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::resource('tareas', TareasController::class)->only(['index', 'update', 'destroy', 'store'])
    ->middleware(['auth'])
;
Route::resource('gruposdetareas', TareasController::class)->only(['index', 'update', 'destroy', 'store'])
    ->middleware(['auth'])
;

require __DIR__ . '/auth.php';
