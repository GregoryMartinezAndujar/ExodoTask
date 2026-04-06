<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TareasSesiones extends Model
{
    use HasFactory;

    protected $table = 'tareas_sesiones';

    protected $fillable = [
        'a_sesion_estudio_id',
        'a_tarea_id'
    ];

    public function tarea()
    {
        return $this->belongsTo(Tareas::class, 'a_tarea_id');
    }

    public function sesion()
    {
        return $this->belongsTo(SesionesDeEstudio::class, 'a_sesion_estudio_id');
    }
}

