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

        const view =

            document.getElementById(

                "view"

            );

        if (view) {

            view.innerHTML = `

                <section class="home">

                    <h2>

                        Error

                    </h2>

                    <p>

                        No fue posible iniciar
                        la aplicación.

                    </p>

                </section>

            `;

        }

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

    if (menu) {

        menu.classList.toggle(

            "open"

        );

    }

    if (overlay) {

        overlay.classList.toggle(

            "show"

        );

    }

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

    if (menu) {

        menu.classList.remove(

            "open"

        );

    }

    if (overlay) {

        overlay.classList.remove(

            "show"

        );

    }

}

/* ==========================================
   INICIO
========================================== */

function mostrarInicio() {

    cerrarMenu();

    document

        .getElementById("view")

        .innerHTML =

        renderInicio(

            state.catalogo

        );

}

/* ==========================================
   BIBLIOTECA
========================================== */

function mostrarBiblioteca() {

    cerrarMenu();

    document

        .getElementById("view")

        .innerHTML =

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

        if (

            !state.novenaActual

        ) {

            throw new Error(

                "No fue posible cargar la novena."

            );

        }

        mostrarPortadaNovena();

    } catch (error) {

        console.error(error);

    }

}

/* ==========================================
   PORTADA
========================================== */

function mostrarPortadaNovena() {

    document

        .getElementById("view")

        .innerHTML =

        renderPortadaNovena(

            state.novenaActual

        );

}

/* ==========================================
   HISTORIA
========================================== */

function mostrarHistoria() {

    document

        .getElementById("view")

        .innerHTML =

        renderHistoria(

            state.novenaActual

        );

}

/* ==========================================
   DÍA 1
========================================== */

function iniciarNovena() {

    // Próximamente:
    // state.progreso =
    // {
    //     santo: state.novenaActual.id,
    //     dia: 1
    // };

    alert(

        "Próximamente iniciaremos el Día 1."

    );

}

/* ==========================================
   FAVORITAS
========================================== */

function mostrarFavoritas() {

    cerrarMenu();

    document

        .getElementById("view")

        .innerHTML = `

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

    document

        .getElementById("view")

        .innerHTML = `

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

    document

        .getElementById("view")

        .innerHTML = `

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

    document

        .getElementById("view")

        .innerHTML = `

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