<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tareas extends Model
{
    /** @use HasFactory<\Database\Factories\TareasFactory> */
    use HasFactory;

    //Creacion de las cardinalidades en la base de datos 
    public function user()
    {
        return $this->belongsTo(User::class, 'a_user_id');
    }
    public function grupoTareas()
    {
        return $this->belongsTo(GruposDeTareas::class, 'a_grupo_id');
    }
    public function notas()
    {
        return $this->hasMany(NotasTareas::class);
    }
}
