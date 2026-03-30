<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GruposDeTareas;
use App\Models\Prioridad;
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
        $tareas = Tareas::with('user:id,name')->where('a_user_id', auth()->id())->latest()->get();
        $tareas->each(function ($tarea) {
            $tarea->a_horas = $tarea->a_horas / 60 / 60;
        });
        $prioridades = Prioridad::all();
        $grupos = GruposDeTareas::where('a_user_id', auth()->id())->get();
        return Inertia::render('Dashboard', [
            'tareas' => $tareas,
            'prioridades' => $prioridades,
            'grupos' => $grupos,
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
            'a_fecha_limite' => 'required|date',
        ]);
        $validated['a_horas'] = $validated['a_horas'] * 60 * 60;

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
        // para que no rompa la hora al terminar el cronometro
        if (isset($request['a_horas'])) {
            $request['a_horas'] = $request['a_horas'] * 60 * 60;
        }
        $tarea->update($request->only([
            'a_nombre',
            'a_descripcion',
            'a_horas',
            'a_completada',
            'a_fecha_limite',
            'a_horas_realizadas',
            'a_prioridad_id'
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
        $tarea->a_horas = $tarea->a_horas / 60 / 60;
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
        foreach ($tareas as $tarea) {
            $tarea->a_horas = $tarea->a_horas / 60 / 60;
        }
        $prioridades = Prioridad::all();
        return Inertia::render('Usuario/VerTaraesGrupo', [
            'grupo' => $grupo,
            'tareas' => $tareas,
            'prioridades' => $prioridades,
            'currentRoute' => request()->route()->getName(),
        ]);
    }

    public function eliminarTareaDelGrupo(String $tareaId)
    {
        $tarea = Tareas::where('id', $tareaId)
            ->where('a_user_id', auth()->id())
            ->firstOrFail();

        $tarea->update(['a_grupo_id' => null]);

        return redirect()->back()->with('success', 'Tarea eliminada del grupo exitosamente.');
    }

    public function tareasComenzar(String $tareaId)
    {
        $tarea = Tareas::where('id', $tareaId)
            ->where('a_user_id', auth()->id())
            ->firstOrFail();
        $tarea->a_horas = $tarea->a_horas;
        return Inertia::render('Cronometro', [
            'tarea' => $tarea,
        ]);
    }

    public function verTarea(String $tareaId)
    {
        $tarea = Tareas::where('id', $tareaId)
            ->where('a_user_id', auth()->id())
            ->firstOrFail();
        $tarea->a_horas = $tarea->a_horas / 60  / 60;
        $grupo = GruposDeTareas::where('id', $tarea->a_grupo_id)->first();
        return Inertia::render('Usuario/VerTarea', [
            'tarea' => $tarea,
            'grupo' => $grupo
        ]);
    }
}
