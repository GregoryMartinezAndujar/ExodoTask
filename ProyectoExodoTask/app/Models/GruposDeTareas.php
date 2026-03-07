<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GruposDeTareas extends Model
{
    /** @use HasFactory<\Database\Factories\GruposDeTareasFactory> */
    use HasFactory;
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
