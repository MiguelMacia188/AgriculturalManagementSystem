<?php

namespace App\Http\Controllers;

use App\Models\Reporte;
use App\Models\Cosecha;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class ReporteController extends Controller
{
    public function rendimientoLote(Request $request)
    {
        $request->validate([
            'lote_id' => 'required|exists:lotes,id',
            'desde' => 'required|date',
            'hasta' => 'required|date',
            'formato' => 'required|in:pdf,excel',
        ]);

        $cosechas = Cosecha::where('lote_id', $request->lote_id)
            ->whereBetween('fecha', [$request->desde, $request->hasta])
            ->get();

        $data = [
            'cosechas' => $cosechas,
            'lote_id' => $request->lote_id,
            'desde' => $request->desde,
            'hasta' => $request->hasta,
        ];

        if ($request->formato === 'pdf') {
            $pdf = Pdf::loadView('reportes.rendimiento_lote', $data);
            return $pdf->download('reporte_rendimiento_lote.pdf');
        }

        // For excel return a csv for simplicity
        $csv = "fecha,cantidad_kg,calidad\n";
        foreach ($cosechas as $c) {
            $csv .= "{$c->fecha},{$c->cantidad_kg},{$c->calidad}\n";
        }

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="reporte_rendimiento_lote.csv"',
        ]);
    }
}
