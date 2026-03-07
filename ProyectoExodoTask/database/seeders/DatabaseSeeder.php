<?php

namespace Database\Seeders;

use App\Models\GruposDeTareas;
use App\Models\Niveles;
use App\Models\SesionesDeEstudio;
use App\Models\Tareas;
use App\Models\TareasSesiones;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Niveles::factory()->create([
            'a_nombre' => "Soy la cabra"
        ]);
        Niveles::factory()->create([
            'a_nombre' => "Soy la cabra, pero no tanto"
        ]);
        Niveles::factory()->create([
            'a_nombre' => "Soy la cabra,zaida es la cabra "
        ]);

        $niveles = Niveles::all();
        User::factory(20)->create()->each(function ($user) use ($niveles) {
            $user->nivel()->associate($niveles->random());
            $user->save();
        });

        GruposDeTareas::factory(10)->create();

        $grupo = GruposDeTareas::all();
        Tareas::factory(30)->create()->each(function ($tarea) use ($grupo) {
            $tarea->grupoTareas()->associate($grupo->random());
            $tarea->save();
        });
        SesionesDeEstudio::factory(10)->create();
        
        TareasSesiones::factory(10)->create();
    }
}
