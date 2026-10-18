<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductoInsumo extends Model
{
    protected $table = 'producto_insumos';
    protected $fillable = ['proveedor_id', 'nombre', 'categoria', 'costo_unitario', 'cantidad_actual', 'cantidad_minima'];

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_id');
    }
}
