<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aplicacion;
use App\Models\ProductoInsumo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AplicacionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'producto_insumo_id' => 'required|exists:producto_insumos,id',
            'fecha' => 'required|date',
            'dosis' => 'required|numeric|min:0.01',
            'responsable' => 'required|string|max:100',
            'calendario_aplicacion_id' => 'nullable|exists:calendario_aplicacions,id',
        ]);

        $user = $request->user();

        DB::beginTransaction();
        try {
            $producto = ProductoInsumo::lockForUpdate()->findOrFail($request->producto_insumo_id);
            if ($producto->cantidad_actual < $request->dosis) {
                DB::rollBack();
                return response()->json(['message' => 'Stock insuficiente'], 422);
            }

            $producto->cantidad_actual = max(0, $producto->cantidad_actual - $request->dosis);
            $producto->save();

            $aplicacion = Aplicacion::create([
                'calendario_aplicacion_id' => $request->calendario_aplicacion_id,
                'user_id' => $user?->id ?? 1,
                'producto_insumo_id' => $producto->id,
                'fecha' => $request->fecha,
                'dosis' => $request->dosis,
                'responsable' => $request->responsable,
            ]);

            if ($request->hasFile('evidencia')) {
                $path = $request->file('evidencia')->store('evidencias/aplicaciones', 'public');
                $aplicacion->evidencia_url = Storage::url($path);
                $aplicacion->save();
            }

            DB::commit();
            return response()->json(['aplicacion' => $aplicacion, 'stock_restante' => $producto->cantidad_actual], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error al registrar aplicación', 'error' => $e->getMessage()], 500);
        }
    }
}
