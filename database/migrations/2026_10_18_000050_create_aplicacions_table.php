<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('aplicacions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calendario_aplicacion_id')->nullable()->constrained('calendario_aplicacions')->nullOnDelete();
            $table->foreignId('user_id')->constrained('usuarios')->onDelete('cascade');
            $table->foreignId('producto_insumo_id')->constrained('producto_insumos')->onDelete('cascade');
            $table->date('fecha');
            $table->decimal('dosis', 6, 2);
            $table->string('responsable', 100);
            $table->string('evidencia_url', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('aplicacions');
    }
};
