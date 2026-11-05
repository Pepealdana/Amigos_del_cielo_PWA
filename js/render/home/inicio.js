/* ==========================================
   INICIO
   Amigos del Cielo
========================================== */

function obtenerPrioridadLiturgica(novena) {
    const rango = String(novena?.liturgicalRank || novena?.feast?.liturgicalRank || "").toLowerCase();

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

/*
 * "Santo del día" es una función litúrgica independiente.
 * No se deriva de la novena activa ni de la próxima novena.
 * Solo considera contenidos de la categoría santos cuya
 * festividad corresponde al día actual.
 */
function obtenerSantoDelDia(catalogo = []) {
    if (!Array.isArray(catalogo)) {
        return null;
    }

    const santosHoy = catalogo
        .filter(item => {
            const categoria = String(item?.category || "").toLowerCase();
            const esSanto = categoria === "santos" || categoria === "santo";
            return esSanto && esHoyLaFestividad(item.feast);
        })
        .sort((a, b) => {
            const prioridadA = obtenerPrioridadLiturgica(a);
            const prioridadB = obtenerPrioridadLiturgica(b);

            if (prioridadA !== prioridadB) {
                return prioridadB - prioridadA;
            }

            return String(a.name || "")
                .localeCompare(String(b.name || ""), "es");
        });

    return santosHoy[0] || null;
}

function obtenerContenidoPrincipalInicio(catalogo = [], progreso = {}) {
    const santoDelDia = obtenerSantoDelDia(catalogo);

    if (santoDelDia) {
        return {
            novena: santoDelDia,
            tipo: "santo-del-dia"
        };
    }

    const activa = obtenerNovenaEnProgresoActiva(catalogo, progreso);

    if (activa) {
        return {
            novena: activa,
            tipo: "novena-en-curso"
        };
    }

    const proxima = obtenerNovenaCalendarioPrincipal(catalogo);

    return proxima
        ? {
            novena: proxima,
            tipo: "proxima-novena"
        }
        : null;
}

function obtenerProgresoPrincipal(catalogo = [], progreso = {}) {
    if (!Array.isArray(catalogo) || !progreso || typeof progreso !== "object") {
        return null;
    }

    const candidatos = catalogo
        .map(novena => ({
            novena,
            estado: obtenerEstadoProgresoNovena(novena?.id),
            fecha: new Date(progreso[novena?.id]?.fecha || 0).getTime()
        }))
        .filter(item => item.novena?.id && item.estado?.iniciada)
        .sort((a, b) => {
            if (a.estado.completada !== b.estado.completada) {
                return a.estado.completada ? 1 : -1;
            }
            return b.fecha - a.fecha;
        });

    const preferida = candidatos.find(
        item => item.novena.id === state.ultimaNovenaId
    );
    const seleccionada = preferida && !preferida.estado.completada
        ? preferida
        : candidatos[0];

    if (!seleccionada) return null;

    return {
        novena: seleccionada.novena,
        progreso: progreso[seleccionada.novena.id],
        estado: seleccionada.estado
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

function obtenerTituloPrincipal(tipo) {
    if (tipo === "santo-del-dia") {
        return "Santo del día";
    }

    if (tipo === "novena-en-curso") {
        return "Novena en curso";
    }

    return "Próxima novena";
}

function renderInicio(catalogo = [], progreso = {}) {

    const principal =
        obtenerContenidoPrincipalInicio(catalogo, progreso);

    const continuidad =
        obtenerProgresoPrincipal(
            catalogo,
            progreso
        );

    const novenasConProgreso = typeof obtenerNovenasConProgreso === "function"
        ? obtenerNovenasConProgreso(catalogo)
            .map(novena => ({
                novena,
                progreso: progreso?.[novena.id] || {},
                estado: obtenerEstadoProgresoNovena(novena.id)
            }))
            .sort((a, b) => {
                if (a.estado.completada !== b.estado.completada) {
                    return a.estado.completada ? 1 : -1;
                }
                const fechaA = new Date(a.progreso?.fecha || 0).getTime();
                const fechaB = new Date(b.progreso?.fecha || 0).getTime();
                return fechaB - fechaA;
            })
        : [];

    if (!principal?.novena) {
        return renderEmptyState(
            "No hay novenas disponibles",
            "Agrega una novena al catálogo para comenzar."
        );
    }

    const santo = principal.novena;

    const novenaContinuar =
        continuidad?.novena || santo;

    const dia = continuidad?.estado?.siguienteDia || 1;
    const total = continuidad?.estado?.totalDias || APP_CONFIG.diasNovena;
    const completada = continuidad?.estado?.completada === true;
    const porcentaje = continuidad?.estado?.porcentaje || 0;

    const tituloPrincipal =
        obtenerTituloPrincipal(principal.tipo);

    const mensajeCalendario =
        obtenerMensajeCalendario(santo);

    const imagenPrincipal = santo.image
        ? `
                <img
                    src="${escaparHTML(santo.image)}"
                    alt="${escaparHTML(santo.name)}"
                    class="saint-of-day-image"
                    loading="eager">
            `
        : `
                <div
                    class="saint-of-day-placeholder"
                    aria-hidden="true">
                    ✦
                </div>
            `;

    const imagenContinuar = novenaContinuar.image
        ? `
                    <img
                        src="${escaparHTML(novenaContinuar.image)}"
                        alt=""
                        class="continue-image"
                        loading="lazy">
            `
        : `
                    <div
                        class="continue-image continue-image-placeholder"
                        aria-hidden="true">
                        ✦
                    </div>
            `;

    const esSantoDelDia = principal.tipo === "santo-del-dia";
    const tieneNovenaPrincipal = (catalogo || [])
        .some(item => item?.id === santo.id && Array.isArray(item?.days) && item.days.length > 0);
    const mostrarPerfilSanto = esSantoDelDia && !tieneNovenaPrincipal && !continuidad;

    const accionPrincipal = esSantoDelDia && !tieneNovenaPrincipal
        ? "open-profile"
        : "open-novena";

    const textoBoton =
        esSantoDelDia && !tieneNovenaPrincipal
            ? "Conocer al santo"
            : "Abrir novena";

    return `

        <section class="dashboard">

            <section class="saint-of-day">

                <p class="eyebrow">
                    ${tituloPrincipal}
                </p>

                ${imagenPrincipal}

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
                    data-action="${accionPrincipal}"
                    data-id="${escaparHTML(santo.id)}">
                    ${textoBoton}
                </button>

            </section>

            <section
                id="install-app-card"
                class="install-app-card"
                aria-labelledby="install-app-title"
                hidden>

                <div class="install-app-content">
                    <p class="install-app-kicker">
                        Amigos del Cielo
                    </p>

                    <h2 id="install-app-title">
                        Lleva tus novenas contigo
                    </h2>

                    <p>
                        Instala la aplicación para tener tus
                        novenas siempre a mano y acceder a ellas
                        incluso sin conexión.
                    </p>
                </div>

                <div class="install-app-actions">
                    <button
                        id="install-app"
                        class="btn btn-primary"
                        type="button">
                        Instalar aplicación
                    </button>

                    <button
                        id="install-app-dismiss"
                        class="btn btn-secondary"
                        type="button">
                        Ahora no
                    </button>
                </div>

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
                        placeholder="Buscar una novena, santo o devoción..."
                        autocomplete="off"
                        aria-label="Buscar una novena, santo o devoción"
                        aria-controls="home-search-results"
                        aria-expanded="false">

                </div>

                <div
                    id="home-search-results"
                    class="search-results"
                    hidden>
                </div>

            </section>

            <section class="continue-section">

                <p class="section-kicker">
                    ${novenasConProgreso.length > 0
                        ? "Continuar"
                        : (mostrarPerfilSanto ? "Conocer" : (continuidad ? "Continuar" : "Comenzar"))}
                </p>

                <div class="continue-list">

                    ${novenasConProgreso.length > 0
                        ? novenasConProgreso.map(({ novena, progreso: progresoNovena, estado }) => {
                            const diaNovena = estado.siguienteDia;
                            const totalNovena = estado.totalDias;
                            const porcentajeNovena = estado.porcentaje;
                            const etiquetaProgreso = estado.completada
                                ? "Novena completada"
                                : `Día ${diaNovena} de ${totalNovena}`;
                            const accionProgreso = estado.completada
                                ? "restart-novena"
                                : "continue-novena";
                            const textoAccion = estado.completada
                                ? "Volver a rezar"
                                : "Continuar";

                            const imagen =
                                novena.image
                                    ? `
                                        <img
                                            src="${escaparHTML(novena.image)}"
                                            alt=""
                                            class="continue-image"
                                            loading="lazy">
                                    `
                                    : `
                                        <div
                                            class="continue-image continue-image-placeholder"
                                            aria-hidden="true">
                                            ✦
                                        </div>
                                    `;

                            return `
                                <article class="continue-card">

                                    ${imagen}

                                    <div class="continue-content">

                                        <h3>
                                            ${escaparHTML(novena.name)}
                                        </h3>

                                        <p>
                                            ${etiquetaProgreso}
                                        </p>

                                        <div
                                            class="progress-track"
                                            aria-label="${porcentajeNovena}% completado">

                                            <div
                                                class="progress-fill"
                                                style="width:${porcentajeNovena}%">
                                            </div>

                                        </div>

                                    </div>

                                    <button
                                        class="btn btn-primary continue-action"
                                        type="button"
                                        data-action="${accionProgreso}"
                                        data-id="${escaparHTML(novena.id)}">

                                        ${textoAccion}

                                    </button>

                                </article>
                            `;
                        }).join("")
                        : `
                            <article class="continue-card">

                                ${imagenContinuar}

                                <div class="continue-content">

                                    <h3>
                                        ${escaparHTML(novenaContinuar.name)}
                                    </h3>

                                    <p>
                                        ${mostrarPerfilSanto
                                            ? "Descubre su vida y su testimonio"
                                            : (continuidad
                                                ? (completada
                                                    ? "Novena completada"
                                                    : `Día ${dia} de ${total}`)
                                                : "Aún no has iniciado esta novena")}
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
                                    data-action="${mostrarPerfilSanto ? "open-profile" : (completada ? "restart-novena" : "continue-novena")}"
                                    data-id="${escaparHTML(novenaContinuar.id)}">

                                    ${mostrarPerfilSanto
                                        ? "Conocer al santo"
                                        : (completada
                                            ? "Volver a rezar"
                                            : (continuidad ? "Continuar" : "Comenzar"))}

                                </button>

                            </article>
                        `}

                </div>

            </section>

        </section>

    `;
}
