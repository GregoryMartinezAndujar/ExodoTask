<?php

use App\Http\Controllers\GrupoDeTareas;
use App\Http\Controllers\GrupoDeTareasController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TareasController;
use App\Models\Tareas;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware('guest');

Route::get('/dashboard', [TareasController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/editar-tarea/{id}', [TareasController::class, 'edit'])->middleware(['auth', 'verified'])->name('EditarTareas');
Route::get('/editar-grupo/{id}', [GrupoDeTareasController::class, 'edit'])->middleware(['auth', 'verified'])->name('editar.grupo');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::resource('tareas', TareasController::class)->only(['index', 'update', 'destroy', 'store', 'create', 'edit'])
    ->middleware(['auth', 'verified'])
;
Route::resource('gruposdetareas', GrupoDeTareasController::class,)->only(['index', 'update', 'destroy', 'store', 'create', 'edit'])
    ->middleware(['auth', 'verified'])
;


Route::get('/tareas-por-grupo/{grupo}', [TareasController::class, 'tareasPorGrupo'])->middleware(['auth', 'verified'])->name('grupos.tareas');
require __DIR__ . '/auth.php';
