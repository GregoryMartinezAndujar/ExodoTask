<?php

use App\Http\Controllers\GrupoDeTareas;
use App\Http\Controllers\GrupoDeTareasController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TareasController;
use App\Http\Controllers\SesionesDeEstudioController;
use App\Http\Controllers\TareasSesionesController;
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

// Rutas para tareas 
Route::get('/dashboard', [TareasController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/editar-tarea/{id}', [TareasController::class, 'edit'])->middleware(['auth', 'verified'])->name('EditarTareas');
Route::get('/ver-tarea/{id}', [TareasController::class, 'verTarea'])->middleware(['auth', 'verified'])->name('tareas.verTarea');

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

// Rutas adicionales para tareas por grupo y eliminación de tarea del grupo
Route::get('/tareas-por-grupo/{grupo}', [TareasController::class, 'tareasPorGrupo'])->middleware(['auth', 'verified'])->name('grupos.tareas');
Route::get('/eliminar-tarea-del-grupo/{tarea}', [TareasController::class, 'eliminarTareaDelGrupo'])->middleware(['auth', 'verified'])->name('tareas.eliminarDelGrupo');
Route::get('/cronometro/{tarea}', [TareasController::class, "tareasComenzar"])->middleware(['auth', 'verified'])->name('tareas.cronometro');
Route::get('/editar-grupo/{id}', [GrupoDeTareasController::class, 'edit'])->middleware(['auth', 'verified'])->name('editar.grupo');

//Rutas de sesiones 

Route::resource('sesionesdetareas', SesionesDeEstudioController::class)->only(['index', 'update', 'destroy', 'store', 'create', 'edit'])->middleware(['auth', 'verified']);
Route::resource('tareas-sesiones', TareasSesionesController::class)->only(['index', 'update', 'destroy', 'store', 'create', 'edit'])->middleware(['auth', 'verified']);
require __DIR__ . '/auth.php';
