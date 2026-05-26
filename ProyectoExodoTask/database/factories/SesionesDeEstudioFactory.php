<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sesiones_de_Estudio>
 */
class SesionesDeEstudioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $h = fake()->numberBetween(1, 5);
        $s = $h * 3600;
        $usuarios = User::all();
        return [
            'a_nombre' => fake()->sentence(),
            'a_fecha' => fake()->date(),
            'a_tiempo_invertido' => $s,
            'a_tiempo_restante' => $s,
            'a_inicio_actual_at' => null,
            'a_estado' => 'pendiente',
            'a_finalizada' => fake()->boolean(),
            'a_user_id' => $usuarios->random()->id,
        ];
    }
}
