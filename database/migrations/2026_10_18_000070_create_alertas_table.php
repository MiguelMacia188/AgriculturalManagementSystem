<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('alertas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calendario_aplicacion_id')->constrained('calendario_aplicacions')->onDelete('cascade');
            $table->enum('tipo', ['aplicacion_pendiente', 'producto_por_vencer']);
            $table->date('fecha_vencimiento')->nullable();
            $table->enum('estado', ['activa', 'atendida'])->default('activa');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alertas');
    }
};
