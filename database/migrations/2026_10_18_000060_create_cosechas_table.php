<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cosechas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lote_id')->constrained('lotes')->onDelete('cascade');
            $table->date('fecha');
            $table->decimal('cantidad_kg', 8, 2);
            $table->enum('calidad', ['primera', 'segunda', 'descarte']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cosechas');
    }
};
