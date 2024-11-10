// service-worker.js

const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/public/index.html', // Asegúrate de agregar todas las rutas necesarias
  '/public/dist/styles.css',
  '/path/to/your/image1.png',
  '/path/to/your/image2.png'
];

// Instala el Service Worker y guarda en caché los recursos específicos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepta las solicitudes de red y devuelve los recursos en caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso está en caché, lo devuelve
      if (response) {
        return response;
      }
      // Si no está en caché, realiza una solicitud de red
      return fetch(event.request).then((response) => {
        // Verifica si la respuesta es válida antes de guardarla en la caché
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        // Clona la respuesta y la guarda en caché
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});

// Actualiza el Service Worker y limpia el caché obsoleto
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
