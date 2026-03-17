<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GruposDeTareas;
use App\Models\Tareas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GrupoDeTareasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('GruposDisponibles', [
            'grupos' => GruposDeTareas::with('user:id,name')->where('a_user_id', auth()->id())->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Usuario/Grupos', [
            'tareas' => Tareas::with('user:id,name')->where('a_user_id', auth()->id())->latest()->get(),
            'currentRoute' => request()->route()->getName(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'a_nombre' => 'required|string|max:100',
            'tareasIds' => 'array',
            'tareasIds.*' => 'integer|exists:tareas,id',
        ]);

        $tareasIds = $request->input('tareasIds', []); 
        $grupo = $request->user()->grupos()->create([
            'a_nombre' => $validated['a_nombre'],
        ]);


        $tareasIds = $request->input('tareasIds', []); 


       Tareas::whereIn('id', $tareasIds)
         ->where('a_user_id', auth()->id())   
        ->update(['a_grupo_id' => $grupo->id]);


        return redirect(route('dashboard'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
