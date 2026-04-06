<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SesionesDeEstudio extends Model
{
    /** @use HasFactory<\Database\Factories\SesionesDeEstudioFactory> */
    use HasFactory;
    protected $fillable = [
        'a_nombre',
        'a_fecha',
        'a_tiempo_invertido',
        'a_finalizada',
        'a_user_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'a_user_id')->withTimestamps();
    }
    public function tareas()
    {
    return $this->belongsToMany(Tareas::class, 'tareas_sesiones', 'a_sesion_estudio_id', 'a_tarea_id');
    }


}
