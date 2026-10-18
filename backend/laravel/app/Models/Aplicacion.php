<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aplicacion extends Model
{
    protected $table = 'aplicacions';
    protected $fillable = ['calendario_aplicacion_id', 'user_id', 'producto_insumo_id', 'fecha', 'dosis', 'responsable', 'evidencia_url'];
}
