@extends('layouts.app')

@section('title','Dashboard')

@section('content')
  <h1>Bienvenido a SIGA</h1>
  <p>Panel administrativo básico. Navega al menú para gestionar lotes, insumos y calendario.</p>
  <ul>
    <li><a href="{{ route('proveedors.index') }}">Proveedores</a></li>
    <li><a href="{{ route('productos.index') }}">Productos / Insumos</a></li>
    <li><a href="{{ route('calendario.index') }}">Calendario de Aplicaciones</a></li>
  </ul>
@endsection
