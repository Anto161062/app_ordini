self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('app-ordine-cache').then(cache => {
            return cache.addAll([
                '/index.html',
                '/css/style.css',
                '/js/app.js',
                '/immagini/vigna_rossa.png',
                // Aggiungi qui altre risorse da cache
            ]);
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
