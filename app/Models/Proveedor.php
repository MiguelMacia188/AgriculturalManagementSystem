<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $table = 'proveedors';
    protected $fillable = ['nombre','telefono'];

    public function productos()
    {
        return $this->hasMany(ProductoInsumo::class, 'proveedor_id');
    }
}
