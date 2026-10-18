<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\ProductoInsumoController;
use App\Http\Controllers\CalendarioController;
use App\Http\Controllers\ReporteController;

Route::get('/', function () { return view('welcome'); });

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () { return view('dashboard'); })->name('dashboard');

    Route::resource('proveedors', ProveedorController::class)->only(['index','create','store']);
    Route::resource('productos', ProductoInsumoController::class)->only(['index','create','store']);
    Route::resource('calendario', CalendarioController::class)->only(['index','create','store']);

    Route::post('/reportes/rendimiento-lote', [ReporteController::class, 'rendimientoLote'])->name('reportes.rendimiento_lote');
});
