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
        return Inertia::render('Usuario/Index', [
            'tareas' => Tareas::with('user:id,name')
                ->latest()
                ->get()

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
