<?php

namespace App\Console\Commands;

use App\Models\CalendarioAplicacion;
use App\Models\Alerta;
use Illuminate\Console\Command;

class GenerateAlerts extends Command
{
    protected $signature = 'siga:generate-alerts';
    protected $description = 'Genera alertas diarias del sistema SIGA';

    public function handle(): int
    {
        $pendientes = CalendarioAplicacion::where('estado', 'pendiente')
            ->whereDate('fecha_programada', '<=', now()->addDays(1)->toDateString())
            ->get();

        foreach ($pendientes as $aplicacion) {
            Alerta::firstOrCreate([
                'calendario_aplicacion_id' => $aplicacion->id,
                'tipo' => 'aplicacion_pendiente',
            ], [
                'fecha_vencimiento' => $aplicacion->fecha_programada,
                'estado' => 'activa',
            ]);
        }

        $this->info('Alertas generadas correctamente.');
        return self::SUCCESS;
    }
}
