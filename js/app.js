let novenaActual = null;

document.addEventListener(
    "DOMContentLoaded",
    iniciarApp
);

/* ==========================
   CARGAR DATOS
========================== */

async function cargarNovena() {

    try {

        const response =
            await fetch(
                "./data/san-jose.json"
            );

        if (!response.ok) {

            throw new Error(
                `Error HTTP: ${response.status}`
            );

        }

        return await response.json();

    } catch (error) {

        console.error(
            "Error cargando novena:",
            error
        );

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
                        No fue posible cargar
                        la novena.
                    </p>

                </section>

            `;

        }

        return null;

    }

}

/* ==========================
   INICIO APP
========================== */

async function iniciarApp() {

    novenaActual =
        await cargarNovena();

    if (!novenaActual) return;

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
                    onclick="mostrarInicio()">

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
        "Próximo paso: mostrar el Día 1 de la novena."
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
                Aquí aparecerán todas
                las novenas disponibles.
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
                Aquí podrás continuar
                tus novenas.
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
                Opciones futuras de la app.
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
                Amigos del Cielo es una
                aplicación de oración y
                formación espiritual
                centrada en santos,
                novenas y devociones
                católicas.
            </p>

        </section>

    `;

}