<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>@yield('title', 'SIGA')</title>
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="stylesheet" href="/css/app.css">
  <script>if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(()=>{}); }); }</script>
</head>
<body>
  <header style="background:#064e3b;color:white;padding:12px;">
    <div style="max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;">
      <div><strong>SIGA</strong> - Sistema de Gestión Agrícola</div>
      <div>
        @auth
          {{ auth()->user()->nombre }} ({{ auth()->user()->rol }})
        @endauth
      </div>
    </div>
  </header>
  <main style="max-width:1100px;margin:18px auto;">
    @if(session('success')) <div style="padding:10px;background:#dff0d8;color:#3c763d;border-radius:6px;margin-bottom:12px;">{{ session('success') }}</div> @endif
    @yield('content')
  </main>
</body>
</html>
