/* ==========================================
   RENDER AGRADECIMIENTO
========================================== */

function obtenerEtiquetaRetornoNovena(rutaOrigen = "biblioteca") {
    const etiquetas = {
        inicio: "Volver a Inicio",
        biblioteca: "Volver a Biblioteca",
        todos: "Volver a Todos",
        santos: "Volver a Santos",
        beatos: "Volver a Beatos",
        maria: "Volver a María",
        novenas: "Volver a Novenas",
        devociones: "Volver a Devociones",
        favoritas: "Volver a Favoritas",
        progreso: "Volver a Mi progreso",
        camino: "Volver a Mi camino"
    };

    return etiquetas[rutaOrigen] || etiquetas.biblioteca;
}

function renderAgradecimiento(
    novena,
    rutaOrigen = "biblioteca"
) {
    const totalDias =
        Number(novena?.novena?.days) ||
        novena?.days?.length ||
        APP_CONFIG.diasNovena;

    const etiquetaRetorno =
        obtenerEtiquetaRetornoNovena(rutaOrigen);

    if (!novena) {

        return `

            <section class="home">

                <h2>

                    Gracias

                </h2>

            </section>

        `;

    }

    return `

        <section class="home">

            <img

                src="${escaparHTML(novena.image || "")}"

                alt="${escaparHTML(novena.name || "")}"

                class="saint-image">

            <h2>

                Novena finalizada

            </h2>

            <p class="saint-title">

                ${escaparHTML(novena.name || "")}

            </p>

            <p>

                Gracias por dedicar estos
                ${escaparHTML(String(totalDias))} días de oración junto
                a <strong>${escaparHTML(novena.name || "")}</strong>.

            </p>

            <div class="divider"></div>

            <p>

                Que el ejemplo de
                <strong>${novena.name}</strong>
                fortalezca tu fe, tu esperanza
                y tu caridad cada día.

            </p>

            <div class="divider"></div>

            <p>

                Continúa caminando con Cristo
                y descubre nuevas novenas para
                seguir creciendo espiritualmente.

            </p>

            <div class="button-group">

                <button
                    class="btn btn-primary"
                    type="button"
                    data-action="restart-novena"
                    data-id="${escaparHTML(novena.id || "")}">

                    Volver a rezar

                </button>

                <button
                    class="btn btn-secondary"
                    type="button"
                    data-route="${escaparHTML(rutaOrigen)}">

                    ${escaparHTML(etiquetaRetorno)}

                </button>

            </div>

        </section>

    `;

}