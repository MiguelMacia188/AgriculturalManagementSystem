// resources/js/pwa-sync.js

const DB_NAME = 'siga_offline_db';
const DB_VERSION = 1;
const STORE_QUEUE = 'queue';

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (ev) => {
      const db = ev.target.result;
      if (!db.objectStoreNames.contains(STORE_QUEUE)) {
        db.createObjectStore(STORE_QUEUE, { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function enqueue(record) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_QUEUE, 'readwrite');
    const store = tx.objectStore(STORE_QUEUE);
    store.add(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllQueue() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_QUEUE, 'readonly');
    const store = tx.objectStore(STORE_QUEUE);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function clearItem(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_QUEUE, 'readwrite');
    const store = tx.objectStore(STORE_QUEUE);
    store.delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function base64ToBlob(base64) {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}

export async function processQueue() {
  const items = await getAllQueue();
  for (const item of items) {
    try {
      let options = {
        method: 'POST',
        credentials: 'include',
        headers: {}
      };

      if (item.type === 'aplicacion') {
        if (item.evidencia_base64) {
          const form = new FormData();
          form.append('producto_insumo_id', item.producto_insumo_id);
          form.append('fecha', item.fecha);
          form.append('dosis', item.dosis);
          form.append('responsable', item.responsable);
          if (item.calendario_aplicacion_id) form.append('calendario_aplicacion_id', item.calendario_aplicacion_id);
          const blob = base64ToBlob(item.evidencia_base64);
          form.append('evidencia', blob, 'evidencia.jpg');
          options.body = form;
        } else {
          options.headers['Content-Type'] = 'application/json';
          options.body = JSON.stringify(item);
        }
        const res = await fetch('/api/aplicaciones', options);
        if (!res.ok) throw new Error('Error al sincronizar aplicacion');
      }

      if (item.type === 'cosecha') {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(item);
        const res = await fetch('/api/cosechas', options);
        if (!res.ok) throw new Error('Error al sincronizar cosecha');
      }

      await clearItem(item.id);
    } catch (err) {
      console.error('Sync error for item', item, err);
    }
  }
}

window.addEventListener('online', () => {
  console.info('Conexión restaurada — procesando cola offline');
  processQueue();
});
