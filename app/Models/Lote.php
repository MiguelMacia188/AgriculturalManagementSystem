<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lote extends Model
{
    protected $fillable = ['user_id', 'nombre', 'area_ha', 'cultivo', 'estado'];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }

    public function calendario()
    {
        return $this->hasMany(CalendarioAplicacion::class, 'lote_id');
    }

    public function cosechas()
    {
        return $this->hasMany(Cosecha::class, 'lote_id');
    }
}
