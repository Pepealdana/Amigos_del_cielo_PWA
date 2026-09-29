/* ==========================================
   AMIGOS DEL CIELO
   SERVICE WORKER
========================================== */

const CACHE_NAME = "amigos-del-cielo-v263";

const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",
    "./assets/branding/isotipo-splash.svg",
    "./assets/branding/isotipo-amigos-del-cielo.webp",
    "./assets/branding/logo-horizontal-amigos-del-cielo.webp",
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) return;

    if (url.pathname.endsWith(".json")) {
        const cachedPromise = caches.match(event.request);

        const networkPromise = fetch(event.request)
            .then(response => {
                if (response && response.ok) {
                    const clone = response.clone();

                    return caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, clone))
                        .then(() => response);
                }

                return response;
            });

        event.respondWith(
            cachedPromise.then(cached => {
                if (cached) {
                    event.waitUntil(
                        networkPromise.catch(() => null)
                    );

                    return cached;
                }

                return networkPromise.catch(() =>
                    caches.match(event.request)
                );
            })
        );

        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cached => {
                const network = fetch(event.request)
                    .then(response => {
                        if (response && response.ok) {
                            const clone = response.clone();

                            caches.open(CACHE_NAME)
                                .then(cache =>
                                    cache.put(event.request, clone)
                                );
                        }

                        return response;
                    })
                    .catch(() => cached);

                return cached || network;
            })
    );
});
