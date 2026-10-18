@extends('layouts.app')

@section('title','Reporte rendimiento lote')

@section('content')
  <h2>Reporte - Rendimiento por Lote</h2>
  <p>Periodo: {{ $desde }} - {{ $hasta }}</p>
  <table border="1" cellpadding="6">
    <thead><tr><th>Fecha</th><th>Cantidad (kg)</th><th>Calidad</th></tr></thead>
    <tbody>
      @foreach($cosechas as $c)
        <tr><td>{{ $c->fecha }}</td><td>{{ $c->cantidad_kg }}</td><td>{{ $c->calidad }}</td></tr>
      @endforeach
    </tbody>
  </table>
@endsection
