<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotasTareas extends Model
{
    /** @use HasFactory<\Database\Factories\NotasTareasFactory> */
    use HasFactory;
    public function tareas()
    {
        return $this->belongsTo(Tareas::class);
    }
}
