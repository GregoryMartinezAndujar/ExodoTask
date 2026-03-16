<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tareas extends Model
{
    /** @use HasFactory<\Database\Factories\TareasFactory> */
    use HasFactory;
    protected $fillable = [
        'a_nombre',
        'a_descripcion',
        'a_horas',
        'a_user_id',
        'a_completada',
    ];
    protected $casts = [
        'a_completada' => 'boolean',
    ];

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
