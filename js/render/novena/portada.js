/* ==========================================
   PORTADA DE NOVENA
   Amigos del Cielo
========================================== */

function renderPortadaNovena(novena) {

    const estado =
        obtenerEstadoNovena(novena?.feast);

    const total =
        Number(novena?.novena?.days) ||
        APP_CONFIG.diasNovena;

    let mensajeCalendario = "";

    if (estado?.estado === "en-curso") {
        mensajeCalendario =
            `Novena en curso · Día ${estado.dia} de ${total}`;
    } else if (estado?.estado === "proxima") {
        mensajeCalendario =
            `Próximo inicio · ${formatearFechaLiturgica({
                day: estado.inicio.getDate(),
                month: estado.inicio.getMonth() + 1
            })}`;
    }

    return `

        <section class="novena-page">

            <div class="novena-context-nav">
                <button
                    class="context-back"
                    type="button"
                    data-action="back-novena"
                    data-back-level="origen"
                    aria-label="Volver al lugar anterior">
                    ← Volver
                </button>
            </div>


            ${renderImagenNovena(novena)}

            <h2>
                ${escaparHTML(novena.name)}
            </h2>

            <p class="saint-subtitle">
                ${escaparHTML(novena.subtitle || "")}
            </p>

            <p class="saint-title">
                ${escaparHTML(novena.title || "")}
            </p>

            <p class="saint-feast">
                📅 ${escaparHTML(
                    formatearFechaLiturgica(novena.feast)
                )}
            </p>

            ${mensajeCalendario ? `
                <p class="calendar-status">
                    ${escaparHTML(mensajeCalendario)}
                </p>
            ` : ""}

            <p class="saint-description">
                ${escaparHTML(novena.description || "")}
            </p>

            ${novena.quote?.text ? `

                ${crearDivider()}

                <blockquote class="saint-quote">

                    <p>
                        "${escaparHTML(novena.quote.text)}"
                    </p>

                    <footer>
                        ${novena.quote.attribution
                            ? `${escaparHTML(novena.quote.attribution)} · `
                            : ""}
                        ${escaparHTML(
                            novena.quote.reference || ""
                        )}
                    </footer>

                </blockquote>

            ` : ""}

            ${Array.isArray(novena.patronages)
                ? renderListaSeccion(
                    "Patronazgos",
                    novena.patronages.map(escaparHTML)
                )
                : ""}

            ${Array.isArray(novena.virtues)
                ? renderListaSeccion(
                    "Virtudes",
                    novena.virtues.map(escaparHTML)
                )
                : ""}

            <div class="novena-actions">

                <div class="novena-actions-primary">

                    <button
                        class="btn btn-primary"
                        type="button"
                        data-action="start-novena">

                        ${estado?.estado === "en-curso"
                            ? `Continuar · Día ${estado.dia}`
                            : "Comenzar Novena"}

                    </button>

                </div>

                <div
                    class="novena-actions-secondary"
                    aria-label="Acciones adicionales">

                    <button
                        class="btn btn-outline"
                        type="button"
                        data-route="historia">

                        Historia

                    </button>

                    <button
                        class="btn btn-secondary"
                        type="button"
                        data-action="favorite-novena"
                        data-id="${escaparHTML(novena.id)}">

                        ${esFavorita(novena.id)
                            ? "En favoritas"
                            : "Agregar a favoritas"}

                    </button>

                    <button
                        class="btn btn-secondary"
                        type="button"
                        data-action="share-novena">

                        Compartir

                    </button>

                </div>

            </div>

        </section>

    `;
}
