<?php

namespace App\Http\Controllers;

use App\Models\SesionesDeEstudio;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GruposDeTareas;
use App\Models\Tareas;
use App\Models\TareasSesiones;

use function Termwind\render;

class SesionesDeEstudioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sesiones = SesionesDeEstudio::where('a_user_id', auth()->id())->latest()->get();
        // dd($sesiones);
        return Inertia::render('Usuario/VerSesionesDeEstudio', [
            'sesiones' => $sesiones,
            'currentRoute' => request()->route()->getName(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tareas = Tareas::with('user:id,name')->where('a_user_id', auth()->id())->latest()->get();
        $grupos = GruposDeTareas::where('a_user_id', auth()->id())->get();
        return Inertia::render('Usuario/CrearSesionesDeEstudio', [
            'tareas' => $tareas,
            'grupos' => $grupos,
            'currentRoute' => request()->route()->getName(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'a_nombre' => 'required|string|max:100',
            'a_tiempo_invertido' => 'required|integer',
            'a_fecha' => 'required|date',
            'a_tareas_ids' => 'required|array',
            'a_tareas_ids.*' => 'exists:tareas,id'
        ]);

        // Al usar la relación sesiones(), Laravel inyecta a_user_id automáticamente
        $sesion = auth()->user()->sesiones()->create($validated);

        $sesion->tareas()->attach($validated['a_tareas_ids']);

        return redirect(route('dashboard'));
    }


    /**
     * Display the specified resource.
     */
    public function show(SesionesDeEstudio $sesionesDeEstudio)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SesionesDeEstudio $sesionesDeEstudio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SesionesDeEstudio $sesionesDeEstudio)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SesionesDeEstudio $sesionesDeEstudio)
    {
        dd([
            'ID_Usuario_Autenticado' => auth()->id(),
            'ID_Dueño_de_la_Sesion'  => $sesionesDeEstudio->a_user_id,
            'Son_Iguales'            => auth()->id() == $sesionesDeEstudio->a_user_id
        ]);
        if ($sesionesDeEstudio->a_user_id !== auth()->id()) {
            abort(403, 'No autorizado para eliminar esta sesión de estudio.');
        }
        $sesionesDeEstudio->delete();
        return redirect(route('dashboard'));
    }
}
