@extends('layouts.app')

@section('title','Crear proveedor')

@section('content')
  <h2>Crear proveedor</h2>
  <form method="post" action="{{ route('proveedors.store') }}">@csrf
    <label>Nombre<br><input name="nombre" required maxlength="100"></label><br>
    <label>Teléfono<br><input name="telefono" maxlength="20"></label><br>
    <button type="submit">Guardar</button>
  </form>
@endsection
