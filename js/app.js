/* ==========================================
   APP
   Amigos del Cielo
   Parte 1 de 4
========================================== */

/* ==========================================
   INICIALIZACIÓN
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    iniciarApp

);

/* ==========================================
   INICIAR APLICACIÓN
========================================== */

async function iniciarApp() {

    try {

        registrarEventos();

        inicializarStorage();

        aplicarPreferenciasVisuales();
        escucharPreferenciaSistema();

        if (!navigator.onLine) {
            mostrarEstadoConexion(false);
        }

        solicitarPersistenciaStorage();

        await cargarCatalogo();

        const novenaSolicitada =
            new URLSearchParams(
                window.location.search
            ).get("novena");

        if (
            novenaSolicitada &&
            buscarNovenaPorId(
                state.catalogo,
                novenaSolicitada
            )
        ) {
            abrirNovena(novenaSolicitada);
        } else {
            mostrarInicio();
        }

    }

    catch (error) {

        console.error(

            "Error iniciando la aplicación:",

            error

        );

        mostrarError(

            "No fue posible iniciar la aplicación."

        );

    }

}

/* ==========================================
   REGISTRO DE EVENTOS
========================================== */

function registrarEventos() {

    registrarEvento(

        "btn-menu",

        alternarMenu

    );

    registrarEvento(

        "menu-overlay",

        cerrarMenu

    );

    registrarEvento(

        "menu-inicio",

        () => navegar("inicio")

    );

    registrarEvento(

        "menu-biblioteca",

        () => navegar("biblioteca")

    );

    registrarEvento(

        "menu-favoritas",

        () => navegar("favoritas")

    );

    registrarEvento(

        "menu-progreso",

        () => navegar("progreso")

    );

    registrarEvento(

        "menu-configuracion",

        () => navegar("configuracion")

    );

    registrarEvento(

        "menu-participa",

        () => navegar("participa")

    );

    registrarEvento(

        "menu-acerca",

        () => navegar("acerca")

    );

    registrarEvento(

        "btn-header-settings",

        () => navegar("configuracion")

    );

    window.addEventListener(
        "online",
        () => mostrarEstadoConexion(true)
    );

    window.addEventListener(
        "offline",
        () => mostrarEstadoConexion(false)
    );

}

/* ==========================================
   REGISTRAR EVENTO
========================================== */

function registrarEvento(

    id,

    callback

) {

    const elemento =

        document.getElementById(id);

    if (!elemento) {

        return;

    }

    elemento.addEventListener(

        "click",

        callback

    );

}

/* ==========================================
   MENÚ LATERAL
========================================== */

function alternarMenu() {

    document

        .getElementById("side-menu")

        ?.classList.toggle("open");

    document

        .getElementById("menu-overlay")

        ?.classList.toggle("show");

}

function abrirMenu() {

    document

        .getElementById("side-menu")

        ?.classList.add("open");

    document

        .getElementById("menu-overlay")

        ?.classList.add("show");

}

function cerrarMenu() {

    document

        .getElementById("side-menu")

        ?.classList.remove("open");

    document

        .getElementById("menu-overlay")

        ?.classList.remove("show");

}
function mostrarEstadoConexion(online) {
    const indicador =
        document.getElementById("connection-status");

    if (!indicador) {
        return;
    }

    indicador.textContent = online
        ? "Con conexión"
        : "Sin conexión · contenido disponible";

    indicador.classList.toggle("online", online);
    indicador.classList.toggle("offline", !online);
    indicador.hidden = false;
    indicador.classList.add("show");

    window.clearTimeout(
        mostrarEstadoConexion.temporizador
    );

    if (online) {
        mostrarEstadoConexion.temporizador =
            window.setTimeout(() => {
                indicador.classList.remove("show");
            }, 2200);
    }
}

/* ==========================================
   NAVEGACIÓN PRINCIPAL
========================================== */

function mostrarInicio() {

    cerrarMenu();

    actualizarTituloPagina(

        "Inicio"

    );

    renderizar(

        renderInicio(

            state.catalogo,

            state.progreso

        )

    );

}

function mostrarBiblioteca() {

    cerrarMenu();

    actualizarTituloPagina(

        "Biblioteca"

    );

    renderizar(

        renderBiblioteca(

            state.catalogo

        )

    );

}

/* ==========================================
   ABRIR NOVENA
========================================== */

async function abrirNovena(id) {

    cerrarMenu();

    try {

        await cargarNovena(id);

        if (!state.novenaActual) {

            throw new Error(

                "No fue posible cargar la novena."

            );

        }

        mostrarPortadaNovena();

    }

    catch (error) {

        console.error(error);

        mostrarError(

            "No fue posible cargar la novena."

        );

    }

}

/* ==========================================
   PORTADA NOVENA
========================================== */

function mostrarPortadaNovena() {

    actualizarTituloPagina(

        state.novenaActual.name

    );

    renderizar(

        renderPortadaNovena(

            state.novenaActual

        )

    );

}

/* ==========================================
   HISTORIA
========================================== */

function mostrarHistoria() {

    actualizarTituloPagina(

        "Historia"

    );

    renderizar(

        renderHistoria(

            state.novenaActual

        )

    );

}

/* ==========================================
   INICIAR NOVENA
========================================== */

function iniciarNovena() {

    if (!state.novenaActual) {
        return;
    }

    const progresoActual =
        state.progreso[state.novenaActual.id];

    if (progresoActual?.completada) {
        reiniciarYComenzarNovena(state.novenaActual.id);
        return;
    }

    const diaInicial =
        obtenerDiaInicialPorCalendario(
            state.novenaActual
        );

    mostrarDia(
        diaInicial || 1
    );

}

function finalizarNovenaActual() {

    if (!state.novenaActual) {
        return;
    }

    finalizarNovena(state.novenaActual.id);
    state.diaActual = 9;

    actualizarTituloPagina("Novena finalizada");

    renderizar(
        renderAgradecimiento(state.novenaActual)
    );
}

function reiniciarYComenzarNovena(id) {

    if (!id) {
        return;
    }

    reiniciarNovena(id);

    abrirNovena(id).then(() => {

        if (!state.novenaActual) {
            return;
        }

        state.diaActual = 1;
        mostrarDia(1);

    });
}

/* ==========================================
   FAVORITAS
========================================== */

function mostrarFavoritas() {

    cerrarMenu();

    actualizarTituloPagina(

        "Favoritas"

    );

    renderizar(

        renderFavoritas(

            state.catalogo,

            state.favoritos

        )

    );

}

/* ==========================================
   PROGRESO
========================================== */

function mostrarProgreso() {

    cerrarMenu();

    actualizarTituloPagina(

        "Mi progreso"

    );

    renderizar(

        renderProgreso(

            state.catalogo,

            state.progreso

        )

    );

}

/* ==========================================
   CONFIGURACIÓN
========================================== */

function mostrarConfiguracion() {

    cerrarMenu();

    actualizarTituloPagina(

        "Configuración"

    );

    renderizar(

        renderConfiguracion()

    );

}

/* ==========================================
   ACERCA DE
========================================== */

function mostrarParticipa() {

    cerrarMenu();

    actualizarTituloPagina(

        "Participa"

    );

    renderizar(

        renderParticipa()

    );

}

function mostrarAcerca() {

    cerrarMenu();

    actualizarTituloPagina(

        "Acerca de"

    );

    renderizar(

        renderAcerca()

    );

}

/* ==========================================
   DÍAS DE LA NOVENA
========================================== */

function mostrarDia(numeroDia) {

    state.diaActual = numeroDia;

    const dia =

        obtenerDia(numeroDia);

    if (!dia) {

        mostrarError(

            "No existe ese día de la novena."

        );

        return;

    }

    actualizarProgreso(

        state.novenaActual.id,

        numeroDia

    );

    actualizarTituloPagina(

        `Día ${numeroDia}`

    );

    renderizar(

        renderDia(

            state.novenaActual,

            numeroDia

        )

    );

}

/* ==========================================
   NAVEGACIÓN ENTRE DÍAS
========================================== */

function siguienteDia() {

    const siguiente =
        state.diaActual + 1;

    if (
        siguiente <= obtenerTotalDiasNovena() &&
        obtenerDia(siguiente)
    ) {
        mostrarDia(siguiente);
    }

}

function anteriorDia() {

    const anterior =
        state.diaActual - 1;

    if (anterior >= 1) {
        mostrarDia(anterior);
    }

}
/* ==========================================
   RENDERIZADO
========================================== */

function renderizar(html) {

    const view = obtenerView();

    view.innerHTML = html;

}

/* ==========================================
   OBTENER CONTENEDOR PRINCIPAL
========================================== */

function obtenerView() {

    const view =

        document.getElementById(

            "view"

        );

    if (!view) {

        throw new Error(

            "No existe el contenedor #view."

        );

    }

    return view;

}

/* ==========================================
   MENSAJES DE ERROR
========================================== */

function mostrarError(

    mensaje,

    titulo = "Error"

) {

    if (

        typeof renderEmptyState === "function"

    ) {

        renderizar(

            renderEmptyState(

                titulo,

                mensaje

            )

        );

        return;

    }

    renderizar(`

        <section class="home">

            <h2>

                ${titulo}

            </h2>

            <p>

                ${mensaje}

            </p>

        </section>

    `);

}

/* ==========================================
   TÍTULO DE LA PÁGINA
========================================== */

function actualizarTituloPagina(

    titulo

) {

    document.title =

        `${titulo} · ${APP.NAME}`;

}

/* ==========================================
   RECARGAR VISTA ACTUAL
========================================== */

function refrescarVista() {

    navegar(

        router.rutaActual,

        router.datos

    );

}

/* ==========================================
   UTILIDAD
========================================== */

function existeNovenaAbierta() {

    return (

        state.novenaActual !== null

    );

}

/* ==========================================
   UTILIDAD
========================================== */

function existeCatalogo() {

    return (

        Array.isArray(

            state.catalogo

        ) &&

        state.catalogo.length > 0

    );

}

/* ==========================================
   FIN APP
========================================== */

/* ==========================================
   INTERACCIONES PWA
========================================== */

document.addEventListener("click", manejarClicksPWA);
document.addEventListener("input", manejarInputsPWA);

function manejarClicksPWA(evento) {

    const accion = evento.target.closest("[data-action]");

    if (accion) {

        const tipo = accion.dataset.action;
        const id = accion.dataset.id;

        if (tipo === "open-novena" && id) {
            abrirNovena(id);
            return;
        }

        if (tipo === "continue-novena" && id) {
            continuarNovena(id);
            return;
        }

        if (tipo === "next-day") {
            siguienteDia();
            return;
        }

        if (tipo === "previous-day") {
            anteriorDia();
            return;
        }

        if (tipo === "favorite-novena" && id) {
            alternarFavorita(id);
            mostrarPortadaNovena();
            return;
        }

        if (tipo === "start-novena") {
            iniciarNovena();
            return;
        }

        if (tipo === "finish-novena") {
            finalizarNovenaActual();
            return;
        }

        if (tipo === "restart-novena" && id) {
            reiniciarYComenzarNovena(id);
            return;
        }

        if (tipo === "toggle-extended-history") {

            alternarHistoriaExtendida(accion);

            return;
        }

        if (tipo === "text-size" && accion.dataset.size) {
            cambiarTamanoTexto(accion.dataset.size);
            return;
        }

        if (tipo === "theme" && accion.dataset.theme) {
            cambiarTema(accion.dataset.theme);
            return;
        }
    }

    const ruta = evento.target.closest("[data-route]");

    if (ruta) {
        navegar(ruta.dataset.route);
        return;
    }

    const categoria = evento.target.closest("[data-category]");

    if (categoria) {
        filtrarBibliotecaPWA(
            categoria.dataset.category
        );
    }
}

function manejarFormularioParticipa(evento) {

    if (evento.target.id !== "participa-form") {
        return;
    }

    evento.preventDefault();

    const tipo = document.getElementById("participa-tipo")?.value?.trim();
    const nombre = document.getElementById("participa-nombre")?.value?.trim();
    const correo = document.getElementById("participa-correo")?.value?.trim();
    const mensaje = document.getElementById("participa-mensaje")?.value?.trim();

    if (!tipo || !mensaje) {
        mostrarAvisoParticipa("Selecciona un tipo de sugerencia y escribe tu mensaje.");
        return;
    }

    if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mostrarAvisoParticipa("Revisa el correo electrónico ingresado.");
        return;
    }

    const asunto = encodeURIComponent(
        `Amigos del Cielo — ${tipo}`
    );

    const cuerpo = encodeURIComponent(
        [
            "Sugerencia recibida desde Amigos del Cielo.",
            "",
            `Tipo: ${tipo}`,
            `Nombre: ${nombre || "No indicado"}`,
            `Correo: ${correo || "No indicado"}`,
            "",
            "Mensaje:",
            mensaje
        ].join("\n")
    );

    window.location.href =
        `mailto:${APP_CONFIG.correoContacto}?subject=${asunto}&body=${cuerpo}`;

}

function mostrarAvisoParticipa(mensaje) {

    const aviso = document.getElementById("participa-aviso");

    if (!aviso) {
        return;
    }

    aviso.textContent = mensaje;
    aviso.hidden = false;

}

document.addEventListener("submit", manejarFormularioParticipa);

function manejarInputsPWA(evento) {

    if (evento.target.id === "home-search") {

        state.busqueda = evento.target.value;

        mostrarResultadosBusquedaPWA(
            evento.target.value
        );

        return;
    }

    if (evento.target.id === "library-search") {

        state.busqueda = evento.target.value;

        actualizarBibliotecaPWA();
    }
}

function mostrarResultadosBusquedaPWA(texto) {

    const contenedor =
        document.getElementById(
            "home-search-results"
        );

    if (!contenedor) {
        return;
    }

    const termino = texto.trim();

    if (!termino) {
        contenedor.hidden = true;
        contenedor.innerHTML = "";
        return;
    }

    const resultados =
        buscarNovenas(
            state.catalogo,
            termino
        ).slice(0, 5);

    contenedor.innerHTML =
        resultados.length
            ? resultados.map(novena => `
                <button
                    class="search-result"
                    type="button"
                    data-action="open-novena"
                    data-id="${escaparHTML(novena.id)}">

                    <img
                        src="${escaparHTML(novena.image)}"
                        alt=""
                        class="search-result-image"
                        loading="lazy">

                    <span class="search-result-text">

                        <strong class="search-result-name">
                            ${escaparHTML(novena.name)}
                        </strong>

                        <span class="search-result-subtitle">
                            ${escaparHTML(novena.title)}
                        </span>

                        ${obtenerEtiquetasIntervencion(novena, termino)
                            ? `
                                <span class="search-result-meta">
                                    Para: ${escaparHTML(
                                        obtenerEtiquetasIntervencion(
                                            novena,
                                            termino
                                        )
                                    )}
                                </span>
                            `
                            : ""}

                    </span>

                </button>
            `).join("")
            : `
                <div class="search-result">
                    <span class="search-result-text">
                        <strong class="search-result-name">
                            No encontramos esa novena
                        </strong>
                        <span class="search-result-subtitle">
                            Prueba con otro término.
                        </span>
                    </span>
                </div>
            `;

    contenedor.hidden = false;
}

let categoriaBibliotecaPWA = "Todas";

function filtrarBibliotecaPWA(categoria) {

    categoriaBibliotecaPWA =
        categoria || "Todas";

    document
        .querySelectorAll(".library-filter")
        .forEach(boton => {
            boton.classList.toggle(
                "active",
                boton.dataset.category ===
                    categoriaBibliotecaPWA
            );
        });

    actualizarBibliotecaPWA();
}

function actualizarBibliotecaPWA() {

    const contenedor =
        document.getElementById(
            "library-list"
        );

    if (!contenedor) {
        return;
    }

    let resultados =
        filtrarCategoria(
            state.catalogo,
            categoriaBibliotecaPWA
        );

    const termino =
        state.busqueda.trim();

    if (termino) {
        resultados =
            buscarNovenas(
                resultados,
                termino
            );
    }

    contenedor.innerHTML =
        renderListaBiblioteca(
            resultados
        );
}

function continuarNovena(id) {

    const novenaId =
        id || state.ultimaNovenaId;

    if (!novenaId) {
        mostrarInicio();
        return;
    }

    abrirNovena(novenaId)
        .then(() => {

            if (!state.novenaActual) {
                return;
            }

            const dia =
                state.progreso[novenaId]?.dia ||
                obtenerDiaInicialPorCalendario(
                    state.novenaActual
                ) ||
                1;

            mostrarDia(dia);
        });
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            "serviceWorker" in navigator
        ) {
            navigator.serviceWorker
                .register("./service-worker.js")
                .catch(error =>
                    console.error(
                        "Service Worker:",
                        error
                    )
                );
        }
    }
);


/* ==========================================
   PERSISTENCIA DEL ALMACENAMIENTO
========================================== */

async function solicitarPersistenciaStorage() {

    if (
        !navigator.storage ||
        !navigator.storage.persist
    ) {
        return false;
    }

    try {
        return await navigator.storage.persist();
    } catch (error) {
        console.warn(
            "No fue posible solicitar almacenamiento persistente:",
            error
        );

        return false;
    }
}


window.addEventListener("message", evento => {

    if (
        evento.data?.type !== "open-novena" ||
        !evento.data?.novenaId
    ) {
        return;
    }

    if (
        buscarNovenaPorId(
            state.catalogo,
            evento.data.novenaId
        )
    ) {
        abrirNovena(
            evento.data.novenaId
        );
    }
});


/* ==========================================
   APARIENCIA Y TAMAÑO DEL TEXTO
========================================== */

function obtenerEscalaTexto(tamano) {
    const escalas = {
        pequeno: "0.94",
        normal: "1.04",
        grande: "1.12"
    };

    return escalas[tamano] || escalas.normal;
}

function aplicarPreferenciasVisuales() {
    const tamano =
        state.configuracion?.tamanoTexto || "normal";

    document.documentElement.style.setProperty(
        "--text-scale",
        obtenerEscalaTexto(tamano)
    );

    document.documentElement.dataset.textSize = tamano;

    aplicarTema();
}

function obtenerTemaEfectivo() {
    const tema =
        state.configuracion?.tema || "claro";

    if (tema === "automatico") {
        return window.matchMedia?.("(prefers-color-scheme: dark)").matches
            ? "oscuro"
            : "claro";
    }

    return tema === "oscuro" ? "oscuro" : "claro";
}

function aplicarTema() {
    const oscuro = obtenerTemaEfectivo() === "oscuro";

    document.body.classList.toggle("dark", oscuro);
    document.documentElement.dataset.theme =
        oscuro ? "oscuro" : "claro";

    const metaThemeColor =
        document.querySelector('meta[name="theme-color"]');

    if (metaThemeColor) {
        metaThemeColor.setAttribute(
            "content",
            oscuro ? "#111827" : "#2C4A6B"
        );
    }
}

function cambiarTema(tema) {
    if (!["claro", "oscuro", "automatico"].includes(tema)) {
        return;
    }

    state.configuracion = {
        ...state.configuracion,
        tema
    };

    guardarConfiguracion();
    aplicarTema();
    mostrarConfiguracion();
}

function cambiarTamanoTexto(tamano) {
    if (!["pequeno", "normal", "grande"].includes(tamano)) {
        return;
    }

    state.configuracion = {
        ...state.configuracion,
        tamanoTexto: tamano
    };

    guardarConfiguracion();
    aplicarPreferenciasVisuales();
    mostrarConfiguracion();
}

function escucharPreferenciaSistema() {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");

    if (!media) {
        return;
    }

    const actualizar = () => {
        if (state.configuracion?.tema === "automatico") {
            aplicarTema();
        }
    };

    if (typeof media.addEventListener === "function") {
        media.addEventListener("change", actualizar);
    } else if (typeof media.addListener === "function") {
        media.addListener(actualizar);
    }
}


/* ==========================================
   HISTORIA EXTENDIDA
========================================== */

function alternarHistoriaExtendida(boton) {

    if (!boton) {
        return;
    }

    const contenidoId =
        boton.getAttribute("aria-controls");

    const contenido =
        contenidoId
            ? document.getElementById(contenidoId)
            : null;

    if (!contenido) {
        return;
    }

    const expandida =
        boton.getAttribute("aria-expanded") === "true";

    boton.setAttribute(
        "aria-expanded",
        String(!expandida)
    );

    contenido.hidden = expandida;

    boton.classList.toggle(
        "is-open",
        !expandida
    );

    const icono =
        boton.querySelector(".history-extended-icon");

    if (icono) {
        icono.textContent =
            expandida ? "▾" : "▴";
    }

}
