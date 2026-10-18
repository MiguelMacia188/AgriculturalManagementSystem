<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('calendario_aplicacions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lote_id')->constrained('lotes')->onDelete('cascade');
            $table->date('fecha_programada');
            $table->enum('tipo', ['fungicida', 'fertilizante', 'nutricion']);
            $table->enum('estado', ['pendiente', 'realizada', 'vencida'])->default('pendiente');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calendario_aplicacions');
    }
};
