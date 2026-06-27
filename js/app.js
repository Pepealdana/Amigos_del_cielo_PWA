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

        await cargarCatalogo();

        mostrarInicio();

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

            state.catalogo

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

    state.diaActual = 1;

    actualizarProgreso(

        state.novenaActual.id,

        1

    );

    alert(

        "Próximamente iniciaremos el Día 1 de la novena."

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

            dia

        )

    );

}

/* ==========================================
   NAVEGACIÓN ENTRE DÍAS
========================================== */

function siguienteDia() {

    if (

        state.diaActual < 9

    ) {

        mostrarDia(

            state.diaActual + 1

        );

    }

}

function anteriorDia() {

    if (

        state.diaActual > 1

    ) {

        mostrarDia(

            state.diaActual - 1

        );

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