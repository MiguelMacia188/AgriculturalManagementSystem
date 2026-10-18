@extends('layouts.app')

@section('title','Productos')

@section('content')
  <h2>Productos / Insumos</h2>
  <a href="{{ route('productos.create') }}">Crear producto</a>
  <table border="1" cellpadding="8">
    <thead><tr><th>Nombre</th><th>Categoría</th><th>Proveedor</th><th>Existencia</th><th>Mínimo</th></tr></thead>
    <tbody>
    @foreach($productos as $prod)
      <tr>
        <td>{{ $prod->nombre }}</td>
        <td>{{ $prod->categoria }}</td>
        <td>{{ $prod->proveedor?->nombre }}</td>
        <td>{{ $prod->cantidad_actual }}</td>
        <td>{{ $prod->cantidad_minima }}</td>
      </tr>
    @endforeach
    </tbody>
  </table>
@endsection
