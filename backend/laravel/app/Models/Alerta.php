<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alerta extends Model
{
    protected $table = 'alertas';
    protected $fillable = ['calendario_aplicacion_id', 'tipo', 'fecha_vencimiento', 'estado'];
}
