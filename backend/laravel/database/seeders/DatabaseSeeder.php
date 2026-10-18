<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Usuario::updateOrCreate(
            ['email' => 'admin@siga.co'],
            [
                'nombre' => 'Administrador SIGA',
                'password' => Hash::make('administrador'),
                'rol' => 'administrador',
            ]
        );

        Usuario::updateOrCreate(
            ['email' => 'campo@siga.co'],
            [
                'nombre' => 'Trabajador de Campo',
                'password' => Hash::make('trabajador'),
                'rol' => 'trabajador_campo',
            ]
        );
    }
}
