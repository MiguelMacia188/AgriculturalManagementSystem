<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('reporte_cosecha', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reporte_id')->constrained('reportes')->onDelete('cascade');
            $table->foreignId('cosecha_id')->constrained('cosechas')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reporte_cosecha');
    }
};
