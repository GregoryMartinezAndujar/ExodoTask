<?php

namespace App\Http\Controllers;

use App\Models\SesionesDeEstudio;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GruposDeTareas;
use App\Models\Tareas;
use App\Models\TareasSesiones;
class SesionesDeEstudioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
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
             ]);

            SesionesDeEstudio::create([
                 'a_user_id' => auth()->id(),
                 'a_nombre' => $validated['a_nombre'],
                 'a_tiempo_invertido' => $validated['a_tiempo_invertido'],
                 'a_fecha' => $validated['a_fecha'],
             ]);


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
        //
    }
}
