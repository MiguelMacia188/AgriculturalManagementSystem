<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AplicacionController;
use App\Http\Controllers\Api\CosechaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoteController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/health', fn () => response()->json(['status' => 'ok']));

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/lotes', [LoteController::class, 'index']);
    Route::post('/lotes', [LoteController::class, 'store']);
    Route::post('/aplicaciones', [AplicacionController::class, 'store']);
    Route::post('/cosechas', [CosechaController::class, 'store']);
});
