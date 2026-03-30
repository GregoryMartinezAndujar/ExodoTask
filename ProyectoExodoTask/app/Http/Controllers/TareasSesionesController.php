<?php

namespace App\Http\Controllers;

use App\Models\TareasSesiones;
use App\Models\SesionesDeEstudio;
use App\Models\Tareas;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TareasSesionesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'grupo_id' => 'nullable|exists:grupos,id',
            'tareas_ids' => 'required|array|min:1',
            'tareas_ids.*' => 'exists:tareas,id',
            'duracion' => 'nullable|integer|min:1',
            'fecha' => 'nullable|date',
            'notas' => 'nullable|string',
        ]);

        // Crear la sesión
        $sesion = SesionesDeEstudio::create([
            'grupo_id' => $request->grupo_id,
            'duracion' => $request->duracion,
            'fecha' => $request->fecha,
            'notas' => $request->notas,
        ]);

        // Relación N:M → insertar en tabla pivote
        $sesion->tareas()->attach($request->tareas_ids);

        return redirect()->route('sesionesdeestudio.index')->with('success', 'Sesión de estudio creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(TareasSesiones $tareasSesiones)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TareasSesiones $tareasSesiones)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TareasSesiones $tareasSesiones)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TareasSesiones $tareasSesiones)
    {
        //
    }
}
