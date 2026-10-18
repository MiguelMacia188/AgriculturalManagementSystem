// Register service worker from Blade
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('SW registered', reg);
  }).catch(err => console.warn('SW register failed', err));
}
