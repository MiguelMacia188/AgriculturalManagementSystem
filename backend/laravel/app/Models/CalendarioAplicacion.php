<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalendarioAplicacion extends Model
{
    protected $table = 'calendario_aplicacions';
    protected $fillable = ['lote_id', 'fecha_programada', 'tipo', 'estado'];
}
