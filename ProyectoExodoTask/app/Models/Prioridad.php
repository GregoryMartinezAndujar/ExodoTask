<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prioridad extends Model
{
    /** @use HasFactory<\Database\Factories\PrioridadFactory> */
    use HasFactory;

    protected $table = 'prioridades';
    protected $fillable = [
        'a_nombre',
        'a_orden',
    ];

    public function tareas()
    {
        return $this->hasMany(Tareas::class );
    }
}
