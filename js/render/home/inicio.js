/* ==========================================
   INICIO
   Amigos del Cielo
========================================== */

function obtenerSantoDelDia(catalogo = []) {
    if (!Array.isArray(catalogo) || catalogo.length === 0) {
        return null;
    }

    const hoy = catalogo.find(novena =>
        esHoyLaFestividad(novena.feast)
    );

    return hoy || obtenerNovenaDestacada(catalogo);
}

function obtenerProgresoPrincipal(catalogo = [], progreso = {}) {
    if (!progreso || typeof progreso !== "object") {
        return null;
    }

    const ids = Object.keys(progreso);

    if (ids.length === 0) {
        return null;
    }

    const idPreferido = state.ultimaNovenaId;

    const id =
        idPreferido && progreso[idPreferido]
            ? idPreferido
            : ids.sort((a, b) => {
                const fechaA =
                    new Date(progreso[a]?.fecha || 0).getTime();

                const fechaB =
                    new Date(progreso[b]?.fecha || 0).getTime();

                return fechaB - fechaA;
            })[0];

    const novena = buscarNovenaPorId(catalogo, id);

    if (!novena) {
        return null;
    }

    return {
        novena,
        progreso: progreso[id]
    };
}

function renderInicio(catalogo = [], progreso = {}) {

    const santo = obtenerSantoDelDia(catalogo);
    const continuidad =
        obtenerProgresoPrincipal(catalogo, progreso);

    if (!santo) {
        return renderEmptyState(
            "No hay novenas disponibles",
            "Agrega una novena al catálogo para comenzar."
        );
    }

    const dia =
        continuidad?.progreso?.dia || 1;

    const completados =
        Array.isArray(continuidad?.progreso?.completados)
            ? continuidad.progreso.completados.length
            : 0;

    const porcentaje =
        continuidad
            ? Math.min(100, Math.round((completados / 9) * 100))
            : 0;

    const tituloSanto =
        esHoyLaFestividad(santo.feast)
            ? "Santo del día"
            : "Santo destacado";

    const textoContinuar =
        continuidad
            ? `Día ${dia} de 9`
            : "Aún no has iniciado esta novena";

    return `

        <section class="dashboard">

            <section class="saint-of-day">

                <p class="eyebrow">
                    ${tituloSanto}
                </p>

                <img
                    src="${santo.image}"
                    alt="${santo.name}"
                    class="saint-of-day-image"
                    loading="eager">

                <h2>
                    ${santo.name}
                </h2>

                <p class="saint-of-day-title">
                    ${santo.title}
                </p>

                <p class="saint-of-day-feast">
                    ${formatearFechaLiturgica(santo.feast)}
                </p>

                <button
                    class="btn btn-primary btn-hero"
                    type="button"
                    data-action="open-novena"
                    data-id="${santo.id}">
                    Conocer al santo
                </button>

            </section>

            <section class="home-search">

                <p class="section-kicker">
                    ¿Qué quieres rezar hoy?
                </p>

                <div class="search-box">

                    <span class="search-box-icon" aria-hidden="true">🔎</span>

                    <input
                        id="home-search"
                        type="search"
                        value="${state.busqueda || ""}"
                        placeholder="Buscar una novena..."
                        autocomplete="off"
                        aria-label="Buscar una novena">

                </div>

                <div
                    id="home-search-results"
                    class="search-results"
                    hidden>
                </div>

            </section>

            <section class="continue-section">

                <p class="section-kicker">
                    ${continuidad ? "Continuar" : "Comenzar"}
                </p>

                <article class="continue-card">

                    <img
                        src="${continuidad?.novena?.image || santo.image}"
                        alt=""
                        class="continue-image"
                        loading="lazy">

                    <div class="continue-content">

                        <h3>
                            ${continuidad?.novena?.name || santo.name}
                        </h3>

                        <p>
                            ${textoContinuar}
                        </p>

                        ${continuidad ? `
                            <div
                                class="progress-track"
                                aria-label="${porcentaje}% completado">
                                <div
                                    class="progress-fill"
                                    style="width:${porcentaje}%">
                                </div>
                            </div>
                        ` : ""}

                    </div>

                    <button
                        class="btn btn-primary continue-action"
                        type="button"
                        data-action="continue-novena"
                        data-id="${continuidad?.novena?.id || santo.id}">
                        ${continuidad ? "Continuar" : "Comenzar"}
                    </button>

                </article>

            </section>

        </section>

    `;
}