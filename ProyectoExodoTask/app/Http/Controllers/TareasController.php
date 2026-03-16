<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
        
        return redirect(route('tareas.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tarea = Tareas::findOrFail($id);
        $tarea->update([
            'a_completada' => $request->a_completada,
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tarea = Tareas::findOrFail($id);
        $tarea->delete();
        return redirect(route('tareas.index'));
    }
    public function create()
    {
        return Inertia::render('Usuario/Index', []);
    }
}
