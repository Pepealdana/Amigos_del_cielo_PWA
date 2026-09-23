/* ==========================================
   MI PROGRESO
   Amigos del Cielo
========================================== */

function renderProgreso(catalogo = [], progreso = {}) {

    const entradas = Object.entries(progreso || {})
        .map(([id, datos]) => ({
            novena: buscarNovenaPorId(catalogo, id),
            datos
        }))
        .filter(item => item.novena);

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
                    <strong>Todavía no has iniciado ninguna novena.</strong>
                    <p>
                        Cuando comiences una novena, aparecerá aquí.
                    </p>
                </div>
            ` : `
                <div class="library-list">

                    ${entradas.map(item => {

                        const dia = Number(item.datos?.dia) || 1;

                        const completados =
                            Array.isArray(item.datos?.completados)
                                ? item.datos.completados.length
                                : 0;

                        const porcentaje =
                            Math.min(
                                100,
                                Math.round((completados / 9) * 100)
                            );

                        return `

                            <article class="continue-card">

                                <img
                                    src="${item.novena.image}"
                                    alt=""
                                    class="continue-image"
                                    loading="lazy">

                                <div class="continue-content">

                                    <h3>
                                        ${item.novena.name}
                                    </h3>

                                    <p>
                                        Día ${dia} de 9
                                    </p>

                                    <div class="progress-track">
                                        <div
                                            class="progress-fill"
                                            style="width:${porcentaje}%">
                                        </div>
                                    </div>

                                </div>

                                <button
                                    class="btn btn-primary continue-action"
                                    type="button"
                                    data-action="continue-novena"
                                    data-id="${item.novena.id}">
                                    Continuar
                                </button>

                            </article>

                        `;

                    }).join("")}

                </div>
            `}

        </section>

    `;
}