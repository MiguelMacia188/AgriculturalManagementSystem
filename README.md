# SIGA - Sistema de Gestión Agrícola

SIGA es una aplicación web orientada a la gestión agrícola de fincas bananeras y de plátano, con enfoque en operación, trazabilidad, inventario, alertas y reportes.

Este repositorio incluye:
- Frontend en React + Vite + Tailwind con una interfaz profesional para admin y trabajador de campo.
- Estructura de backend Laravel 11 para migraciones, modelos y endpoints de negocio.
- Diseño PWA-ready con sincronización offline para uso rural.

## Stack
- Frontend: React 19 + Vite + TypeScript + Tailwind CSS
- Backend base: Laravel 11 (migraciones y API stubs)
- Persistencia: MySQL / Laravel Eloquent
- Offline: Service Worker + IndexedDB + cola de sincronización
- Reportes: PDF con Dompdf (preparado)

## Instalación rápida del frontend
1. npm install
2. npm run dev
3. abrir http://localhost:5173

## Estructura principal
- src/App.tsx: UI SIGA completa
- src/index.css: estilos y diseño visual corporativo
- public/sw.js: service worker base
- backend/laravel: base de Laravel 11 con migraciones/modelos/controladores para backend

## Modo producción / Laravel
Se prepara la estructura para arrancar con XAMPP y Laravel 11:
1. composer install
2. cp .env.example .env
3. configurar DB_DATABASE=siga_db, DB_USERNAME=root, DB_PASSWORD=
4. php artisan key:generate
5. php artisan migrate --seed
6. php artisan storage:link
7. php artisan schedule:work

## Roles
- Administrador: gestión total de lotes, insumos, calendario, usuarios y reportes.
- Trabajador de campo: registro móvil de aplicaciones y cosechas, trabajo offline y sincronización.

## Offline / sincronización
- El frontend guarda registros locales y los envía cuando la conexión regresa.
- El backend se deja preparado para recibir `POST /api/aplicaciones` y `POST /api/cosechas`.

## Estado
La implementación actual incluye:
- Dashboard administrativo responsivo
- Módulos de lotes, calendario, insumos, cosechas, reportes y usuarios
- Vista móvil para trabajador de campo
- PWA/service worker ready
- Base Laravel para migraciones y lógica de negocio
