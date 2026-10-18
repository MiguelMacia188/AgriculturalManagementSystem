@extends('layouts.app')

@section('title','Crear producto')

@section('content')
  <h2>Crear producto</h2>
  <form method="post" action="{{ route('productos.store') }}">@csrf
    <label>Proveedor<br>
      <select name="proveedor_id" required>
        <option value="">Seleccione</option>
        @foreach($proveedors as $p)
          <option value="{{ $p->id }}">{{ $p->nombre }}</option>
        @endforeach
      </select>
    </label><br>
    <label>Nombre<br><input name="nombre" required maxlength="100"></label><br>
    <label>Categoria<br>
      <select name="categoria" required>
        <option value="fungicida">Fungicida</option>
        <option value="fertilizante">Fertilizante</option>
        <option value="nutricion">Nutrición</option>
        <option value="otro">Otro</option>
      </select>
    </label><br>
    <label>Costo unitario<br><input name="costo_unitario" type="number" step="0.01" required></label><br>
    <label>Cantidad actual<br><input name="cantidad_actual" type="number" step="0.01" required></label><br>
    <label>Cantidad minima<br><input name="cantidad_minima" type="number" step="0.01" required></label><br>
    <button type="submit">Guardar</button>
  </form>
@endsection
