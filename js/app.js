/* ==========================================
   APP
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

    try {

        state.catalogo =
            await cargarCatalogo();

        if (
            !state.catalogo ||
            state.catalogo.length === 0
        ) {

            throw new Error(
                "No existen novenas."
            );

        }

        mostrarInicio();

    } catch (error) {

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

    const btnMenu =
        document.getElementById(
            "btn-menu"
        );

    if (btnMenu) {

        btnMenu.addEventListener(
            "click",
            abrirMenu
        );

    }

    const overlay =
        document.getElementById(
            "menu-overlay"
        );

    if (overlay) {

        overlay.addEventListener(
            "click",
            cerrarMenu
        );

    }

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

    if (elemento) {

        elemento.addEventListener(
            "click",
            callback
        );

    }

}

/* ==========================================
   MENÚ
========================================== */

function abrirMenu() {

    const menu =
        document.getElementById(
            "side-menu"
        );

    const overlay =
        document.getElementById(
            "menu-overlay"
        );

    menu?.classList.toggle(
        "open"
    );

    overlay?.classList.toggle(
        "show"
    );

}

function cerrarMenu() {

    const menu =
        document.getElementById(
            "side-menu"
        );

    const overlay =
        document.getElementById(
            "menu-overlay"
        );

    menu?.classList.remove(
        "open"
    );

    overlay?.classList.remove(
        "show"
    );

}

/* ==========================================
   INICIO
========================================== */

function mostrarInicio() {

    cerrarMenu();

    obtenerView().innerHTML =
        renderInicio(
            state.catalogo
        );

}

/* ==========================================
   BIBLIOTECA
========================================== */

function mostrarBiblioteca() {

    cerrarMenu();

    obtenerView().innerHTML =
        renderBiblioteca(
            state.catalogo
        );

}

/* ==========================================
   ABRIR NOVENA
========================================== */

async function abrirNovena(id) {

    cerrarMenu();

    try {

        state.novenaActual =
            await cargarNovena(id);

        if (!state.novenaActual) {

            throw new Error(
                "No fue posible cargar la novena."
            );

        }

        mostrarPortadaNovena();

    } catch (error) {

        console.error(error);

        mostrarError(
            "No fue posible cargar la novena."
        );

    }

}

/* ==========================================
   PORTADA
========================================== */

function mostrarPortadaNovena() {

    obtenerView().innerHTML =
        renderPortadaNovena(
            state.novenaActual
        );

}

/* ==========================================
   HISTORIA
========================================== */

function mostrarHistoria() {

    obtenerView().innerHTML =
        renderHistoria(
            state.novenaActual
        );

}

/* ==========================================
   DÍA 1
========================================== */

function iniciarNovena() {

    alert(
        "Próximamente iniciaremos el Día 1."
    );

}

/* ==========================================
   FAVORITAS
========================================== */

function mostrarFavoritas() {

    cerrarMenu();

    obtenerView().innerHTML = `

        <section class="home">

            <h2>

                Favoritas

            </h2>

            <p>

                Aquí aparecerán las novenas favoritas.

            </p>

        </section>

    `;

}

/* ==========================================
   PROGRESO
========================================== */

function mostrarProgreso() {

    cerrarMenu();

    obtenerView().innerHTML = `

        <section class="home">

            <h2>

                Mi progreso

            </h2>

            <p>

                Aquí podrás continuar las novenas
                que hayas iniciado.

            </p>

        </section>

    `;

}

/* ==========================================
   CONFIGURACIÓN
========================================== */

function mostrarConfiguracion() {

    cerrarMenu();

    obtenerView().innerHTML = `

        <section class="home">

            <h2>

                Configuración

            </h2>

            <p>

                Próximamente podrás personalizar
                la aplicación.

            </p>

        </section>

    `;

}

/* ==========================================
   ACERCA DE
========================================== */

function mostrarAcerca() {

    cerrarMenu();

    obtenerView().innerHTML = `

        <section class="home">

            <h2>

                Acerca de

            </h2>

            <p>

                Amigos del Cielo es una aplicación
                de oración, formación espiritual
                y acompañamiento mediante novenas
                y devociones católicas.

            </p>

        </section>

    `;

}

/* ==========================================
   UTILIDADES
========================================== */

function obtenerView() {

    return document.getElementById(
        "view"
    );

}

function mostrarError(
    mensaje
) {

    obtenerView().innerHTML = `

        <section class="home">

            <h2>

                Error

            </h2>

            <p>

                ${mensaje}

            </p>

        </section>

    `;

}