<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('producto_insumos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proveedor_id')->constrained('proveedors')->onDelete('cascade');
            $table->string('nombre', 100);
            $table->enum('categoria', ['fungicida', 'fertilizante', 'nutricion', 'otro']);
            $table->decimal('costo_unitario', 10, 2);
            $table->decimal('cantidad_actual', 8, 2);
            $table->decimal('cantidad_minima', 8, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('producto_insumos');
    }
};
