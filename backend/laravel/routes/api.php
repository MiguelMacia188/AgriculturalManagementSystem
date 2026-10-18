<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AplicacionController;
use App\Http\Controllers\Api\CosechaController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/aplicaciones', [AplicacionController::class, 'store']);
    Route::post('/cosechas', [CosechaController::class, 'store']);
});
