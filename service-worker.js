self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('savemore-cache-v1').then(cache => {
            return cache.addAll([
                'index.html',
                'manifest.json',
                'icons/icon-192x192.png',
                'icons/icon-512x512.png'
            ]);
        }).then(() => self.skipWaiting()) // Forces the service worker to take control
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== 'savemore-cache-v1')
                    .map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
