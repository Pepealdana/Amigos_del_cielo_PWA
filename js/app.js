let novenaActual = null;

document.addEventListener(
    "DOMContentLoaded",
    iniciarApp
);

async function cargarNovena() {

    try {

        const response =
            await fetch("data/san-jose.json");

        if (!response.ok) {

            throw new Error(
                "No se pudo cargar la novena."
            );

        }

        const novena =
            await response.json();

        return novena;

    } catch (error) {

        console.error(error);

        const view =
            document.getElementById("view");

        view.innerHTML = `

            <p>
                Error al cargar la novena.
            </p>

        `;

        return null;

    }

}

async function iniciarApp() {

    const novena =
        await cargarNovena();

    if (!novena) return;

    novenaActual = novena;

    mostrarInicio();

}

function mostrarInicio() {

    const view =
        document.getElementById("view");

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

                <h3>Patrono de</h3>

                <ul>

                    ${novenaActual.patronages
                        .map(item =>
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

function mostrarHistoria() {

    const view =
        document.getElementById("view");

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

function iniciarNovena() {

    alert(
        "Próximo paso: mostrar el Día 1 de la novena."
    );

}