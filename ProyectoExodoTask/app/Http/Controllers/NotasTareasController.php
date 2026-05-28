<?php

namespace App\Http\Controllers;

use App\Models\Tareas;
use Illuminate\Http\Request;

class NotasTareasController extends Controller
{
    public function store(Request $request, $tareaId)
    {
        $tarea = Tareas::where('id', $tareaId)
            ->where('a_user_id', auth()->id())
            ->firstOrFail();

        $validated = $request->validate([
            'a_text' => 'required|string|max:255',
        ]);

        $tarea->notas()->create([
            'a_text' => $validated['a_text'],
            'a_completada' => false,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $tareaId, $notaId)
    {
        $tarea = Tareas::where('id', $tareaId)
            ->where('a_user_id', auth()->id())
            ->firstOrFail();

        $nota = $tarea->notas()->where('id', $notaId)->firstOrFail();
        $nota->update($request->only(['a_text', 'a_completada']));

        return redirect()->back();
    }

    public function destroy($tareaId, $notaId)
    {
        $tarea = Tareas::where('id', $tareaId)
            ->where('a_user_id', auth()->id())
            ->firstOrFail();

        $nota = $tarea->notas()->where('id', $notaId)->firstOrFail();
        $nota->delete();

        return redirect()->back();
    }
}
