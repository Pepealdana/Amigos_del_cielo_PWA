document.addEventListener(
    "DOMContentLoaded",
    iniciarApp
);

function iniciarApp() {

    mostrarInicio();

}

function mostrarInicio() {

    const view =
        document.getElementById("view");

    const sanJose =
        novenas[0];

    view.innerHTML = `

        <section class="home">

            <img
                src="${sanJose.imagen}"
                alt="${sanJose.nombre}"
                class="saint-image">

            <h2>
                ${sanJose.nombre}
            </h2>

            <p>
                Festividad:
                ${sanJose.fiesta}
            </p>

            <button
                onclick="iniciarNovena()">

                Comenzar Novena

            </button>

        </section>

    `;
}

function iniciarNovena() {

    alert(
        "Próximo paso: abrir la novena de San José"
    );

}