<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Grupos_De_Tareas>
 */
class GruposDeTareasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $usuarios = User::all();
        return [
            'a_nombre' => fake()->name(),
            'a_user_id' => $usuarios->random()->id,
        ];
    }
}
