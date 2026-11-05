/* ==========================================
   MI PROGRESO
   Amigos del Cielo
========================================== */

function renderProgreso(catalogo = [], progreso = {}) {

    const entradas =
        Object.entries(progreso || {})
            .map(([id, datos]) => ({
                novena: buscarNovenaPorId(catalogo, id),
                datos
            }))
            /*
             * Mostrar únicamente progreso real o novenas completadas.
             * Los registros abandonados conservan su entrada histórica,
             * pero al tener 0 días rezados ya no forman parte del
             * progreso activo del usuario.
             */
            .filter(item =>
                item.novena &&
obtenerEstadoProgresoNovena(item.novena.id).iniciada
            )
            .sort((a, b) => {
                const fechaA =
                    new Date(a.datos?.fecha || 0).getTime();

                const fechaB =
                    new Date(b.datos?.fecha || 0).getTime();

                return fechaB - fechaA;
            });

    return `

        <section class="page-shell">
            <div class="context-page-nav">
                <button
                    class="context-back"
                    type="button"
                    data-route="camino"
                    aria-label="Volver a Mi Camino">
                    ← Volver a Mi Camino
                </button>
            </div>

            <header class="page-header">

                <h2 class="page-title">
                    Mi progreso
                </h2>

                <p class="page-subtitle">
                    Continúa tus novenas donde las dejaste.
                </p>

            </header>

            ${entradas.length === 0 ? `

                <div class="simple-panel">

                    <strong>
                        Todavía no has iniciado ninguna novena.
                    </strong>

                    <p>
                        Cuando comiences una novena, aparecerá aquí para que
                        puedas continuarla donde la dejaste.
                    </p>

                    <button class="btn btn-outline" type="button" data-route="novenas">
                        Explorar novenas
                    </button>

                </div>

            ` : `

                <div class="library-list">

                    ${entradas.map(item => {

                        const estado =
                            obtenerEstadoProgresoNovena(item.novena.id);

                        const dia = estado.siguienteDia;
                        const total = estado.totalDias;
                        const completada = estado.completada;
                        const porcentaje = estado.porcentaje;

                        return `

                            <article class="continue-card">

                                ${item.novena.image ? `
                                    <img
                                        src="${escaparHTML(item.novena.image)}"
                                        alt=""
                                        class="continue-image"
                                        loading="lazy">
                                ` : `
                                    <span class="continue-image continue-image-placeholder" aria-hidden="true">✦</span>
                                `}

                                <div class="continue-content">

                                    <h3>
                                        ${escaparHTML(item.novena.name)}
                                    </h3>

                                    <p>
                                        ${completada
                                            ? "Novena completada"
                                            : `Siguiente: día ${dia} de ${total}`}
                                    </p>

                                    <div class="progress-track"
                                         aria-label="${porcentaje}% de avance">

                                        <div
                                            class="progress-fill"
                                            style="width:${porcentaje}%">
                                        </div>

                                    </div>

                                </div>

                                <button
                                    class="btn btn-primary continue-action"
                                    type="button"
                                    data-action="${completada ? "restart-novena" : "continue-novena"}"
                                    data-id="${escaparHTML(item.novena.id)}">
                                    ${completada ? "Volver a rezar" : "Continuar"}
                                </button>

                            </article>

                        `;

                    }).join("")}

                </div>

            `}

        </section>

    `;
}
