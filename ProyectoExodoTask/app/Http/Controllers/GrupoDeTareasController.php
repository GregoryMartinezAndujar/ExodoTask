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
            'tareas' => Tareas::with('user:id,name')->where('a_user_id', auth()->id())->latest()->get(),
            'currentRoute' => request()->route()->getName(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Usuario/Grupos', [
            'tareas' => Tareas::where('a_grupo_id', null)->where('a_user_id', auth()->id())->latest()->get(),
            'grupos' => GruposDeTareas::where('a_user_id', auth()->id())->get(),
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


        return redirect(route('gruposdetareas.index'))->with('success', 'Grupo de tareas creado exitosamente.');
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

        $tareas = Tareas::where('a_user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Usuario/EditarGrupos', [
            'grupo' => GruposDeTareas::where('id', $id)->where('a_user_id', auth()->id())->firstOrFail(),
            'tareas' => $tareas,
            'currentRoute' => request()->route()->getName(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $grupo = GruposDeTareas::where('id', $id)->where('a_user_id', auth()->id())->firstOrFail();

        $validated = $request->validate([
            'a_nombre' => 'required|string|max:100',
            'tareasIds' => 'array',
            'tareasIds.*' => 'integer|exists:tareas,id',
        ]);

        $grupo->update([
            'a_nombre' => $validated['a_nombre'],
        ]);

        $tareasIds = $request->input('tareasIds', []);

        Tareas::whereIn('id', $tareasIds)
            ->where('a_user_id', auth()->id())
            ->update(['a_grupo_id' => $grupo->id]);

        Tareas::where('a_grupo_id', $grupo->id)
            ->whereNotIn('id', $tareasIds)
            ->where('a_user_id', auth()->id())
            ->update(['a_grupo_id' => null]);

        return redirect(route('gruposdetareas.index'))->with('success', 'Grupo de tareas actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $grupo = GruposDeTareas::where('id', $id)->where('a_user_id', auth()->id())->firstOrFail();

        Tareas::where('a_grupo_id', $grupo->id)
            ->where('a_user_id', auth()->id())
            ->update(['a_grupo_id' => null]);

        $grupo->delete();

        return redirect(route('gruposdetareas.index'))->with('success', 'Grupo de tareas eliminado exitosamente.');
    }
}
