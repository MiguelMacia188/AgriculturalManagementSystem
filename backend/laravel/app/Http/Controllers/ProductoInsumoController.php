<?php

namespace App\Http\Controllers;

use App\Models\ProductoInsumo;
use App\Models\Proveedor;
use Illuminate\Http\Request;

class ProductoInsumoController extends Controller
{
    public function index()
    {
        $productos = ProductoInsumo::with('proveedor')->get();
        return view('productos.index', compact('productos'));
    }

    public function create()
    {
        $proveedors = Proveedor::all();
        return view('productos.create', compact('proveedors'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'proveedor_id' => 'required|exists:proveedors,id',
            'nombre' => 'required|string|max:100',
            'categoria' => 'required|in:fungicida,fertilizante,nutricion,otro',
            'costo_unitario' => 'required|numeric|min:0',
            'cantidad_actual' => 'required|numeric|min:0',
            'cantidad_minima' => 'required|numeric|min:0',
        ]);

        ProductoInsumo::create($request->only(['proveedor_id','nombre','categoria','costo_unitario','cantidad_actual','cantidad_minima']));

        return redirect()->route('productos.index')->with('success', 'Producto creado');
    }
}
