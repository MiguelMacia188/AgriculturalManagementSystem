<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cosecha extends Model
{
    protected $table = 'cosechas';
    protected $fillable = ['lote_id', 'fecha', 'cantidad_kg', 'calidad'];
}
