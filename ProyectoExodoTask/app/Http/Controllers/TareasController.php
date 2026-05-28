<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GruposDeTareas;
use App\Models\Prioridad;
use App\Models\Tareas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TareasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tareas = Tareas::with('user:id,name')
            ->where('a_user_id', auth()->id())
            ->select('tareas.*')
            ->selectRaw('COALESCE((SELECT a_orden FROM prioridades WHERE prioridades.id = tareas.a_prioridad_id), 999) as prioridad_orden')
            ->orderBy('prioridad_orden')
            ->latest('tareas.created_at')
            ->get();
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
            'a_horas' => 'required|numeric',
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

        if ($request->has('a_prioridad_id') && $request->a_prioridad_id === '') {
            $request->merge(['a_prioridad_id' => null]);
        }

        $validated = $request->validate([
            'a_nombre' => 'sometimes|string|max:100',
            'a_descripcion' => 'sometimes|string|max:200',
            'a_horas' => 'sometimes|numeric|min:0',
            'a_completada' => 'sometimes|boolean',
            'a_fecha_limite' => 'sometimes|date',
            'a_horas_realizadas' => 'sometimes|numeric|min:0',
            'a_prioridad_id' => 'sometimes|integer|nullable|exists:prioridades,id',
        ]);

        if (isset($validated['a_horas'])) {
            $validated['a_horas'] = $validated['a_horas'] * 60 * 60;
        }
        $tarea->update($validated);

        // Devuelve JSON cuando la petición es AJAX para que el frontend pueda manejar la respuesta
        $tarea->refresh();
        if (($request->ajax() || $request->wantsJson()) && !$request->header('X-Inertia')) {
            return response()->json(['tarea' => $tarea]);
        }

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
        $prioridades = Prioridad::all();
        return Inertia::render('Usuario/EditarTareas', [
            'tarea' => $tarea,
            'prioridades' => $prioridades,
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
            ->select('tareas.*')
            ->selectRaw('COALESCE((SELECT a_orden FROM prioridades WHERE prioridades.id = tareas.a_prioridad_id), 999) as prioridad_orden')
            ->orderBy('prioridad_orden')
            ->latest('tareas.created_at')
            ->get();
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
        $tarea = Tareas::with('notas')->where('id', $tareaId)
            ->where('a_user_id', auth()->id())
            ->firstOrFail();
        $grupo = GruposDeTareas::where('id', $tarea->a_grupo_id)->first();
        return Inertia::render('Usuario/VerTarea', [
            'tarea' => $tarea,
            'grupo' => $grupo
        ]);
    }
}
