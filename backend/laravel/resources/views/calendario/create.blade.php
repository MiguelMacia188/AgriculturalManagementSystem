@extends('layouts.app')

@section('title','Programar aplicación')

@section('content')
  <h2>Programar aplicación</h2>
  <form method="post" action="{{ route('calendario.store') }}">@csrf
    <label>Lote (id)<br><input name="lote_id" required></label><br>
    <label>Fecha programada<br><input name="fecha_programada" type="date" required></label><br>
    <label>Tipo<br>
      <select name="tipo" required>
        <option value="fungicida">Fungicida</option>
        <option value="fertilizante">Fertilizante</option>
        <option value="nutricion">Nutrición</option>
      </select>
    </label><br>
    <button type="submit">Programar</button>
  </form>
@endsection
