<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\CalendarioAplicacion;
use App\Models\Alerta;

class GenerateAlerts extends Command
{
    protected $signature = 'siga:generate-alerts';
    protected $description = 'Genera alertas diarias para aplicaciones pendientes y productos por vencer';

    public function handle()
    {
        $pendientes = CalendarioAplicacion::where('estado', 'pendiente')
            ->whereDate('fecha_programada', '<=', now()->addDays(1)->toDateString())
            ->get();

        foreach ($pendientes as $c) {
            Alerta::firstOrCreate([
                'calendario_aplicacion_id' => $c->id,
                'tipo' => 'aplicacion_pendiente',
            ], [
                'fecha_vencimiento' => $c->fecha_programada,
                'estado' => 'activa',
            ]);
        }

        $this->info('Alertas generadas.');
    }
}
