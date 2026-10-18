@extends('layouts.app')

@section('title','Calendario de Aplicaciones')

@section('content')
  <h2>Calendario</h2>
  <a href="{{ route('calendario.create') }}">Programar aplicación</a>
  <ul>
    @foreach($calendarios as $c)
      <li>{{ $c->fecha_programada }} - {{ $c->tipo }} - Lote #{{ $c->lote_id }}</li>
    @endforeach
  </ul>
@endsection
