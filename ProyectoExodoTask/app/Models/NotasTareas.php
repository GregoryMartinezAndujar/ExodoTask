<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotasTareas extends Model
{
    /** @use HasFactory<\Database\Factories\NotasTareasFactory> */
    use HasFactory;
    protected $fillable = ['a_text', 'a_completada', 'a_tarea_id'];
    public function tareas()
    {
        return $this->belongsTo(Tareas::class, 'a_tarea_id');
    }
}
