<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalendarioAplicacion extends Model
{
    protected $table = 'calendario_aplicacions';
    protected $fillable = ['lote_id','fecha_programada','tipo','estado'];

    public function lote()
    {
        return $this->belongsTo(Lote::class, 'lote_id');
    }

    public function alertas()
    {
        return $this->hasMany(Alerta::class, 'calendario_aplicacion_id');
    }
}
