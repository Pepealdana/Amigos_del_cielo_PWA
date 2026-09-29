self.addEventListener("message", event => {
    if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

/* ==========================================
   AMIGOS DEL CIELO
   SERVICE WORKER
========================================== */

const CACHE_NAME = "amigos-del-cielo-v304";

const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",
    "./data/san-juan-pablo-ii.json",
    "./data/san-maximiliano-maria-kolbe.json",
    "./data/santa-monica.json",
    "./data/santa-bernardita-soubirous.json",
    "./data/santa-clara-de-asis.json",
    "./data/san-charbel-makhlouf.json",
    "./data/santa-marta-de-betania.json",
    "./data/santa-teresa-de-calcuta.json",
    "./data/san-francisco-javier.json",
    "./data/san-luis-gonzaga.json",
    "./data/santa-lucia-de-siracusa.json",
    "./data/santa-cecilia.json",
    "./data/santa-barbara.json",
    "./data/san-roque.json",
    "./data/san-pancracio.json",
    "./data/san-patricio.json",
    "./data/san-pedro-apostol.json",
    "./data/san-pablo-apostol.json",
    "./data/santiago-apostol.json",
    "./data/roadmap-hispanohablante.json",
    "./data/catalogo-expansion-hispanohablante.json",
    "./data/catalog/santos.json",
    "./data/catalog/beatos.json",
    "./data/catalog/maria.json",
    "./data/catalog/devociones.json",
    "./data/oraciones.json",
    "./data/catalog/paises.json",
    "./data/beata-clara-fey.json",
    "./data/beata-chiara-luce-badano.json",
    "./data/beato-michael-mcgivney.json",
    "./data/beato-padre-marianito.json",
    "./data/beato-ceferino-namuncura.json",
    "./data/beata-ana-de-los-angeles-monteagudo.json",
    "./data/beata-laura-vicuna.json",
    "./data/beata-guadalupe-ortiz-de-landazuri.json",
    "./data/divina-misericordia.json",
    "./data/espiritu-santo.json",
    "./data/sagrado-corazon-de-jesus.json",
    "./data/divino-nino-jesus.json",
    "./data/santos-arcangeles.json",
    "./data/santos-cosme-y-damian.json",
    "./data/senor-de-los-milagros-de-buga.json",
    "./data/senor-de-los-milagros-peru.json",
    "./data/virgen-de-guadalupe.json",
    "./data/virgen-del-carmen.json",
    "./data/virgen-de-fatima.json",
    "./data/virgen-de-lourdes.json",
    "./data/santo-tomas-de-aquino.json",
    "./data/santa-margarita-maria-alacoque.json",
    "./data/san-jose.json",
    "./data/san-antonio-de-padua.json",
    "./data/san-agustin-de-hipona.json",
    "./data/san-benito-abad.json",
    "./data/san-francisco-de-asis.json",
    "./data/san-ignacio-de-loyola.json",
    "./data/san-juan-bosco.json",
        "./data/santo-domingo-savio.json",
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
    "./data/san-pier-giorgio-frassati.json",
    "./data/santa-rita-de-casia.json",
    "./data/santa-rosa-de-lima.json",
    "./data/santa-teresa-de-avila.json",
    "./data/santa-teresita-de-lisieux.json",
    "./data/santa-catalina-de-siena.json",
    "./data/santa-eduviges.json",
    "./data/santa-faustina-kowalska.json",
    "./data/santa-filomena.json",
    "./data/santa-gemma-galgani.json",
    "./data/santa-laura-montoya.json",
    "./data/san-juan-macias.json",
    "./data/santa-teresa-de-jesus-de-los-andes.json",
    "./data/san-alberto-hurtado.json",
    "./data/san-jose-gabriel-del-rosario-brochero.json",
    "./data/santa-carmen-rendiles-martinez.json",
    "./data/virgen-de-lujan.json",
    "./data/nuestra-senora-de-la-dulce-espera.json",
    "./data/nuestra-senora-del-perpetuo-socorro.json",
    "./data/virgen-de-chiquinquira.json",
    "./data/virgen-de-coromoto.json",
    "./data/virgen-de-suyapa.json",
    "./data/virgen-de-la-caridad-del-cobre.json",
    "./data/virgen-de-el-quinche.json",
    "./data/virgen-de-caacupe.json",
    "./data/virgen-de-la-merced.json",
    "./data/virgen-de-la-altagracia.json",
    "./data/virgen-de-copacabana.json",
    "./data/santa-maria-la-antigua.json",
    "./data/nuestra-senora-reina-de-la-paz.json",
    "./data/nuestra-senora-de-los-angeles.json",
    "./data/la-purisima.json",
    "./data/nuestra-senora-de-la-divina-providencia.json",
    "./data/virgen-de-los-treinta-y-tres.json",
    "./data/nuestra-senora-del-pilar.json",
    "./data/nuestra-senora-de-la-almudena.json",
    "./data/nuestra-senora-de-los-desamparados.json",
    "./data/nuestra-senora-de-la-candelaria.json",
    "./data/nuestra-senora-del-rosario-de-las-lajas.json",
    "./data/nuestra-senora-del-valle.json",
    "./data/nuestra-senora-del-rosario-de-chiquinquira-de-maracaibo.json",
    "./data/nuestra-senora-de-el-cisne.json",
    "./data/nuestra-senora-del-rosario-de-andacollo.json",
    "./data/nuestra-senora-de-covadonga.json",
    "./data/nuestra-senora-de-montserrat.json",
    "./data/nuestra-senora-del-rocio.json",
    "./data/san-juan-diego.json",
    "./data/san-jose-sanchez-del-rio.json",
    "./data/san-pedro-de-san-jose-de-betancur.json",
    "./data/san-oscar-romero.json",
    "./data/santa-mariana-de-jesus.json",
    "./data/santo-toribio-de-mogrovejo.json",
    "./css/style.css",
    "./css/01-base.css",
    "./css/02-layout.css",
    "./css/03-components.css",
    "./css/04-utilities.css",
    "./css/05-themes.css",
    "./css/06-pwa.css",
    "./css/07-design-system-v15.css",
        "./css/08-visual-v15.css",
    "./js/config/appConfig.js",
    "./js/state/state.js",
    "./js/services/storage.js",
    "./js/services/progressService.js",
    "./js/services/dataService.js",
    "./js/services/oracionesService.js",
    "./js/services/bibliotecaService.js",
    "./js/services/shareService.js",
    "./js/services/searchService.js",
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
    "./js/render/home/catalogo.js",
    "./js/render/home/favoritas.js",
    "./js/render/home/camino.js?v=298",
    "./js/render/home/progreso.js",
    "./js/render/home/configuracion.js",
    "./js/render/home/participa.js",
    "./js/render/home/acerca.js",
    "./js/router.js",
    "./js/app.js",
    "./assets/branding/isotipo-amigos-del-cielo.webp?v=285",
    "./assets/images/santos/beata_clara_fey.webp",
    "./assets/images/santos/beata_chiara_luce_badano.webp",
    "./assets/images/santos/beato_michael_mcgivney.webp",
    "./assets/images/santos/beato_padre_marianito.webp",
    "./assets/images/santos/beato_ceferino_namuncura.webp",
    "./assets/images/santos/beata_ana_de_los_angeles_monteagudo.webp",
    "./assets/images/santos/beata_laura_vicuña.webp",
    "./assets/images/santos/beata_guadalupe_ortiz_de_landazuri.webp",
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
    "./assets/images/santos/santa_teresita_de_lisieux.webp",
    "./assets/images/santos/santo_tomas_aquino.webp",
    "./assets/images/santos/santos_arcangeles_miguel_gabriel_rafael.webp",
    "./assets/images/santos/santos_cosme_y_damian.webp",
    "./assets/images/santos/senor_de_los_milagros_de_buga.webp",
    "./assets/images/santos/virgen_de_guadalupe.webp",
    "./assets/images/santos/virgen_del_carmen.webp",
    "./assets/images/santos/virgen_fatima.webp",
    "./assets/images/santos/virgen_inmaculada_concepcion_lourdes.webp",
    "./assets/images/santos/san_jose_sanchez_del_rio.webp",
    "./assets/images/santos/san_pedro_de_san_jose_de_betancur.webp",
    "./assets/images/santos/san_oscar_romero.webp",
    "./assets/images/santos/santa_mariana_de_jesus.webp",
    "./assets/images/santos/santo_toribio_de_mogrovejo.webp",
    "./assets/images/santos/san_juan_macias.webp",
    "./assets/images/santos/santa_teresa_de_jesus_de_los_andes.webp",
    "./assets/images/santos/san_alberto_hurtado.webp",
    "./assets/images/santos/san_jose_gabriel_del_rosario_brochero.webp",
    "./assets/images/santos/santa_carmen_rendiles_martinez.webp",
    "./assets/images/santos/san_juan_pablo_ii.webp",
    "./assets/images/santos/san_maximiliano_maria_kolbe.webp",
    "./assets/images/santos/santa_monica.webp",
    "./assets/images/santos/santa_bernardita_soubirous.webp",
    "./assets/images/santos/santa_clara_de_asis.webp",
    "./assets/images/santos/san_charbel_makhlouf.webp",
    "./assets/images/santos/santa_marta_de_betania.webp",
    "./assets/images/santos/santa_teresa_de_calcuta.webp",
    "./assets/images/santos/san_francisco_javier.webp",
    "./assets/images/santos/san_luis_gonzaga.webp",
    "./assets/images/santos/santa_lucia_de_siracusa.webp",
    "./assets/images/santos/santa_cecilia.webp",
    "./assets/images/santos/santa_barbara.webp",
    "./assets/images/santos/san_roque.webp",
    "./assets/images/santos/san_pancracio.webp",
    "./assets/images/santos/san_patricio.webp",
    "./assets/images/santos/san_pedro_apostol.webp",
    "./assets/images/santos/san_pablo_apostol.webp",
    "./assets/images/santos/santiago_apostol.webp",
    "./assets/images/santos/santo_domingo_savio.webp",
    "./assets/images/santos/san_juan_diego.webp",
    "./assets/images/santos/virgen_de_coromoto.webp",
    "./assets/images/santos/virgen_de_suyapa.webp",
    "./assets/images/santos/virgen_de_la_caridad_del_cobre.webp",
    "./assets/images/santos/virgen_de_el_quinche.webp",
    "./assets/images/santos/virgen_de_caacupe.webp",
    "./assets/images/santos/virgen_de_la_merced.webp",
    "./assets/images/santos/virgen_de_la_altagracia.webp",
    "./assets/images/santos/virgen_de_copacabana.webp",
    "./assets/images/santos/santa_maria_la_antigua.webp",
    "./assets/images/santos/nuestra_senora_reina_de_la_paz.webp",
    "./assets/images/santos/nuestra_senora_de_los_angeles.webp",
    "./assets/images/santos/la_purisima.webp",
    "./assets/images/santos/nuestra_senora_de_la_divina_providencia.webp",
    "./assets/images/santos/virgen_de_los_treinta_y_tres.webp",
    "./assets/images/santos/nuestra_senora_del_pilar.webp",
    "./assets/images/santos/nuestra_senora_de_la_almudena.webp",
    "./assets/images/santos/nuestra_senora_de_los_desamparados.webp",
    "./assets/images/santos/nuestra_senora_de_la_candelaria.webp",
    "./assets/images/santos/nuestra_senora_del_rosario_de_las_lajas.webp",
    "./assets/images/santos/nuestra_senora_del_valle.webp",
    "./assets/images/santos/virgen_de_chiquinquira.webp",
    "./assets/images/santos/nuestra_senora_del_rosario_de_chiquinquira_de_maracaibo.webp",
    "./assets/images/santos/nuestra_senora_de_el_cisne.webp",
    "./assets/images/santos/nuestra_senora_del_rosario_de_andacollo.webp",
    "./assets/images/santos/nuestra_senora_de_covadonga.webp",
    "./assets/images/santos/nuestra_senora_de_montserrat.webp",
    "./assets/images/santos/nuestra_senora_del_rocio.webp",
    "./assets/images/santos/virgen_de_lujan.webp",
    "./assets/images/santos/senor_de_los_milagros_peru.webp",
    "./assets/images/santos/virgen_del_perpetuo_socorro.webp",
    "./assets/images/santos/virgen_de_la_dulce_espera.webp",
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

    /*
     * Las navegaciones de una SPA pueden incluir query params
     * que no coinciden literalmente con la copia de index.html.
     * En offline, siempre se utiliza el App Shell como fallback.
     */
    if (event.request.mode === "navigate") {

        const appShell = caches.match(
            new URL("./index.html", self.location).href
        );

        event.respondWith(
            fetch(event.request)
                .then(response => {

                    if (response && response.ok) {
                        const clone = response.clone();

                        event.waitUntil(
                            caches.open(CACHE_NAME)
                                .then(cache =>
                                    cache.put(
                                        new URL(
                                            "./index.html",
                                            self.location
                                        ).href,
                                        clone
                                    )
                                )
                        );
                    }

                    return response;

                })
                .catch(() => appShell)
        );

        return;
    }

    /*
     * Los JSON son contenido de datos.
     *
     * Si ya existe una copia en caché, se entrega inmediatamente
     * para que la interfaz no dependa de la latencia de red.
     * En paralelo se consulta la versión actual y se actualiza
     * el caché para la siguiente apertura.
     *
     * Si no existe una copia, se espera a la red y se guarda
     * el resultado para usos posteriores y funcionamiento offline.
     */
    if (url.pathname.endsWith(".json")) {

        const cachedPromise = caches.match(event.request);

        const networkPromise = fetch(event.request)
            .then(response => {

                if (response && response.ok) {
                    const clone = response.clone();

                    return caches.open(CACHE_NAME)
                        .then(cache =>
                            cache.put(event.request, clone)
                        )
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

    /*
     * HTML, CSS, JS y manifest usan network-first cuando hay conexión.
     * Así una publicación nueva de GitHub Pages no queda bloqueada
     * indefinidamente por una copia antigua del App Shell.
     * Si no hay red, se conserva el funcionamiento offline desde caché.
     */
    const esRecursoDeInterfaz =
        url.pathname.endsWith(".html") ||
        url.pathname.endsWith(".css") ||
        url.pathname.endsWith(".js") ||
        url.pathname.endsWith(".json") ||
        url.pathname.endsWith("manifest.json");

    if (esRecursoDeInterfaz) {

        const cachedPromise = caches.match(event.request);

        const networkPromise = fetch(event.request)
            .then(response => {

                if (response && response.ok) {
                    const clone = response.clone();

                    return caches.open(CACHE_NAME)
                        .then(cache =>
                            cache.put(event.request, clone)
                        )
                        .then(() => response);
                }

                return response;

            });

        event.respondWith(
            networkPromise.catch(() =>
                cachedPromise
            )
        );

        return;
    }

    /*
     * Imágenes y demás recursos binarios mantienen cache-first.
     */
    event.respondWith(
        caches.match(event.request)
            .then(cached => {

                if (cached) {
                    return cached;
                }

                return fetch(event.request)
                    .then(response => {

                        if (response && response.ok) {
                            const clone = response.clone();

                            caches.open(CACHE_NAME)
                                .then(cache =>
                                    cache.put(event.request, clone)
                                );
                        }

                        return response;

                    });

            })
            .catch(() =>
                caches.match(event.request)
            )
    );
});
