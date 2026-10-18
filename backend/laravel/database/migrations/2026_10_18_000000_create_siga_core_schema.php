<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);
            $table->string('email', 150)->unique();
            $table->string('password', 255);
            $table->enum('rol', ['administrador', 'trabajador_campo']);
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('lotes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('usuarios')->onDelete('cascade');
            $table->string('nombre', 80);
            $table->decimal('area_ha', 8, 2);
            $table->enum('cultivo', ['banano', 'platano']);
            $table->enum('estado', ['activo', 'inactivo'])->default('activo');
            $table->timestamps();
        });

        Schema::create('proveedors', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);
            $table->string('telefono', 20)->nullable();
            $table->timestamps();
        });

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

        Schema::create('calendario_aplicacions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lote_id')->constrained('lotes')->onDelete('cascade');
            $table->date('fecha_programada');
            $table->enum('tipo', ['fungicida', 'fertilizante', 'nutricion']);
            $table->enum('estado', ['pendiente', 'realizada', 'vencida'])->default('pendiente');
            $table->timestamps();
        });

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

        Schema::create('cosechas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lote_id')->constrained('lotes')->onDelete('cascade');
            $table->date('fecha');
            $table->decimal('cantidad_kg', 8, 2);
            $table->enum('calidad', ['primera', 'segunda', 'descarte']);
            $table->timestamps();
        });

        Schema::create('alertas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calendario_aplicacion_id')->constrained('calendario_aplicacions')->onDelete('cascade');
            $table->enum('tipo', ['aplicacion_pendiente', 'producto_por_vencer']);
            $table->date('fecha_vencimiento')->nullable();
            $table->enum('estado', ['activa', 'atendida'])->default('activa');
            $table->timestamps();
        });

        Schema::create('reportes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('usuarios')->onDelete('cascade');
            $table->enum('tipo', ['rendimiento_lote', 'rendimiento_temporada']);
            $table->date('fecha_generacion');
            $table->enum('formato', ['pdf', 'excel']);
            $table->timestamps();
        });

        Schema::create('reporte_cosecha', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reporte_id')->constrained('reportes')->onDelete('cascade');
            $table->foreignId('cosecha_id')->constrained('cosechas')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reporte_cosecha');
        Schema::dropIfExists('reportes');
        Schema::dropIfExists('alertas');
        Schema::dropIfExists('cosechas');
        Schema::dropIfExists('aplicacions');
        Schema::dropIfExists('calendario_aplicacions');
        Schema::dropIfExists('producto_insumos');
        Schema::dropIfExists('proveedors');
        Schema::dropIfExists('lotes');
        Schema::dropIfExists('usuarios');
    }
};
