<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aplicacion extends Model
{
    protected $table = 'aplicacions';
    protected $fillable = ['calendario_aplicacion_id','user_id','producto_insumo_id','fecha','dosis','responsable','evidencia_url'];

    public function calendario()
    {
        return $this->belongsTo(CalendarioAplicacion::class, 'calendario_aplicacion_id');
    }

    public function producto()
    {
        return $this->belongsTo(ProductoInsumo::class, 'producto_insumo_id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }
}
