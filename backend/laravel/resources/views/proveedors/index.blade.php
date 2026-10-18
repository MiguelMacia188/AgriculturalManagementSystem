@extends('layouts.app')

@section('title','Proveedores')

@section('content')
  <h2>Proveedores</h2>
  <a href="{{ route('proveedors.create') }}">Crear proveedor</a>
  <ul>
    @foreach($proveedors as $p)
      <li>{{ $p->nombre }} - {{ $p->telefono }}</li>
    @endforeach
  </ul>
@endsection
