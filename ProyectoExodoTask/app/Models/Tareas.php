<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tareas extends Model
{
    /** @use HasFactory<\Database\Factories\TareasFactory> */
    use HasFactory;

    //Creacion de las cardinalidades en la base de datos 
    public function users()
    {
        return $this->belongsTo(User::class);
    }
    public function grupoTareas()
    {
        return $this->belongsTo(GruposDeTareas::class);
    }
    public function notas()
    {
        return $this->hasMany(NotasTareas::class);
    }
}
