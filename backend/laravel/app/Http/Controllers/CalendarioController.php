<?php

namespace App\Http\Controllers;

use App\Models\CalendarioAplicacion;
use Illuminate\Http\Request;

class CalendarioController extends Controller
{
    public function index()
    {
        $calendarios = CalendarioAplicacion::with('lote')->orderBy('fecha_programada')->get();
        return view('calendario.index', compact('calendarios'));
    }

    public function create()
    {
        return view('calendario.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'lote_id' => 'required|exists:lotes,id',
            'fecha_programada' => 'required|date',
            'tipo' => 'required|in:fungicida,fertilizante,nutricion',
        ]);

        CalendarioAplicacion::create($request->only(['lote_id','fecha_programada','tipo']));

        return redirect()->route('calendario.index')->with('success', 'Programación creada');
    }
}
