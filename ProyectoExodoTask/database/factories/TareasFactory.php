<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tareas>
 */
class TareasFactory extends Factory
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
            'a_nombre' => fake()->text(),
            'a_descripcion' =>  fake()->realText(),
            'a_horas' =>  fake()->time(),
            'a_user_id' => $usuarios->random()->id,
        ];
    }
}
