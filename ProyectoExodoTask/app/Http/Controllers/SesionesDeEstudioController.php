<?php

namespace App\Http\Controllers;

use App\Models\SesionesDeEstudio;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GruposDeTareas;
use App\Models\Tareas;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class SesionesDeEstudioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sesiones = SesionesDeEstudio::with('tareas:id,a_nombre,a_horas,a_completada,a_grupo_id')
            ->where('a_user_id', Auth::id())
            ->latest()
            ->get()
            ->map(fn (SesionesDeEstudio $sesion) => $this->appendTimerState($sesion));

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
        $tareas = Tareas::with('user:id,name')
            ->where('a_user_id', Auth::id())
            ->latest()
            ->get();
        $grupos = GruposDeTareas::with(['user:id,name'])
            ->where('a_user_id', Auth::id())
            ->latest()
            ->get();

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
            'a_fecha' => 'required|date',
            'a_tiempo_invertido' => 'nullable|integer|min:0',
            'a_tareas_ids' => 'nullable|array',
            'a_tareas_ids.*' => 'integer|exists:tareas,id',
            'a_grupos_ids' => 'nullable|array',
            'a_grupos_ids.*' => 'integer|exists:grupos_de_tareas,id',
        ]);

        $tareasIds = $this->resolveTareasIds(
            $validated['a_tareas_ids'] ?? [],
            $validated['a_grupos_ids'] ?? []
        );

        if ($tareasIds->isEmpty()) {
            return back()->withErrors([
                'a_tareas_ids' => 'Debes seleccionar al menos una tarea o un grupo con tareas.',
            ]);
        }

        $tiempoTotal = $this->calcularTiempoTotal($tareasIds);

        $sesion = SesionesDeEstudio::create([
            'a_nombre' => $validated['a_nombre'],
            'a_fecha' => $validated['a_fecha'],
            'a_tiempo_invertido' => $tiempoTotal,
            'a_tiempo_restante' => $tiempoTotal,
            'a_inicio_actual_at' => null,
            'a_estado' => 'pendiente',
            'a_finalizada' => false,
            'a_user_id' => Auth::id(),
        ]);

        $sesion->tareas()->sync($tareasIds->all());

        return redirect()->route('sesionesdetareas.ejecutar', $sesion);
    }

    public function show(SesionesDeEstudio $sesion)
    {
        $this->authorizeSesion($sesion);

        $sesion->load('tareas:id,a_nombre,a_horas,a_completada,a_grupo_id');

        return Inertia::render('Usuario/EjecutarSesiones', [
            'sesion' => $this->appendTimerState($sesion),
            'currentRoute' => request()->route()->getName(),
        ]);
    }

    public function transition(Request $request, SesionesDeEstudio $sesion)
    {
        $this->authorizeSesion($sesion);

        $validated = $request->validate([
            'accion' => 'required|in:pausar,reanudar,finalizar',
            'a_tiempo_restante' => 'required|integer|min:0',
        ]);

        $estadosPermitidos = [
            'reanudar' => ['pendiente', 'pausada'],
            'pausar' => ['en_progreso'],
            'finalizar' => ['en_progreso', 'pausada'],
        ];

        if (!in_array($sesion->a_estado, $estadosPermitidos[$validated['accion']] ?? [])) {
            return abort(422, "No se puede {$validated['accion']} una sesión en estado '{$sesion->a_estado}'.");
        }

        if ($validated['accion'] === 'reanudar') {
            $sesion->update([
                'a_inicio_actual_at' => now(),
                'a_estado' => 'en_progreso',
                'a_finalizada' => false,
            ]);

            if (($request->ajax() || $request->wantsJson()) && !$request->header('X-Inertia')) {
                $sesion->refresh();
                return response()->json(['sesion' => $this->appendTimerState($sesion)]);
            }

            return back();
        }

        if ($validated['accion'] === 'finalizar') {
            $sesion->update([
                'a_tiempo_restante' => 0,
                'a_inicio_actual_at' => null,
                'a_estado' => 'finalizada',
                'a_finalizada' => true,
            ]);

            if (($request->ajax() || $request->wantsJson()) && !$request->header('X-Inertia')) {
                $sesion->refresh();
                return response()->json(['sesion' => $this->appendTimerState($sesion)]);
            }

            return back();
        }

        $sesion->update([
            'a_tiempo_restante' => $validated['a_tiempo_restante'],
            'a_inicio_actual_at' => null,
            'a_estado' => 'pausada',
            'a_finalizada' => false,
        ]);

        if (($request->ajax() || $request->wantsJson()) && !$request->header('X-Inertia')) {
            $sesion->refresh();
            return response()->json(['sesion' => $this->appendTimerState($sesion)]);
        }

        return back();
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
        $this->authorizeSesion($sesionesDeEstudio);

        $sesionesDeEstudio->delete();
        return redirect()->route('sesionesdetareas.index');
    }

    private function resolveTareasIds(array $tareasIds, array $gruposIds): Collection
    {
        $tareasIds = collect($tareasIds)
            ->filter()
            ->map(fn ($id) => (int) $id);

        $gruposIds = collect($gruposIds)
            ->filter()
            ->map(fn ($id) => (int) $id);

        $tareasDeGrupos = Tareas::query()
            ->where('a_user_id', Auth::id())
            ->when($gruposIds->isNotEmpty(), fn ($query) => $query->whereIn('a_grupo_id', $gruposIds->all()))
            ->pluck('id');

        return $tareasIds
            ->merge($tareasDeGrupos)
            ->unique()
            ->values();
    }

    private function calcularTiempoTotal(Collection $tareasIds): int
    {
        return (int) Tareas::query()
            ->where('a_user_id', Auth::id())
            ->whereIn('id', $tareasIds->all())
            ->sum('a_horas');
    }

    private function appendTimerState(SesionesDeEstudio $sesion): SesionesDeEstudio
    {
        $sesion->a_tiempo_restante_calculado = $this->tiempoRestanteActual($sesion);
        return $sesion;
    }

    private function tiempoRestanteActual(SesionesDeEstudio $sesion): int
    {
        $restante = (int) ($sesion->a_tiempo_restante ?? $sesion->a_tiempo_invertido ?? 0);

        if ($sesion->a_estado === 'en_progreso' && $sesion->a_inicio_actual_at) {
            $transcurrido = Carbon::parse($sesion->a_inicio_actual_at)->diffInSeconds(now());
            return max(0, $restante - $transcurrido);
        }

        return max(0, $restante);
    }

    private function authorizeSesion(SesionesDeEstudio $sesion): void
    {
        if ($sesion->a_user_id !== Auth::id()) {
            abort(403, 'No autorizado para acceder a esta sesión de estudio.');
        }
    }
}
