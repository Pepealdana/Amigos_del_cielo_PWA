/* ==========================================
   MI CAMINO
   Amigos del Cielo
========================================== */

function obtenerDatosAmigoDelCielo(patronoAnual = {}) {
    const anio = new Date().getFullYear();
    const registro = patronoAnual?.[String(anio)];

    if (!registro?.santoId) return null;

    const santo = (state.catalogosV2?.santos || [])
        .find(item => item?.id === registro.santoId);

    if (!santo) return null;

    return { anio, registro, santo };
}

function renderCamino(
    catalogo = [],
    progreso = {},
    favoritos = [],
    patronoAnual = {}
) {
    const patron = obtenerDatosAmigoDelCielo(patronoAnual);

    const entradasProgreso = Object.entries(progreso || {})
        .filter(([id]) => buscarNovenaPorId(catalogo, id))
        .sort((a, b) =>
            new Date(b[1]?.fecha || 0).getTime() -
            new Date(a[1]?.fecha || 0).getTime()
        );

    const novenasEnCurso = entradasProgreso.filter(
        ([, datos]) => datos?.completada !== true
    ).length;

    const novenasCompletadas = entradasProgreso.filter(
        ([, datos]) => datos?.completada === true
    ).length;

    const catalogos = state.catalogosV2 || {};

    const resolverCompletados = (lista = []) => (Array.isArray(lista) ? lista : [])
        .map(item => ({
            item,
            progreso: state.progreso?.[item?.id],
            historial: typeof obtenerHistorialCompletaciones === "function"
                ? obtenerHistorialCompletaciones(item?.id)
                : []
        }))
        .filter(({ item, historial }) => item?.id && historial.length > 0);

    const obtenerFechaUltimaCompletacion = registro =>
        registro?.historial?.length
            ? registro.historial[registro.historial.length - 1]?.fechaFinalizacion
            : registro?.progreso?.fechaFinalizacion || registro?.progreso?.fecha || 0;

    const ordenarPorUltimaCompletacion = (a, b) =>
        new Date(obtenerFechaUltimaCompletacion(b)).getTime() -
        new Date(obtenerFechaUltimaCompletacion(a)).getTime();

    const amigosDelCielo = [
        ...resolverCompletados(catalogos.santos),
        ...resolverCompletados(catalogos.beatos)
    ].sort(ordenarPorUltimaCompletacion);

    const jardinDeMaria = resolverCompletados(catalogos.maria)
        .sort(ordenarPorUltimaCompletacion);

    const misDevociones = resolverCompletados(catalogos.devociones)
        .sort(ordenarPorUltimaCompletacion);

    const renderCaminoCollection = (items, tipo, titulo, descripcion) => {
        const coleccion = Array.isArray(items) ? items : [];
        if (!coleccion.length) return "";

        return `
            <section class="camino-collection camino-collection-${tipo}" aria-labelledby="camino-collection-${tipo}">
                <div class="camino-collection-heading">
                    <div>
                        <h3 id="camino-collection-${tipo}">${titulo}</h3>
                        <p>${descripcion}</p>
                    </div>
                    <span class="camino-collection-count" aria-label="${coleccion.length} elementos">${coleccion.length}</span>
                </div>
                <div class="camino-collection-row" role="list">
                    ${coleccion.map(({ item, progreso, historial }) => `
                        <button class="camino-friend-card" type="button" role="listitem"
                            data-action="open-camino-profile" data-id="${escaparHTML(item.id)}"
                            aria-label="Conocer a ${escaparHTML(item.name)}">
                            <span class="camino-friend-portrait">
                                ${item.image
                                    ? `<img src="${escaparHTML(item.image)}" alt="" loading="lazy">`
                                    : `<span class="camino-friend-placeholder" aria-hidden="true">✦</span>`}
                            </span>
                            <span class="camino-friend-name">${escaparHTML(item.name)}</span>
                            <span class="camino-friend-meta">${historial.length > 1 ? historial.length + " novenas" : (progreso?.completada === false ? "En curso" : "1 novena")}</span>
                        </button>
                    `).join("")}
                </div>
            </section>
        `;
    };

    const coleccionesHTML = [
        renderCaminoCollection(amigosDelCielo, "amigos", "Mi círculo de amigos", "Santos y beatos con quienes has caminado."),
        renderCaminoCollection(jardinDeMaria, "maria", "Jardín de María", "Advocaciones marianas que ya forman parte de tu camino."),
        renderCaminoCollection(misDevociones, "devociones", "Mis devociones", "Devociones cuyas novenas ya has recorrido.")
    ].join("");

    const estadoCirculoHTML = amigosDelCielo.length
        ? ""
        : `
            <section class="camino-circle-empty" aria-labelledby="camino-circle-empty-title">
                <div class="camino-circle-empty-symbol" aria-hidden="true">✦</div>
                <div>
                    <h3 id="camino-circle-empty-title">Tu círculo aún está vacío</h3>
                    <p>
                        Cuando completes una novena de un santo o beato,
                        aparecerá aquí como parte de tu camino y permanecerá aunque vuelvas a rezarla.
                    </p>
                    <button class="btn btn-outline" type="button" data-route="santos">
                        Conocer santos
                    </button>
                </div>
            </section>
        `;

    const anioActual = new Date().getFullYear();

    const historialPatronos = Object.entries(patronoAnual || {})
        .map(([anio, registro]) => ({
            anio: Number(anio),
            santo: (state.catalogosV2?.santos || [])
                .find(item => item?.id === registro?.santoId)
        }))
        .filter(item => item.anio < anioActual && item.santo)
        .sort((a, b) => b.anio - a.anio);

    const historialHTML = historialPatronos.length
        ? `
            <section class="annual-patron-history" aria-labelledby="patron-history-title">

                <h3 id="patron-history-title">
                    Mis amigos del cielo de años anteriores
                </h3>

                <div class="annual-patron-history-list">
                    ${historialPatronos.map(item => `
                        <article class="annual-patron-history-item">

                            ${item.santo.image ? `
                                <img
                                    src="${escaparHTML(item.santo.image)}"
                                    alt=""
                                    class="annual-patron-history-image"
                                    loading="lazy">
                            ` : ""}

                            <div>
                                <strong>${escaparHTML(String(item.anio))}</strong>
                                <span>${escaparHTML(item.santo.name)}</span>
                            </div>

                        </article>
                    `).join("")}
                </div>

            </section>
        `
        : "";

    return `
        <section class="page-shell camino-page">

            <header class="page-header">
                <p class="section-kicker">Tu recorrido</p>
                <h2 class="page-title">Mi camino</h2>
                <p class="page-subtitle">
                    Un espacio para conservar tus favoritos, tu progreso y el santo que
                    te acompaña este año mientras sigues tu propio camino.
                </p>
            </header>

            <section class="annual-patron-card">

                <div class="annual-patron-header">
                    <span class="annual-patron-kicker">
                        Amigo del cielo para el año:
                    </span>
                    <span class="annual-patron-year">
                        ${new Date().getFullYear()}
                    </span>
                </div>

                ${patron ? `
                    <div class="annual-patron-result">

                        ${patron.santo.image ? `
                            <img
                                src="${escaparHTML(patron.santo.image)}"
                                alt="${escaparHTML(patron.santo.name)}"
                                class="annual-patron-image"
                                loading="eager">
                        ` : `
                            <div
                                class="annual-patron-placeholder"
                                aria-hidden="true">
                                ✦
                            </div>
                        `}

                        <div class="annual-patron-content">

                            <p class="annual-patron-label">
                                Tu amigo del cielo para ${patron.anio}
                            </p>

                            <h3>
                                ${escaparHTML(patron.santo.name)}
                            </h3>

                            ${patron.santo.title ? `
                                <p class="annual-patron-title">
                                    ${escaparHTML(patron.santo.title)}
                                </p>
                            ` : ""}

                            ${patron.santo.feast?.text ? `
                                <p class="annual-patron-feast">
                                    ${escaparHTML(patron.santo.feast.text)}
                                </p>
                            ` : ""}

                            <p class="annual-patron-date">
                                Recibido el
                                ${escaparHTML(
                                    new Date(patron.registro.fechaAsignacion)
                                        .toLocaleDateString("es-CO", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })
                                )}
                            </p>

                            <button
                                class="btn btn-primary"
                                type="button"
                                data-action="open-patron-profile"
                                data-id="${escaparHTML(patron.santo.id)}">
                                Conocer a mi amigo del cielo
                            </button>

                        </div>

                    </div>

                ` : `

                    <div class="annual-patron-intro">

                        <div class="annual-patron-symbol" aria-hidden="true">
                            ✦
                        </div>

                        <h3>
                            Un amigo para caminar este año
                        </h3>

                        <p>
                            Antes de realizar el sorteo, haz una breve
                            oración y pide al Espíritu Santo que te ayude
                            a recibir este momento con fe.
                        </p>

                        <div class="annual-patron-prayer">
                            <p>
                                Espíritu Santo, acompáñame en este momento.
                                Abre mi corazón para recibir con fe a este
                                amigo del cielo, conocer su vida, aprender de
                                sus virtudes y caminar más cerca de Cristo.
                                Amén.
                            </p>
                        </div>

                        <button
                            class="btn btn-accent"
                            type="button"
                            data-action="draw-patron">
                            Conocer a mi amigo del cielo
                        </button>

                        <p class="annual-patron-tradition">
                            Esta experiencia está inspirada en una práctica
                            que Santa Faustina recoge en su Diario y que hoy
                            continúa promoviendo Faustinum: recibir por sorteo
                            un patrono especial para acompañar el año.
                        </p>

                    </div>

                `}

            </section>

            ${historialHTML}

            <section class="camino-summary" style="display:grid !important;grid-template-columns:repeat(2,minmax(0,1fr)) !important;gap:12px !important;width:100% !important;max-width:760px !important;margin:1.5rem auto 2rem !important;">

                <article class="camino-summary-card camino-summary-favorites" style="min-width:0 !important;height:225px !important;padding:12px !important;box-sizing:border-box !important;">
                    <div class="camino-summary-heading">
                        <span class="camino-summary-icon" aria-hidden="true">
                            <svg style="width:22px;height:22px;display:block;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.8 2.4Z"/>
                            </svg>
                        </span>
                        <div>
                            <strong>${Array.isArray(favoritos) ? favoritos.length : 0}</strong>
                            <span>Favoritos</span>
                        </div>
                    </div>

                    <p class="camino-summary-description">
                        Novenas y contenidos que has guardado para volver a ellos.
                    </p>

                    <button class="btn btn-outline" type="button" data-route="favoritas">
                        Ver favoritos
                    </button>
                </article>

                <article class="camino-summary-card camino-summary-progress" style="min-width:0 !important;height:225px !important;padding:12px !important;box-sizing:border-box !important;">
                    <div class="camino-summary-heading">
                        <span class="camino-summary-icon" aria-hidden="true">
                            <svg style="width:22px !important;height:22px !important;display:block !important;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="8.5"/>
                                <path d="M12 7v5l3.2 2"/>
                            </svg>
                        </span>
                        <div>
                            <strong>Progreso</strong>
                            <span>Mis novenas</span>
                        </div>
                    </div>

                    <div class="camino-summary-progress-counts">
                        <span>
                            <strong>${novenasEnCurso}</strong>
                            <small>En curso</small>
                        </span>
                        <span>
                            <strong>${novenasCompletadas}</strong>
                            <small>Completadas</small>
                        </span>
                    </div>

                    <button class="btn btn-outline" type="button" data-route="progreso">
                        Ver mi progreso
                    </button>
                </article>

            </section>

            ${estadoCirculoHTML}

            ${coleccionesHTML}

            <section class="camino-explorer library-discover" aria-labelledby="camino-explorer-title">

                <div class="camino-explorer-inner">
                    <div class="camino-explorer-hero">
                    <div class="camino-explorer-hero-icon" aria-hidden="true">✦</div>
                    <div>
                        <p class="library-kicker">Conoce un camino</p>
                        <h3 id="camino-explorer-title">¿Qué quieres aprender de un santo?</h3>
                        <p>
                            La santidad no se queda en una idea. Se descubre en decisiones,
                            gestos y formas concretas de amar a Dios y a los demás.
                        </p>
                    </div>
                </div>

                <div class="library-discover-modes" aria-label="Formas de explorar">
                    <button
                        class="library-discover-mode ${state.bibliotecaExplorador?.modo === "intencion" ? "is-active" : ""}"
                        type="button"
                        data-action="library-explorer-mode"
                        data-mode="intencion"
                        aria-pressed="${state.bibliotecaExplorador?.modo === "intencion"}">
                        <span class="library-discover-mode-icon" aria-hidden="true">⌁</span>
                        <span>
                            <strong>Desde lo que estoy viviendo</strong>
                            <small>Encuentra testimonios relacionados con una situación.</small>
                        </span>
                    </button>

                    <button
                        class="library-discover-mode ${state.bibliotecaExplorador?.modo === "virtud" ? "is-active" : ""}"
                        type="button"
                        data-action="library-explorer-mode"
                        data-mode="virtud"
                        aria-pressed="${state.bibliotecaExplorador?.modo === "virtud"}">
                        <span class="library-discover-mode-icon" aria-hidden="true">✦</span>
                        <span>
                            <strong>Desde una virtud</strong>
                            <small>Elige una virtud y descubre cómo la vivieron otros.</small>
                        </span>
                    </button>
                </div>

                    ${renderExploradorBiblioteca()}
                </div>

            </section>


        </section>
    `;
}