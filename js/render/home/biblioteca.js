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

            <section class="library-santidad" aria-labelledby="library-santidad-title">
<div class="library-section-heading"><div><p class="library-kicker">Una mirada diferente</p><h3 id="library-santidad-title">Los santos también tuvieron un camino</h3></div></div>
<div class="library-santidad-intro"><p>Los santos no fueron personas perfectas desde el comienzo. Cada uno recorrió una historia distinta: algunos descubrieron a Dios desde muy jóvenes; otros cambiaron de rumbo; otros aprendieron a amar en medio de la vida cotidiana y de la prueba.</p><p>Conocer sus historias no significa copiarlas. Significa descubrir cómo la fe, la esperanza y el amor pueden transformar una vida concreta.</p></div>
<div class="library-santidad-paths" aria-label="Distintas formas de recorrer un camino de fe">
<div class="library-santidad-path"><span class="library-santidad-path-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="7" r="3"/><path d="M6 20c.5-3.5 2.5-5.5 6-5.5s5.5 2 6 5.5"/></svg></span><div><strong>Comenzar desde joven</strong><p>Una vocación descubierta temprano.</p></div></div>
<div class="library-santidad-path"><span class="library-santidad-path-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 19 19 5"/><path d="M10 5h9v9"/></svg></span><div><strong>Recomenzar</strong><p>Una conversión o un cambio profundo de rumbo.</p></div></div>
<div class="library-santidad-path"><span class="library-santidad-path-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m4 10 8-6 8 6"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/></svg></span><div><strong>Vivir lo cotidiano</strong><p>La fe vivida en la familia, el trabajo y el servicio.</p></div></div>
<div class="library-santidad-path"><span class="library-santidad-path-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 19 12 5l7 14"/><path d="M8 16h8"/></svg></span><div><strong>Perseverar en la prueba</strong><p>Aprender a amar y servir en circunstancias difíciles.</p></div></div></div>
<div class="library-santidad-callout"><strong>Tu camino también está comenzando.</strong><p>No necesitas ser perfecto para comenzar a seguir a Cristo.</p></div>
</section>

<section class="library-today" aria-labelledby="library-today-title">
                <div class="library-section-heading">
                    <div>
                        <p class="library-kicker">Para hoy</p>
                        <h3 id="library-today-title">Un momento para acercarte a Dios</h3>
                    </div>
                    
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
                                data-action="${(state.catalogo || []).some(novena => novena.id === santoDelDia.id) ? "open-novena" : "open-profile"}"
                                data-id="${escaparHTML(santoDelDia.id)}">
                                ${(state.catalogo || []).some(novena => novena.id === santoDelDia.id) ? "Abrir novena" : "Conocerlo"}
                            </button>
                        </div>
                    </article>
                ` : `
                    <div class="library-empty-today">
                        <span aria-hidden="true" class="library-loading-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2"/></svg></span>
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
                        <span class="library-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 4.5h10a4 4 0 0 1 4 4V20H9a4 4 0 0 0-4-4V4.5Z"/><path d="M9 20a4 4 0 0 0-4-4"/><path d="M8.5 8h7M8.5 11h7"/></svg></span>
                        <span class="library-action-text">
                            <strong>Novenas</strong>
                            <small>Comienza o continúa una novena.</small>
                        </span>
                        <span class="library-action-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 5 7 7-7 7"/></svg></span>
                    </button>

                    <button class="library-action-card" type="button" data-route="devociones">
                        <span class="library-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 20.2S4.5 15.7 4.5 9.6A4.1 4.1 0 0 1 8.6 5.5c1.5 0 2.7.7 3.4 1.8.7-1.1 1.9-1.8 3.4-1.8a4.1 4.1 0 0 1 4.1 4.1c0 6.1-7.5 10.6-7.5 10.6Z"/></svg></span>
                        <span class="library-action-text">
                            <strong>Devociones</strong>
                            <small>Encuentra una forma de oración para este momento.</small>
                        </span>
                        <span class="library-action-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 5 7 7-7 7"/></svg></span>
                    </button>

                    <button class="library-action-card" type="button" data-route="maria">
                        <span class="library-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 4v16M7 7h10M7 17h10"/></svg></span>
                        <span class="library-action-text">
                            <strong>María</strong>
                            <small>Descubre advocaciones y su tradición devocional.</small>
                        </span>
                        <span class="library-action-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 5 7 7-7 7"/></svg></span>
                    </button>

                    <button class="library-action-card" type="button" data-route="santos">
                        <span class="library-action-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="7.5" r="3"/><path d="M5.5 20c.6-4 2.8-6 6.5-6s5.9 2 6.5 6"/></svg></span>
                        <span class="library-action-text">
                            <strong>Conocer santos</strong>
                            <small>Explora vidas, vocaciones y testimonios de santidad.</small>
                        </span>
                        <span class="library-action-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 5 7 7-7 7"/></svg></span>
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
                    <span aria-hidden="true" class="library-search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.8" cy="10.8" r="5.8"/><path d="m15.2 15.2 4.2 4.2"/></svg></span>
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
                                <span aria-hidden="true" class="library-search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.8" cy="10.8" r="5.8"/><path d="m15.2 15.2 4.2 4.2"/></svg></span>
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

function tieneNovenaDisponibleBiblioteca(item) {
    if (!item?.id) {
        return false;
    }

    if (
        Number(item?.novena?.days) > 0 ||
        (Array.isArray(item?.days) && item.days.length > 0)
    ) {
        return true;
    }

    return Array.isArray(state.catalogo) &&
        state.catalogo.some(novena => novena?.id === item.id);
}

function renderResultadosBiblioteca(texto = "") {
    const termino = String(texto).trim();

    if (!termino) {
        return `
            <div class="library-search-hint">
                <span aria-hidden="true" class="library-search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.8" cy="10.8" r="5.8"/><path d="m15.2 15.2 4.2 4.2"/></svg></span>
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
            data-action="${tieneNovenaDisponibleBiblioteca(item) ? "open-novena" : "open-profile"}"
            data-id="${escaparHTML(item.id)}"
            aria-label="${tieneNovenaDisponibleBiblioteca(item) ? "Abrir novena" : "Conocer"} ${escaparHTML(item.name)}">

            ${item.image ? `
                <img
                    src="${escaparHTML(item.image)}"
                    alt=""
                    class="library-result-image"
                    loading="lazy">
            ` : `
                <span class="library-result-image library-image-placeholder" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/></svg></span>
            `}

            <span class="library-result-content">
                <strong>${escaparHTML(item.name)}</strong>
                <span>${escaparHTML(item.title || "")}</span>
                <small>${escaparHTML(item.feast?.text || "Contenido espiritual")}</small>
            </span>

            <span class="library-action-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 5 7 7-7 7"/></svg></span>
        </button>
    `).join("");
}

function renderExploradorBiblioteca() {
    const explorador = state.bibliotecaExplorador || {};
    if (!explorador.modo) return "";

    const definiciones = explorador.modo === "virtud"
        ? BIBLIOTECA_VIRTUDES
        : BIBLIOTECA_INTENCIONES;

    const titulo = explorador.modo === "virtud"
        ? "Elige una virtud"
        : "¿Qué estás viviendo?";

    const seleccion = obtenerDefinicionBiblioteca(
        explorador.modo,
        explorador.seleccion
    );

    const opciones = definiciones.map(item => `
        <button
            class="library-discover-chip ${item.id === explorador.seleccion ? "is-selected" : ""}"
            type="button"
            data-action="library-explorer-select"
            data-mode="${escaparHTML(explorador.modo)}"
            data-id="${escaparHTML(item.id)}">
            <span aria-hidden="true">${escaparHTML(item.icon)}</span>
            ${escaparHTML(item.label)}
        </button>
    `).join("");

    return `
        <div class="library-discover-panel">
            <div class="library-discover-panel-heading">
                <strong>${titulo}</strong>
                <button type="button" class="library-discover-clear"
                    data-action="library-explorer-reset">Cerrar</button>
            </div>
            <div class="library-discover-chips">${opciones}</div>

            ${explorador.error ? `
                <div class="library-discover-error" role="alert" aria-live="assertive">
                    <strong>No pudimos completar la búsqueda.</strong>
                    <p>${escaparHTML(explorador.error)}</p>
                    <button
                        type="button"
                        class="btn btn-outline"
                        data-action="library-explorer-select"
                        data-mode="${escaparHTML(explorador.modo)}"
                        data-id="${escaparHTML(explorador.seleccion || "")}">
                        Intentar nuevamente
                    </button>
                </div>
            ` : explorador.cargando ? `
                <div class="library-discover-loading" role="status">
                    <span class="library-loading-dot" aria-hidden="true">✦</span>
                    <p>Buscando entre los contenidos de Amigos del Cielo…</p>
                </div>
            ` : seleccion && explorador.resultados ? `
                ${renderResultadosRelacionBiblioteca(seleccion, explorador.resultados)}
            ` : seleccion ? `
                <div class="library-discover-hint">
                    <strong>${escaparHTML(seleccion.label)}</strong>
                    <p>Selecciona esta intención para conocer los testimonios relacionados.</p>
                </div>
            ` : `
                <div class="library-discover-hint">
                    <p>Elige una opción para comenzar.</p>
                </div>
            `}
        </div>
    `;
}

function renderResultadosRelacionBiblioteca(definicion, resultados) {
    if (!resultados.length) {
        return `
            <div class="library-discover-empty">
                <strong>Aún no encontramos una relación suficientemente clara.</strong>
                <p>Podemos ampliar esta categoría cuando la ficha de un santo tenga una relación documentada.</p>
            </div>
        `;
    }

    return `
        <div class="library-related-heading">
            <div>
                <span class="library-kicker">Testimonios que pueden acompañarte</span>
                <strong>${escaparHTML(definicion.label)}</strong>
            </div>
            <small>${resultados.length} resultados relacionados</small>
        </div>

        <div class="library-related-list">
            ${resultados.map(resultado => {
                const item = resultado.item;
                const accion = tieneNovenaDisponibleBiblioteca(item)
                    ? "open-novena"
                    : "open-profile";
                const razon = resultado.coincidencias.includes("intervenciones")
                    ? "Relacionado con su vida o misión"
                    : resultado.coincidencias.includes("tradición devocional")
                        ? "Relacionado con una tradición de devoción"
                        : "Relacionado con sus virtudes";

                return `
                    <article class="library-related-card">
                        ${item.image ? `
                            <img src="${escaparHTML(item.image)}"
                                alt="" class="library-related-image" loading="lazy">
                        ` : `<span class="library-related-image library-image-placeholder" aria-hidden="true">✦</span>`}
                        <div class="library-related-content">
                            <strong>${escaparHTML(item.name)}</strong>
                            <span>${escaparHTML(item.title || "Testimonio de vida cristiana")}</span>
                            <small>${escaparHTML(razon)}</small>
                            <button type="button" class="btn btn-outline library-related-button"
                                data-action="${accion}" data-id="${escaparHTML(item.id)}">
                                ${accion === "open-novena" ? "Ver novena" : "Conocerlo"}
                            </button>
                        </div>
                    </article>
                `;
            }).join("")}
        </div>
    `;
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
