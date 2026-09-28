/* ==========================================
   BIBLIOTECA ESPIRITUAL
   Amigos del Cielo
========================================== */

function obtenerContenidoBiblioteca() {
    return Array.isArray(state.catalogo)
        ? state.catalogo.filter(item => item?.status === "published")
        : [];
}

function obtenerSantoDelDiaBiblioteca() {
    const santos = Array.isArray(state.catalogosV2?.santos)
        ? state.catalogosV2.santos
        : [];

    return typeof obtenerSantoDelDia === "function"
        ? obtenerSantoDelDia(santos)
        : null;
}

function obtenerNovenaEnCursoBiblioteca() {
    if (typeof obtenerProgresoPrincipal !== "function") {
        return null;
    }

    return obtenerProgresoPrincipal(
        obtenerContenidoBiblioteca(),
        state.progreso || {}
    );
}

function obtenerProximaCelebracionBiblioteca() {
    if (typeof obtenerCandidatosCalendario !== "function") {
        return null;
    }

    const candidatos = obtenerCandidatosCalendario(
        obtenerContenidoBiblioteca()
    )
        .filter(item => item.estado?.estado === "proxima")
        .sort((a, b) =>
            a.fechaRelevante.getTime() - b.fechaRelevante.getTime()
        );

    return candidatos[0] || null;
}

function calcularDiasHastaBiblioteca(fecha) {
    if (!(fecha instanceof Date)) {
        return null;
    }

    const hoy = new Date();
    const inicioHoy = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
    );

    const inicioFecha = new Date(
        fecha.getFullYear(),
        fecha.getMonth(),
        fecha.getDate()
    );

    return Math.max(
        0,
        Math.round(
            (inicioFecha.getTime() - inicioHoy.getTime()) /
            86400000
        )
    );
}

function renderBiblioteca(catalogo = []) {
    const contenido = obtenerContenidoBiblioteca();
    const santoDelDia = obtenerSantoDelDiaBiblioteca();
    const novenaEnCurso = obtenerNovenaEnCursoBiblioteca();
    const proxima = obtenerProximaCelebracionBiblioteca();

    const santos = Array.isArray(state.catalogosV2?.santos)
        ? state.catalogosV2.santos.filter(item => item?.status === "published")
        : [];

    const beatos = Array.isArray(state.catalogosV2?.beatos)
        ? state.catalogosV2.beatos.filter(item => item?.status === "published")
        : [];

    const maria = Array.isArray(state.catalogosV2?.maria)
        ? state.catalogosV2.maria.filter(item => item?.status === "published")
        : [];

    const devociones = Array.isArray(state.catalogosV2?.devociones)
        ? state.catalogosV2.devociones.filter(item => item?.status === "published")
        : [];

    const diasProxima = proxima
        ? calcularDiasHastaBiblioteca(proxima.estado.inicio)
        : null;

    const porcentaje = novenaEnCurso?.progreso
        ? Math.min(
            100,
            Math.round(
                (
                    Array.isArray(novenaEnCurso.progreso.diasVisitados)
                        ? novenaEnCurso.progreso.diasVisitados.length
                        : 0
                ) / (Number(APP_CONFIG.diasNovena) || 9) * 100
            )
        )
        : 0;

    return `
        <section class="library-new page-shell">

            <header class="library-hero">
                <p class="section-kicker">Tu espacio de oración</p>
                <h2 class="page-title">Biblioteca espiritual</h2>
                <p class="page-subtitle">
                    Un lugar para encontrar qué rezar, qué conocer
                    y qué celebrar hoy.
                </p>
            </header>

            <section class="library-today" aria-labelledby="library-today-title">
                <div class="library-section-heading">
                    <div>
                        <p class="library-kicker">Para hoy</p>
                        <h3 id="library-today-title">Un momento para acercarte a Dios</h3>
                    </div>
                    <span class="library-section-symbol" aria-hidden="true">✦</span>
                </div>

                ${santoDelDia ? `
                    <article class="library-today-card">
                        ${santoDelDia.image ? `
                            <img
                                src="${escaparHTML(santoDelDia.image)}"
                                alt="${escaparHTML(santoDelDia.name)}"
                                class="library-today-image"
                                loading="eager">
                        ` : `
                            <div class="library-today-image library-image-placeholder" aria-hidden="true">✦</div>
                        `}

                        <div class="library-today-content">
                            <span class="library-card-label">Santo del día</span>
                            <h4>${escaparHTML(santoDelDia.name)}</h4>
                            ${santoDelDia.title ? `
                                <p>${escaparHTML(santoDelDia.title)}</p>
                            ` : ""}
                            ${santoDelDia.feast?.text ? `
                                <span class="library-card-meta">
                                    ${escaparHTML(santoDelDia.feast.text)}
                                </span>
                            ` : ""}
                            <button
                                class="btn btn-primary"
                                type="button"
                                data-action="open-novena"
                                data-id="${escaparHTML(santoDelDia.id)}">
                                Conocerlo
                            </button>
                        </div>
                    </article>
                ` : `
                    <div class="library-empty-today">
                        <span aria-hidden="true">✦</span>
                        <p>Hoy puedes dedicar un momento a la oración, continuar una novena o descubrir un nuevo santo.</p>
                    </div>
                `}
            </section>

            <section class="library-actions" aria-labelledby="library-actions-title">
                <div class="library-section-heading">
                    <div>
                        <p class="library-kicker">Explorar</p>
                        <h3 id="library-actions-title">¿Qué quieres hacer?</h3>
                    </div>
                </div>

                <div class="library-action-grid">

                    <button class="library-action-card" type="button" data-route="novenas">
                        <span class="library-action-icon" aria-hidden="true">☼</span>
                        <span class="library-action-text">
                            <strong>Novenas</strong>
                            <small>Comienza o continúa una novena.</small>
                        </span>
                        <span class="library-action-arrow" aria-hidden="true">›</span>
                    </button>

                    <button class="library-action-card" type="button" data-route="devociones">
                        <span class="library-action-icon" aria-hidden="true">♡</span>
                        <span class="library-action-text">
                            <strong>Devociones</strong>
                            <small>Encuentra una forma de oración para este momento.</small>
                        </span>
                        <span class="library-action-arrow" aria-hidden="true">›</span>
                    </button>

                    <button class="library-action-card" type="button" data-route="maria">
                        <span class="library-action-icon" aria-hidden="true">✧</span>
                        <span class="library-action-text">
                            <strong>María</strong>
                            <small>Descubre advocaciones y su tradición devocional.</small>
                        </span>
                        <span class="library-action-arrow" aria-hidden="true">›</span>
                    </button>

                    <button class="library-action-card" type="button" data-route="santos">
                        <span class="library-action-icon" aria-hidden="true">✦</span>
                        <span class="library-action-text">
                            <strong>Conocer santos</strong>
                            <small>Explora vidas, vocaciones y testimonios de santidad.</small>
                        </span>
                        <span class="library-action-arrow" aria-hidden="true">›</span>
                    </button>

                </div>
            </section>

            ${novenaEnCurso ? `
                <section class="library-continuity" aria-labelledby="library-continuity-title">
                    <div class="library-section-heading">
                        <div>
                            <p class="library-kicker">Tu oración</p>
                            <h3 id="library-continuity-title">Continúa donde lo dejaste</h3>
                        </div>
                    </div>

                    <article class="library-continuity-card">
                        ${novenaEnCurso.novena.image ? `
                            <img
                                src="${escaparHTML(novenaEnCurso.novena.image)}"
                                alt=""
                                class="library-continuity-image"
                                loading="lazy">
                        ` : ""}

                        <div class="library-continuity-content">
                            <strong>${escaparHTML(novenaEnCurso.novena.name)}</strong>
                            <span>
                                Día ${escaparHTML(String(novenaEnCurso.progreso?.dia || 1))}
                                de ${escaparHTML(String(APP_CONFIG.diasNovena || 9))}
                            </span>

                            <div class="library-progress" aria-label="Progreso de la novena">
                                <span style="width:${porcentaje}%"></span>
                            </div>

                            <button
                                class="btn btn-primary"
                                type="button"
                                data-action="continue-novena"
                                data-id="${escaparHTML(novenaEnCurso.novena.id)}">
                                Continuar oración
                            </button>
                        </div>
                    </article>
                </section>
            ` : ""}

            ${proxima ? `
                <section class="library-next" aria-labelledby="library-next-title">
                    <div class="library-section-heading">
                        <div>
                            <p class="library-kicker">Calendario</p>
                            <h3 id="library-next-title">Próximamente</h3>
                        </div>
                    </div>

                    <article class="library-next-card">
                        <div>
                            <span class="library-card-label">Próxima celebración</span>
                            <strong>${escaparHTML(proxima.novena.name)}</strong>
                            <span class="library-card-meta">
                                ${escaparHTML(
                                    formatearFechaLiturgica(proxima.novena.feast)
                                )}
                            </span>
                        </div>

                        <div class="library-next-count">
                            <strong>${diasProxima === 0 ? "Hoy" : diasProxima === 1 ? "Mañana" : String(diasProxima)}</strong>
                            ${diasProxima > 1 ? "<span>días</span>" : ""}
                        </div>

                        <button
                            class="btn btn-outline"
                            type="button"
                            data-action="open-novena"
                            data-id="${escaparHTML(proxima.novena.id)}">
                            Ver contenido
                        </button>
                    </article>
                </section>
            ` : ""}

            <section class="library-search-section" aria-labelledby="library-search-title">
                <div class="library-section-heading">
                    <div>
                        <p class="library-kicker">Buscar</p>
                        <h3 id="library-search-title">Encuentra un contenido</h3>
                    </div>
                </div>

                <div class="library-search-box">
                    <span aria-hidden="true">⌕</span>
                    <input
                        id="library-search"
                        type="search"
                        value="${escaparHTML(state.busqueda || "")}"
                        placeholder="Busca una novena, devoción o santo..."
                        autocomplete="off"
                        aria-label="Buscar contenido espiritual">
                </div>

                <div id="library-list" class="library-results">
                    ${state.busqueda?.trim()
                        ? renderResultadosBiblioteca(state.busqueda)
                        : `
                            <div class="library-search-hint">
                                <span aria-hidden="true">⌕</span>
                                <p>Escribe un nombre o una palabra para buscar dentro de la biblioteca.</p>
                            </div>
                        `}
                </div>
            </section>

            <section class="library-summary" aria-label="Contenido disponible">
                <span><strong>${contenido.length}</strong> contenidos</span>
                <span><strong>${santos.length}</strong> santos</span>
                <span><strong>${beatos.length}</strong> beatos</span>
                <span><strong>${maria.length}</strong> contenidos marianos</span>
                <span><strong>${devociones.length}</strong> devociones</span>
            </section>

        </section>
    `;
}

function renderResultadosBiblioteca(texto = "") {
    const termino = String(texto).trim();

    if (!termino) {
        return `
            <div class="library-search-hint">
                <span aria-hidden="true">⌕</span>
                <p>Escribe un nombre o una palabra para buscar dentro de la biblioteca.</p>
            </div>
        `;
    }

    const resultados = typeof buscarNovenas === "function"
        ? buscarNovenas(obtenerContenidoBiblioteca(), termino).slice(0, 8)
        : [];

    if (!resultados.length) {
        return `
            <div class="simple-panel library-no-results">
                <strong>No encontramos ese contenido.</strong>
                <p>Prueba con otro nombre, santo o palabra clave.</p>
            </div>
        `;
    }

    return resultados.map(item => `
        <button
            class="library-result"
            type="button"
            data-action="open-novena"
            data-id="${escaparHTML(item.id)}">

            ${item.image ? `
                <img
                    src="${escaparHTML(item.image)}"
                    alt=""
                    class="library-result-image"
                    loading="lazy">
            ` : `
                <span class="library-result-image library-image-placeholder" aria-hidden="true">✦</span>
            `}

            <span class="library-result-content">
                <strong>${escaparHTML(item.name)}</strong>
                <span>${escaparHTML(item.title || "")}</span>
                <small>${escaparHTML(item.feast?.text || "Contenido espiritual")}</small>
            </span>

            <span class="library-action-arrow" aria-hidden="true">›</span>
        </button>
    `).join("");
}

function actualizarBibliotecaPWA() {
    const contenedor = document.getElementById("library-list");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = renderResultadosBiblioteca(
        state.busqueda || ""
    );
}
