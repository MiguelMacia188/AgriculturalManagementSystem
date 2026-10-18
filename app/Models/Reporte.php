<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    protected $table = 'reportes';
    protected $fillable = ['user_id','tipo','fecha_generacion','formato'];

    public function user()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }

    public function cosechas()
    {
        return $this->belongsToMany(Cosecha::class, 'reporte_cosecha', 'reporte_id', 'cosecha_id');
    }
}
