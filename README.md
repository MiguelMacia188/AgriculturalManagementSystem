# SIGA - Sistema de Gestión Agrícola

SIGA es una plataforma para gestionar lotes, insumos, calendarización agrícola, cosechas y alertas para fincas de banano, plátano y cultivos permanentes.

## Requisito principal
- XAMPP con Apache + MySQL + PHP 8.2+
- Composer
- Node.js + npm (opcional para front React)

## Estructura del repositorio
- `src/` : interfaz frontend React + Vite
- `public/` : assets públicos, manifest PWA y service worker
- `backend/laravel/` : base Laravel 11 para API y lógica del negocio

## Ejecutar frontend localmente
1. En la raíz del repo:
   - `npm install`
   - `npm run dev`
2. Abrir en navegador:
   - `http://localhost:5173`

## Ejecutar backend local con XAMPP
1. Crear base de datos en MySQL: `siga_db`
2. Ubicar el proyecto en `htdocs` o un VirtualHost Apache
3. Ir a `backend/laravel`
4. Ejecutar:
   - `composer install`
   - `cp .env.example .env`
   - `php artisan key:generate`
   - `php artisan migrate --seed`
   - `php artisan storage:link`
5. Iniciar el servidor:
   - `php artisan serve --host=0.0.0.0 --port=8000`
6. Probar endpoints:
   - `http://localhost:8000/api/health`
   - `http://localhost:8000/api/login`

## Credenciales demo
- Admin: `admin@siga.co` / `administrador`
- Campo: `campo@siga.co` / `trabajador`

## Módulos del sistema
- Usuarios y autenticación por roles
- Lotes, inventario y proveedores
- Calendario de aplicaciones y vigilancia
- Cosechas y alertas
- Reportes PDF y PWA offline

## Notas finales
Este repositorio ya incluye la base de sistema SIGA, diseño visual, modelo de datos y estructura del backend. Para completarlo a nivel de producción, se recomienda terminar la capa de autenticación con Breeze/Sanctum, conectar cada módulo a bases de datos reales y desplegar en un entorno real con HTTPS.
