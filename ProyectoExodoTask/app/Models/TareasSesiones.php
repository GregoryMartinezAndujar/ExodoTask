<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//Tabla pivote
class TareasSesiones extends Model
{
    /** @use HasFactory<\Database\Factories\TareasSesionesFactory> */
    use HasFactory;
    public function tareas()
    {
        return $this->belongsToMany(Tareas::class);
    }
    public function sesion()
    {
        return $this->belongsToMany(SesionesDeEstudio::class);
    }
}
