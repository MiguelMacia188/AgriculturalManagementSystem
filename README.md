# SIGA - Sistema de Gestión Agrícola

Este commit inicial añade la estructura principal para el proyecto SIGA:
- Migraciones para tablas solicitadas
- Modelos Eloquent
- Controladores API para aplicaciones y cosechas (lógica de inventario incluida)
- Comando Artisan para generación de alertas diarias
- Middleware de roles (registrar manualmente en Kernel)
- Service Worker y script de sincronización (IndexedDB)

Instrucciones rápidas:
1. Crea una rama local desde `siga/full-implementation` si quieres trabajar.
2. composer install
3. cp .env.example .env -> configura la DB
4. php artisan key:generate
5. php artisan migrate --seed
6. php artisan storage:link
7. npm install && npm run dev
8. Registrar service worker en plantilla Blade e incluir `resources/js/pwa-sync.js`

Notas:
- Revisar app/Http/Kernel.php y añadir en $routeMiddleware:
    'role' => \App\Http\Middleware\RoleMiddleware::class,
- Registrar el comando `GenerateAlerts` en app/Console/Kernel.php y el scheduler (ya incluido en el código generado).
- Para autenticación de API se recomienda Laravel Sanctum (instalar y configurar).

Si quieres que continúe: puedo
- Añadir seeders con datos de ejemplo (admin, proveedor, productos, lotes)
- Registrar middleware en Kernel y el comando en Kernel automáticamente
- Añadir vistas Blade y Livewire components
- Configurar CI / instrucción de despliegue
