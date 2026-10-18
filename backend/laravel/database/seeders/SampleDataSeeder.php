<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proveedor;
use App\Models\ProductoInsumo;
use App\Models\Lote;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        $p1 = Proveedor::firstOrCreate(['nombre' => 'Agroinsumos del Caribe'], ['telefono' => '3001234567']);
        $p2 = Proveedor::firstOrCreate(['nombre' => 'Fertilizantes del Norte'], ['telefono' => '3159876543']);

        ProductoInsumo::firstOrCreate(['nombre' => 'Mancozeb 80 WP'], [
            'proveedor_id' => $p1->id,
            'categoria' => 'fungicida',
            'costo_unitario' => 18500,
            'cantidad_actual' => 50,
            'cantidad_minima' => 10,
        ]);

        ProductoInsumo::firstOrCreate(['nombre' => 'NPK 15-15-15'], [
            'proveedor_id' => $p2->id,
            'categoria' => 'fertilizante',
            'costo_unitario' => 4200,
            'cantidad_actual' => 200,
            'cantidad_minima' => 20,
        ]);

        Lote::firstOrCreate(['nombre' => 'La Esperanza', 'user_id' => 1], [
            'area_ha' => 3.5,
            'cultivo' => 'banano',
            'estado' => 'activo',
        ]);

        Lote::firstOrCreate(['nombre' => 'El Porvenir', 'user_id' => 1], [
            'area_ha' => 4.2,
            'cultivo' => 'platano',
            'estado' => 'activo',
        ]);
    }
}
