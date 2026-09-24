/* ==========================================
   INICIO
   Amigos del Cielo
========================================== */

function obtenerSantoDelDia(catalogo = []) {
    if (!Array.isArray(catalogo) || catalogo.length === 0) {
        return null;
    }

    const hoy = catalogo.filter(novena =>
        esHoyLaFestividad(novena.feast)
    );

    return hoy[0] || obtenerNovenaDestacada(catalogo);
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

function obtenerMensajeCalendario(novena) {
    const estado =
        obtenerEstadoNovena(novena?.feast);

    if (!estado) {
        return "";
    }

    if (estado.estado === "en-curso") {
        return `Novena en curso · Día ${estado.dia} de 9`;
    }

    if (estado.estado === "proxima") {
        const inicio =
            formatearFechaLiturgica({
                day: estado.inicio.getDate(),
                month: estado.inicio.getMonth() + 1
            });

        return `Próximo inicio · ${inicio}`;
    }

    return "";
}

function renderInicio(catalogo = [], progreso = {}) {

    const santo = obtenerSantoDelDia(catalogo);

    const continuidad =
        obtenerProgresoPrincipal(
            catalogo,
            progreso
        );

    if (!santo) {
        return renderEmptyState(
            "No hay novenas disponibles",
            "Agrega una novena al catálogo para comenzar."
        );
    }

    const novenaContinuar =
        continuidad?.novena || santo;

    const dia =
        continuidad?.progreso?.dia || 1;

    const total =
        Number(
            continuidad?.novena?.novena?.days
        ) || APP_CONFIG.diasNovena;

    const completada =
        continuidad?.progreso?.completada === true;

    const completados =
        Array.isArray(
            continuidad?.progreso?.completados
        )
            ? continuidad.progreso.completados.length
            : 0;

    const porcentaje =
        continuidad
            ? Math.min(
                100,
                Math.round(
                    (completados / total) * 100
                )
            )
            : 0;

    const esSantoDeHoy =
        esHoyLaFestividad(santo.feast);

    const tituloSanto =
        esSantoDeHoy
            ? "Santo del día"
            : "Santos y novenas";

    const mensajeCalendario =
        obtenerMensajeCalendario(novenaContinuar);

    return `

        <section class="dashboard">

            <section class="saint-of-day">

                <p class="eyebrow">
                    ${tituloSanto}
                </p>

                <img
                    src="${escaparHTML(santo.image)}"
                    alt="${escaparHTML(santo.name)}"
                    class="saint-of-day-image"
                    loading="eager">

                <h2>
                    ${escaparHTML(santo.name)}
                </h2>

                <p class="saint-of-day-title">
                    ${escaparHTML(santo.title)}
                </p>

                <p class="saint-of-day-feast">
                    ${escaparHTML(formatearFechaLiturgica(santo.feast))}
                </p>

                ${mensajeCalendario ? `
                    <p class="calendar-status">
                        ${escaparHTML(mensajeCalendario)}
                    </p>
                ` : ""}

                <button
                    class="btn btn-primary btn-hero"
                    type="button"
                    data-action="open-novena"
                    data-id="${escaparHTML(santo.id)}">
                    Conocer al santo
                </button>

            </section>

            <section class="home-search">

                <p class="section-kicker">
                    ¿Qué quieres rezar hoy?
                </p>

                <div class="search-box">

                    <span
                        class="search-box-icon"
                        aria-hidden="true">
                        🔎
                    </span>

                    <input
                        id="home-search"
                        type="search"
                        value="${escaparHTML(state.busqueda || "")}"
                        placeholder="Buscar una novena o un santo..."
                        autocomplete="off"
                        aria-label="Buscar una novena o un santo">

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
                        src="${escaparHTML(novenaContinuar.image)}"
                        alt=""
                        class="continue-image"
                        loading="lazy">

                    <div class="continue-content">

                        <h3>
                            ${escaparHTML(novenaContinuar.name)}
                        </h3>

                        <p>
                            ${continuidad
                                ? (completada
                                    ? "Novena completada"
                                    : `Día ${dia} de ${total}`)
                                : "Aún no has iniciado esta novena"}
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
                        data-action="${completada ? "restart-novena" : "continue-novena"}"
                        data-id="${escaparHTML(novenaContinuar.id)}">

                        ${completada
                            ? "Volver a rezar"
                            : (continuidad ? "Continuar" : "Comenzar")}

                    </button>

                </article>

            </section>

        </section>

    `;
}
