<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Aplicacion;
use App\Models\ProductoInsumo;
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
            'evidencia_base64' => 'nullable|string',
        ]);

        $user = $request->user();

        DB::beginTransaction();
        try {
            $producto = ProductoInsumo::lockForUpdate()->findOrFail($request->producto_insumo_id);

            if ($producto->cantidad_actual < $request->dosis) {
                DB::rollBack();
                return response()->json(['message' => 'Stock insuficiente'], 422);
            }
            $producto->cantidad_actual = round($producto->cantidad_actual - $request->dosis, 2);
            $producto->save();

            $aplicacion = Aplicacion::create([
                'calendario_aplicacion_id' => $request->calendario_aplicacion_id,
                'user_id' => $user->id,
                'producto_insumo_id' => $producto->id,
                'fecha' => $request->fecha,
                'dosis' => $request->dosis,
                'responsable' => $request->responsable,
            ]);

            if ($request->filled('evidencia_base64')) {
                $data = $request->evidencia_base64;
                if (preg_match('/^data:(image\/\w+);base64,/', $data, $type)) {
                    $data = substr($data, strpos($data, ',') + 1);
                    $data = base64_decode($data);
                    $extension = explode('/', $type[1])[1];
                    $filename = 'evidencias/aplicaciones/' . uniqid() . '.' . $extension;
                    Storage::disk('public')->put($filename, $data);
                    $aplicacion->evidencia_url = Storage::url($filename);
                    $aplicacion->save();
                }
            }

            DB::commit();

            return response()->json(['aplicacion' => $aplicacion], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error interno', 'error' => $e->getMessage()], 500);
        }
    }
}
