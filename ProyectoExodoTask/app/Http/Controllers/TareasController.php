<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GruposDeTareas;
use App\Models\Tareas;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Psy\Util\Str;

class TareasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('Dashboard', [
            'tareas' => Tareas::with('user:id,name')->where('a_user_id', auth()->id())->latest()->get(),
            'currentRoute' => request()->route()->getName(),
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Validar datos
        $validated = $request->validate([
            'a_nombre' => 'required|string|max:100',
            'a_descripcion' => 'required|string|max:200',
            'a_horas' => 'required|integer',
        ]);

        $request->user()->tareas()->create($validated);
        
        return redirect(route('dashboard'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tarea =  Tareas::where('id', $id)
             ->where('a_user_id', auth()->id())
             ->firstOrFail();

        $tarea->update($request->only([
            'a_nombre',
            'a_descripcion',
            'a_horas',
            'a_completada'
        ]));

        return redirect()->route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tarea =  Tareas::where('id', $id)
             ->where('a_user_id', auth()->id())
             ->firstOrFail();
        $tarea->delete();
        return redirect(route('dashboard'));
    }

    public function create()
    {
        return Inertia::render('Usuario/Index', []);
    }



    public function edit(string $id)
    {
        $tarea = Tareas::where('id', $id)
             ->where('a_user_id', auth()->id())
             ->firstOrFail();

        return Inertia::render('Usuario/EditarTareas', [
            'tarea' => $tarea,
            'currentRoute' => request()->route()->getName(),
        ]);

    }

    public function tareasPorGrupo(String $grupo)
    {
        $grupo = GruposDeTareas::where('id', $grupo)
             ->where('a_user_id', auth()->id())
             ->firstOrFail();
        $tareas = Tareas::where('a_grupo_id', $grupo->id)
             ->where('a_user_id', auth()->id())
             ->get();
             
        return Inertia::render('Usuario/VerTaraesGrupo', [
            'grupo' => $grupo,
            'tareas' => $tareas,
            'currentRoute' => request()->route()->getName(),
        ]);
    }
}
