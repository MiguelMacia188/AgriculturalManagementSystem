<?php

namespace App\Http\Controllers;

use App\Models\Proveedor;
use Illuminate\Http\Request;

class ProveedorController extends Controller
{
    public function index()
    {
        return view('proveedors.index', ['proveedors' => Proveedor::all()]);
    }

    public function create()
    {
        return view('proveedors.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'telefono' => 'nullable|string|max:20',
        ]);

        Proveedor::create($request->only(['nombre','telefono']));

        return redirect()->route('proveedors.index')->with('success', 'Proveedor creado');
    }
}
