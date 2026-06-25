let catalogoNovenas = [];

let novenaActual = null;

document.addEventListener(
    "DOMContentLoaded",
    iniciarApp
);

/* ==========================
   CARGAR CATÁLOGO
========================== */

async function cargarCatalogo() {

    try {

        const response =
            await fetch(
                "./data/novenas.json"
            );

        if (!response.ok) {

            throw new Error(
                `Error HTTP: ${response.status}`
            );

        }

        return await response.json();

    } catch (error) {

        console.error(
            "Error cargando catálogo:",
            error
        );

        return [];

    }

}

/* ==========================
   INICIO APP
========================== */

async function iniciarApp() {

    catalogoNovenas =
        await cargarCatalogo();

    mostrarInicio();

}

/* ==========================
   MENÚ
========================== */

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

function abrirConfiguracion() {

    mostrarConfiguracion();

}

/* ==========================
   INICIO
========================== */

function mostrarInicio() {

    const view =
        document.getElementById(
            "view"
        );

    const destacada =
        catalogoNovenas.find(
            item => item.featured
        );

    if (!destacada) {

        view.innerHTML = `

            <section class="home">

                <h2>
                    No hay novenas disponibles
                </h2>

            </section>

        `;

        return;

    }

    view.innerHTML = `

        <section class="home">

            <img
                src="${destacada.image}"
                alt="${destacada.name}"
                class="saint-image">

            <h2>
                ${destacada.name}
            </h2>

            <p class="saint-title">
                ${destacada.title}
            </p>

            <p class="saint-feast">
                Festividad:
                ${destacada.feast}
            </p>

            <button
                onclick="abrirNovena('${destacada.id}')">

                Abrir Novena

            </button>

        </section>

    `;

}

/* ==========================
   ABRIR NOVENA
========================== */

async function abrirNovena(id) {

    const datos =
        catalogoNovenas.find(
            item => item.id === id
        );

    if (!datos) return;

    try {

        const response =
            await fetch(
                datos.file
            );

        if (!response.ok) {

            throw new Error(
                `Error HTTP: ${response.status}`
            );

        }

        novenaActual =
            await response.json();

        mostrarPortadaNovena();

    } catch (error) {

        console.error(
            "Error cargando novena:",
            error
        );

    }

}

/* ==========================
   PORTADA NOVENA
========================== */

function mostrarPortadaNovena() {

    if (!novenaActual) return;

    const view =
        document.getElementById(
            "view"
        );

    view.innerHTML = `

        <section class="home">

            <img
                src="${novenaActual.image}"
                alt="${novenaActual.name}"
                class="saint-image">

            <h2>
                ${novenaActual.name}
            </h2>

            <p class="saint-title">
                ${novenaActual.title}
            </p>

            <p class="saint-feast">
                Festividad:
                ${novenaActual.feast}
            </p>

            <div class="patronages">

                <h3>
                    Patrono de
                </h3>

                <ul>

                    ${novenaActual.patronages
                        .map(
                            item =>
                                `<li>${item}</li>`
                        )
                        .join("")}

                </ul>

            </div>

            <div class="button-group">

                <button
                    onclick="mostrarHistoria()">

                    Leer Historia

                </button>

                <button
                    onclick="iniciarNovena()">

                    Comenzar Novena

                </button>

            </div>

        </section>

    `;

}

/* ==========================
   HISTORIA
========================== */

function mostrarHistoria() {

    if (!novenaActual) return;

    const view =
        document.getElementById(
            "view"
        );

    view.innerHTML = `

        <section class="home">

            <img
                src="${novenaActual.image}"
                alt="${novenaActual.name}"
                class="saint-image">

            <h2>
                ${novenaActual.name}
            </h2>

            <p class="saint-title">
                ${novenaActual.title}
            </p>

            <div class="history">

                <p>
                    ${novenaActual.history.short}
                </p>

            </div>

            <div class="button-group">

                <button
                    onclick="mostrarPortadaNovena()">

                    Volver

                </button>

                <button
                    onclick="iniciarNovena()">

                    Comenzar Novena

                </button>

            </div>

        </section>

    `;

}

/* ==========================
   NOVENA
========================== */

function iniciarNovena() {

    alert(
        "Próximo paso: Día 1 de la novena."
    );

}

/* ==========================
   VISTAS TEMPORALES
========================== */

function mostrarBiblioteca() {

    const view =
        document.getElementById(
            "view"
        );

    view.innerHTML = `

        <section class="home">

            <h2>
                Biblioteca de Novenas
            </h2>

            <p>
                Aquí aparecerán todas las novenas disponibles.
            </p>

        </section>

    `;

}

function mostrarFavoritas() {

    const view =
        document.getElementById(
            "view"
        );

    view.innerHTML = `

        <section class="home">

            <h2>
                Favoritas
            </h2>

            <p>
                Tus novenas favoritas.
            </p>

        </section>

    `;

}

function mostrarProgreso() {

    const view =
        document.getElementById(
            "view"
        );

    view.innerHTML = `

        <section class="home">

            <h2>
                Mi progreso
            </h2>

            <p>
                Aquí podrás continuar tus novenas.
            </p>

        </section>

    `;

}

function mostrarConfiguracion() {

    const view =
        document.getElementById(
            "view"
        );

    view.innerHTML = `

        <section class="home">

            <h2>
                Configuración
            </h2>

            <p>
                Opciones futuras de la aplicación.
            </p>

        </section>

    `;

}

function mostrarAcerca() {

    const view =
        document.getElementById(
            "view"
        );

    view.innerHTML = `

        <section class="home">

            <h2>
                Acerca de
            </h2>

            <p>
                Amigos del Cielo es una aplicación de oración,
                formación espiritual y acompañamiento mediante
                novenas, santos y devociones católicas.
            </p>

        </section>

    `;

}