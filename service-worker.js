/* ==========================================
   AMIGOS DEL CIELO
   SERVICE WORKER
========================================== */

const CACHE_NAME = "amigos-del-cielo-v26";

const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",
    "./data/novenas.json",
    "./data/san-jose.json",
    "./data/san-antonio-de-padua.json",
    "./data/san-agustin-de-hipona.json",
    "./data/san-benito-abad.json",
    "./data/san-francisco-de-asis.json",
    "./data/san-ignacio-de-loyola.json",
    "./data/san-juan-bosco.json",
    "./data/san-juan-bautista.json",
    "./data/san-martin-de-porres.json",
    "./data/san-pio-de-pietrelcina.json",
    "./data/san-pedro-claver.json",
    "./data/san-camilo-de-lelis.json",
    "./data/san-carlo-acutis.json",
    "./data/san-cayetano.json",
    "./data/san-expedito.json",
    "./data/san-jose-gregorio-hernandez.json",
    "./data/san-josemaria-escriva.json",
    "./data/san-judas-tadeo.json",
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
    "./js/services/reminderService.js",
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
    "./js/render/home/participa.js",
    "./js/render/home/acerca.js",
    "./js/router.js",
    "./js/app.js",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png",
    "./assets/icons/logosin.png",
    "./assets/images/santos/beata_clara_fey.webp",
    "./assets/images/santos/divina_misericordia.webp",
    "./assets/images/santos/espiritu_santo.webp",
    "./assets/images/santos/nino_jesus.webp",
    "./assets/images/santos/sagrado_corazon_de_jesus.webp",
    "./assets/images/santos/san_agustin_de_hipona.webp",
    "./assets/images/santos/san_antonio_de_padua.webp",
    "./assets/images/santos/san_benito_abad.webp",
    "./assets/images/santos/san_camilo_de_lelis.webp",
    "./assets/images/santos/san_carlo_acutis.webp",
    "./assets/images/santos/san_cayetano.webp",
    "./assets/images/santos/san_expedito.webp",
    "./assets/images/santos/san_francisco_de_asis.webp",
    "./assets/images/santos/san_ignacio_de_loyola.webp",
    "./assets/images/santos/san_jose.webp",
    "./assets/images/santos/san_jose_gregorio_hernandez.webp",
    "./assets/images/santos/san_jose_maria_escriva.webp",
    "./assets/images/santos/san_juan_bautista.webp",
    "./assets/images/santos/san_juan_bosco.webp",
    "./assets/images/santos/san_judas_tadeo.webp",
    "./assets/images/santos/san_martin_de_porres.webp",
    "./assets/images/santos/san_pedro_claver.webp",
    "./assets/images/santos/san_pier_giorgio_frassati.webp",
    "./assets/images/santos/san_pio_de_pieltrecina.webp",
    "./assets/images/santos/santa_catalina_de_siena.webp",
    "./assets/images/santos/santa_eduviges.webp",
    "./assets/images/santos/santa_faustina_kowalska.webp",
    "./assets/images/santos/santa_filomena.webp",
    "./assets/images/santos/santa_gelma_galgani.webp",
    "./assets/images/santos/santa_laura_montoya.webp",
    "./assets/images/santos/santa_margarita_maria_de_alacoque.webp",
    "./assets/images/santos/santa_rita_de_casia.webp",
    "./assets/images/santos/santa_rosa_de_lima.webp",
    "./assets/images/santos/santa_teresa_de_avila.webp",
    "./assets/images/santos/santa_teresa_de_jesus.webp",
    "./assets/images/santos/santa_teresita_de_lisieux.webp",
    "./assets/images/santos/santo_tomas_aquino.webp",
    "./assets/images/santos/santos_arcangeles_miguel_gabriel_rafael.webp",
    "./assets/images/santos/santos_cosme_y_damian.webp",
    "./assets/images/santos/senor_de_los_milagros_de_buga.webp",
    "./assets/images/santos/virgen_de_guadalupe.webp",
    "./assets/images/santos/virgen_del_carmen.webp",
    "./assets/images/santos/virgen_fatima.webp",
    "./assets/images/santos/virgen_inmaculada_concepcion_lourdes.webp",
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

self.addEventListener("notificationclick", event => {
    const novenaId = event.notification?.data?.novenaId;

    event.notification.close();

    if (!novenaId) {
        return;
    }

    event.waitUntil(
        self.clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(clients => {
            const cliente = clients[0];

            if (cliente) {
                cliente.postMessage({
                    type: "open-novena",
                    novenaId
                });

                return cliente.focus();
            }

            return self.clients.openWindow(
                "./?novena=" +
                encodeURIComponent(novenaId)
            );
        })
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request)
            .then(cached => {
                const network = fetch(event.request)
                    .then(response => {
                        if (response && response.ok) {
                            const clone = response.clone();

                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, clone));
                        }

                        return response;
                    })
                    .catch(() => cached);

                return cached || network;
            })
    );
});
