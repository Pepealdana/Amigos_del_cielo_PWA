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
            .filter(item => item.novena)
            .sort((a, b) => {
                const fechaA =
                    new Date(a.datos?.fecha || 0).getTime();

                const fechaB =
                    new Date(b.datos?.fecha || 0).getTime();

                return fechaB - fechaA;
            });

    return `

        <section class="page-shell">

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
                        Cuando comiences una novena, aparecerá aquí.
                    </p>

                </div>

            ` : `

                <div class="library-list">

                    ${entradas.map(item => {

                        const dia =
                            Number(item.datos?.dia) || 1;

                        const total =
                            Number(
                                item.novena?.novena?.days
                            ) || APP_CONFIG.diasNovena;

                        const completados =
                            Array.isArray(
                                item.datos?.completados
                            )
                                ? item.datos.completados.length
                                : 0;

                        const completada =
                            item.datos?.completada === true;

                        const porcentaje =
                            completada
                                ? 100
                                : Math.min(
                                    100,
                                    Math.round(
                                        (completados / total) * 100
                                    )
                                );

                        return `

                            <article class="continue-card">

                                <img
                                    src="${escaparHTML(item.novena.image)}"
                                    alt=""
                                    class="continue-image"
                                    loading="lazy">

                                <div class="continue-content">

                                    <h3>
                                        ${escaparHTML(item.novena.name)}
                                    </h3>

                                    <p>
                                        ${completada
                                            ? "Novena completada"
                                            : `Día ${dia} de ${total}`}
                                    </p>

                                    <div class="progress-track"
                                         aria-label="${porcentaje}% completado">

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
