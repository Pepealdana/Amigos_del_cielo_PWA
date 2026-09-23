/* ==========================================
   AMIGOS DEL CIELO
   SERVICE WORKER
========================================== */

const CACHE_NAME = "amigos-del-cielo-v2";

const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",
    "./css/style.css",
    "./css/01-base.css",
    "./css/02-layout.css",
    "./css/03-components.css",
    "./css/04-utilities.css",
    "./css/05-themes.css",
    "./css/06-pwa.css",
    "./js/config/appConfig.js",
    "./js/state/state.js",
    "./js/services/storage.js",
    "./js/services/dataService.js",
    "./js/utils/constants.js",
    "./js/utils/dateUtils.js",
    "./js/utils/domUtils.js",
    "./js/utils/formatUtils.js",
    "./js/utils/searchUtils.js",
    "./js/utils/validators.js",
    "./js/render/shared/button.js",
    "./js/render/shared/badge.js",
    "./js/render/shared/card.js",
    "./js/render/shared/chip.js",
    "./js/render/shared/divider.js",
    "./js/render/shared/emptyState.js",
    "./js/render/shared/header.js",
    "./js/render/shared/intenciones.js",
    "./js/render/shared/lista.js",
    "./js/render/shared/loader.js",
    "./js/render/shared/modal.js",
    "./js/render/shared/oracion.js",
    "./js/render/novena/componentes.js",
    "./js/render/novena/portada.js",
    "./js/render/novena/historia.js",
    "./js/render/novena/dia.js",
    "./js/render/novena/oraciones.js",
    "./js/render/novena/intenciones.js",
    "./js/render/novena/agradecimiento.js",
    "./js/render/home/inicio.js",
    "./js/render/home/biblioteca.js",
    "./js/render/home/favoritas.js",
    "./js/render/home/progreso.js",
    "./js/render/home/configuracion.js",
    "./js/render/home/acerca.js",
    "./js/router.js",
    "./js/app.js",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png",
    "./assets/icons/logosin.png"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache =>
                cache.addAll(APP_SHELL)
            )
            .then(() =>
                self.skipWaiting()
            )
    );
});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(keys =>
                Promise.all(
                    keys
                        .filter(key =>
                            key !== CACHE_NAME
                        )
                        .map(key =>
                            caches.delete(key)
                        )
                )
            )
            .then(() =>
                self.clients.claim()
            )
    );
});

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {
        return;
    }

    const url =
        new URL(event.request.url);

    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(

        caches.match(event.request)
            .then(cached => {

                const network =
                    fetch(event.request)
                        .then(response => {

                            if (
                                response &&
                                response.ok
                            ) {
                                const clone =
                                    response.clone();

                                caches
                                    .open(CACHE_NAME)
                                    .then(cache =>
                                        cache.put(
                                            event.request,
                                            clone
                                        )
                                    );
                            }

                            return response;
                        })
                        .catch(() => cached);

                return cached || network;
            })
    );
});