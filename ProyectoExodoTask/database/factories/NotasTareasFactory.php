<?php

namespace Database\Factories;

use App\Models\Tareas;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notas_Tareas>
 */
class NotasTareasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tarea = Tareas::all();
        return [
            'a_text' => fake()->text(),
            'a_tarea_id' => $tarea->random()->id,
        ];
    }
}
