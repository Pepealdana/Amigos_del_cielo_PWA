/* ==========================================
   INICIO
   Amigos del Cielo
========================================== */

function obtenerPrioridadLiturgica(novena) {
    const rango = String(novena?.feast?.liturgicalRank || "").toLowerCase();

    if (rango.includes("solemnidad")) return 4;
    if (rango.includes("fiesta")) return 3;
    if (rango.includes("memoria")) return 2;
    if (rango.includes("feria")) return 1;

    return 0;
}

function obtenerCandidatosCalendario(catalogo = []) {
    if (!Array.isArray(catalogo)) {
        return [];
    }

    const publicados = catalogo.filter(
        novena => novena?.status === "published" || !novena?.status
    );

    return publicados
        .map(novena => {
            const estado = obtenerEstadoNovena(novena.feast);

            if (!estado) {
                return null;
            }

            const fechaRelevante =
                estado.estado === "en-curso"
                    ? estado.fin
                    : estado.inicio;

            return {
                novena,
                estado,
                fechaRelevante
            };
        })
        .filter(item => item?.fechaRelevante instanceof Date);
}

function obtenerNovenaCalendarioPrincipal(catalogo = []) {
    const candidatos = obtenerCandidatosCalendario(catalogo);

    if (!candidatos.length) {
        return obtenerNovenaDestacada(catalogo);
    }

    const enCurso = candidatos
        .filter(item => item.estado.estado === "en-curso")
        .sort((a, b) => {
            const fechaA = a.estado.fin.getTime();
            const fechaB = b.estado.fin.getTime();

            if (fechaA !== fechaB) {
                return fechaA - fechaB;
            }

            const prioridadA = obtenerPrioridadLiturgica(a.novena);
            const prioridadB = obtenerPrioridadLiturgica(b.novena);

            if (prioridadA !== prioridadB) {
                return prioridadB - prioridadA;
            }

            return String(a.novena.name || "")
                .localeCompare(String(b.novena.name || ""), "es");
        });

    if (enCurso.length) {
        return enCurso[0].novena;
    }

    const proximas = candidatos
        .filter(item => item.estado.estado === "proxima")
        .sort((a, b) => {
            const fechaA = a.estado.inicio.getTime();
            const fechaB = b.estado.inicio.getTime();

            if (fechaA !== fechaB) {
                return fechaA - fechaB;
            }

            const prioridadA = obtenerPrioridadLiturgica(a.novena);
            const prioridadB = obtenerPrioridadLiturgica(b.novena);

            if (prioridadA !== prioridadB) {
                return prioridadB - prioridadA;
            }

            const destacadaA = a.novena.featured === true ? 1 : 0;
            const destacadaB = b.novena.featured === true ? 1 : 0;

            if (destacadaA !== destacadaB) {
                return destacadaB - destacadaA;
            }

            return String(a.novena.name || "")
                .localeCompare(String(b.novena.name || ""), "es");
        });

    return proximas[0]?.novena || obtenerNovenaDestacada(catalogo);
}

function obtenerNovenaEnProgresoActiva(catalogo = [], progreso = {}) {
    if (!progreso || typeof progreso !== "object") {
        return null;
    }

    const candidatos = Object.entries(progreso)
        .map(([id, datos]) => {
            const novena = buscarNovenaPorId(catalogo, id);
            const estado = novena
                ? obtenerEstadoNovena(novena.feast)
                : null;

            if (
                !novena ||
                datos?.completada === true ||
                estado?.estado !== "en-curso"
            ) {
                return null;
            }

            return {
                novena,
                fecha: new Date(datos?.fecha || 0).getTime()
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.fecha - a.fecha);

    return candidatos[0]?.novena || null;
}

function obtenerSantoDelDia(catalogo = [], progreso = {}) {
    return (
        obtenerNovenaEnProgresoActiva(catalogo, progreso) ||
        obtenerNovenaCalendarioPrincipal(catalogo)
    );
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

function obtenerTituloPrincipal(novena) {
    const estado = obtenerEstadoNovena(novena?.feast);

    if (!estado) {
        return "Santos y novenas";
    }

    if (estado.estado === "en-curso") {
        return esHoyLaFestividad(novena.feast)
            ? "Santo del día"
            : "Novena en curso";
    }

    return "Próxima novena";
}

function renderInicio(catalogo = [], progreso = {}) {

    const santo = obtenerSantoDelDia(catalogo, progreso);

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

    const tituloSanto =
        obtenerTituloPrincipal(santo);

    const mensajeCalendario =
        obtenerMensajeCalendario(santo);

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
