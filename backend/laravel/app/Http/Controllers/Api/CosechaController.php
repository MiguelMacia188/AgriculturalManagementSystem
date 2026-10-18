<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cosecha;
use Illuminate\Http\Request;

class CosechaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'lote_id' => 'required|exists:lotes,id',
            'fecha' => 'required|date',
            'cantidad_kg' => 'required|numeric|min:0.01',
            'calidad' => 'required|in:primera,segunda,descarte',
        ]);

        $cosecha = Cosecha::create($request->only(['lote_id', 'fecha', 'cantidad_kg', 'calidad']));

        return response()->json(['cosecha' => $cosecha], 201);
    }
}
