<?php

namespace App\Http\Controllers;

use App\Models\Lote;
use Illuminate\Http\Request;

class LoteController extends Controller
{
    public function index()
    {
        return response()->json(Lote::with('usuario')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:usuarios,id',
            'nombre' => 'required|string|max:80',
            'area_ha' => 'required|numeric|min:0',
            'cultivo' => 'required|in:banano,platano',
            'estado' => 'required|in:activo,inactivo',
        ]);

        $lote = Lote::create($request->all());

        return response()->json(['message' => 'Lote registrado', 'lote' => $lote], 201);
    }
}
