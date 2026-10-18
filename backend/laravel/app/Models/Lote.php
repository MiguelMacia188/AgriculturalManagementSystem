<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lote extends Model
{
    protected $table = 'lotes';
    protected $fillable = ['user_id', 'nombre', 'area_ha', 'cultivo', 'estado'];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }
}
