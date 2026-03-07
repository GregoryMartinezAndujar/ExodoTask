<?php

namespace Database\Factories;

use App\Models\SesionesDeEstudio;
use App\Models\Tareas;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tareas_Sesiones>
 */
class TareasSesionesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tarea = Tareas::all();
        $sesion = SesionesDeEstudio::all();
        return [
            'a_tarea_id' => $tarea->random()->id,
            'a_sesion_estudio_id' => $sesion->random()->id,
        ];
    }
}
