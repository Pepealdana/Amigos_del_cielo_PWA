/* ==========================================
   APP
   Amigos del Cielo
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    iniciarApp

);

/* ==========================================
   INICIO
========================================== */

async function iniciarApp() {

    registrarEventos();

    inicializarStorage();

    try {

        await cargarCatalogo();

        if (

            state.catalogo.length === 0

        ) {

            throw new Error(

                "No existen novenas."

            );

        }

        mostrarInicio();

    }

    catch (error) {

        console.error(error);

        mostrarError(

            "No fue posible iniciar la aplicación."

        );

    }

}

/* ==========================================
   REGISTRAR EVENTOS
========================================== */

function registrarEventos() {

    registrarEvento(

        "btn-menu",

        abrirMenu

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

        "menu-acerca",

        () => navegar("acerca")

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
   MENÚ
========================================== */

function abrirMenu() {

    document

        .getElementById("side-menu")

        ?.classList.toggle("open");

    document

        .getElementById("menu-overlay")

        ?.classList.toggle("show");

}

function cerrarMenu() {

    document

        .getElementById("side-menu")

        ?.classList.remove("open");

    document

        .getElementById("menu-overlay")

        ?.classList.remove("show");

}

/* ==========================================
   INICIO
========================================== */

function mostrarInicio() {

    cerrarMenu();

    actualizarTituloPagina(

        "Inicio"

    );

    renderizar(

        renderInicio(

            state.catalogo

        )

    );

}

/* ==========================================
   BIBLIOTECA
========================================== */

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

        if (

            typeof mostrarLoader === "function"

        ) {

            mostrarLoader();

        }

        await cargarNovena(id);

        if (

            !state.novenaActual

        ) {

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

    finally {

        if (

            typeof ocultarLoader === "function"

        ) {

            ocultarLoader();

        }

    }

}

/* ==========================================
   PORTADA
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
   DÍA
========================================== */

function iniciarNovena() {

    state.diaActual = 1;

    guardarProgreso(

        state.novenaActual.id,

        1

    );

    alert(

        "Próximamente iniciaremos el Día 1."

    );

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

        renderFavoritas()

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

        renderProgreso()

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
   RENDERIZAR
========================================== */

function renderizar(html) {

    obtenerView().innerHTML = html;

}

/* ==========================================
   UTILIDADES
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

function mostrarError(mensaje) {

    if (

        typeof crearEmptyState === "function"

    ) {

        renderizar(

            crearEmptyState(

                "Error",

                mensaje

            )

        );

        return;

    }

    renderizar(`

        <section class="home">

            <h2>

                Error

            </h2>

            <p>

                ${mensaje}

            </p>

        </section>

    `);

}

function actualizarTituloPagina(

    titulo

) {

    document.title =

        `${titulo} · ${APP_CONFIG.nombre}`;

}