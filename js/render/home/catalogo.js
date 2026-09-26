/* ==========================================
   CATÁLOGO V2
   Amigos del Cielo
========================================== */

function renderCatalogoV2(seccion, pais = state.paisCatalogo || "ALL") {
    const configuracion = {
        santos: {
            titulo: "Santos",
            descripcion: "Santos canonizados y testimonios de santidad para conocer, orar y seguir.",
            catalogo: state.catalogosV2.santos || [],
            icono: "✦",
            permitePais: true
        },
        maria: {
            titulo: "María",
            descripcion: "Advocaciones marianas de Hispanoamérica y otras tradiciones de la Iglesia.",
            catalogo: state.catalogosV2.maria || [],
            icono: "✧",
            permitePais: true
        },
        novenas: {
            titulo: "Novenas",
            descripcion: "Novenas disponibles para comenzar o continuar tu camino de oración.",
            catalogo: (state.catalogo || []).map(item => ({
                ...item,
                status: item.status === "draft" ? "pending" : "published",
                sourceFile: item.file
            })),
            icono: "☼",
            permitePais: false
        },
        devociones: {
            titulo: "Devociones",
            descripcion: "Devociones y celebraciones de oración conservadas en Amigos del Cielo.",
            catalogo: (state.catalogosV2.devociones || [])
                .filter(item => (item.category || "devociones") === "devociones"),
            icono: "♡",
            permitePais: false
        },
        todos: {
            titulo: "Todos",
            descripcion: "Todo el contenido disponible reunido en un solo lugar.",
            catalogo: state.catalogo || [],
            icono: "✦",
            permitePais: false
        }
    };

    const datos = configuracion[seccion] || configuracion.novenas;

    const codigosDisponibles = new Set();

    if (datos.permitePais) {
        for (const item of datos.catalogo) {
            const territorial = item.territorial || {};

            [
                ...(territorial.origin || []),
                ...(territorial.historicalLinks || []),
                ...(territorial.specialDevotion || [])
            ].forEach(codigo => codigosDisponibles.add(codigo));
        }
    }

    const filtroPais =
        datos.permitePais &&
        pais !== "ALL" &&
        codigosDisponibles.has(pais)
            ? pais
            : "ALL";

    const catalogoFiltrado = datos.catalogo.filter(item => {
        if (!datos.permitePais || filtroPais === "ALL") {
            return true;
        }

        const territorial = item.territorial || {};
        const relaciones = [
            ...(territorial.origin || []),
            ...(territorial.historicalLinks || []),
            ...(territorial.specialDevotion || [])
        ];

        return relaciones.includes(filtroPais);
    });

    const publicados = catalogoFiltrado.filter(item => item.status === "published");
    const pendientes = catalogoFiltrado.filter(item => item.status === "pending");

    return `
        <section class="catalog-page page-shell">
            <header class="catalog-head">
                <span class="catalog-kicker" aria-hidden="true">${datos.icono}</span>
                <div>
                    <h2>${escaparHTML(datos.titulo)}</h2>
                    <p>${escaparHTML(datos.descripcion)}</p>
                </div>
            </header>

            <nav class="catalog-section-nav" aria-label="Explorar">
                ${[
                    ["todos", "Todos"],
                    ["santos", "Santos"],
                    ["maria", "María"],
                    ["novenas", "Novenas"],
                    ["devociones", "Devociones"]
                ].map(([ruta, label]) => `
                    <button
                        class="catalog-section-chip ${ruta === seccion ? "active" : ""}"
                        type="button"
                        data-route="${ruta}">
                        ${label}
                    </button>
                `).join("")}
            </nav>

            ${datos.permitePais ? renderFiltrosPais(filtroPais, datos.catalogo) : ""}

            <div class="catalog-summary">
                <span>${publicados.length} disponibles</span>
                ${pendientes.length ? `<span>${pendientes.length} planificados</span>` : ""}
            </div>

            <div class="catalog-grid">
                ${publicados.length
                    ? publicados.map(item => renderTarjetaCatalogoV2(item, seccion)).join("")
                    : renderCatalogoVacio(filtroPais)}
            </div>

            ${pendientes.length ? `
                <details class="catalog-pending">
                    <summary>Próximamente · ${pendientes.length}</summary>
                    <div class="catalog-pending-list">
                        ${pendientes.map(item => `
                            <span class="catalog-pending-item">
                                ${escaparHTML(item.name)}
                                <small>Prioridad ${escaparHTML(item.priority || "media")}</small>
                            </span>
                        `).join("")}
                    </div>
                </details>
            ` : ""}
        </section>
    `;
}

function renderFiltrosPais(paisSeleccionado, catalogo = []) {
    const todosLosPaises = state.catalogosV2.paises || [];
    const codigosConContenido = new Set();

    for (const item of catalogo) {
        const territorial = item.territorial || {};

        [
            ...(territorial.origin || []),
            ...(territorial.historicalLinks || []),
            ...(territorial.specialDevotion || [])
        ].forEach(codigo => codigosConContenido.add(codigo));
    }

    const paises = todosLosPaises.filter(
        pais => codigosConContenido.has(pais.id)
    );

    const paisActivo =
        paisSeleccionado === "ALL" ||
        paises.some(pais => pais.id === paisSeleccionado)
            ? paisSeleccionado
            : "ALL";

    return `
        <div class="catalog-country-filter">
            <div class="catalog-country-label">
                <span>Explorar vínculos por país</span>
                <small>${paisActivo === "ALL"
                    ? "Todo el catálogo"
                    : escaparHTML(
                        paises.find(p => p.id === paisActivo)?.name ||
                        "País seleccionado"
                    )}</small>
            </div>
            <p class="catalog-country-note">El país indica un vínculo histórico, de origen o de devoción; no limita la devoción a ese país.</p>

            <div class="catalog-country-nav" role="group" aria-label="Filtrar por país">
                <button
                    class="catalog-country-chip ${paisActivo === "ALL" ? "active" : ""}"
                    type="button"
                    data-country-filter="ALL">
                    Todos
                </button>

                ${paises.map(pais => `
                    <button
                        class="catalog-country-chip ${pais.id === paisActivo ? "active" : ""}"
                        type="button"
                        data-country-filter="${escaparHTML(pais.id)}"
                        title="${escaparHTML(pais.name)}">
                        <span aria-hidden="true">${pais.bandera}</span>
                        ${escaparHTML(pais.name)}
                    </button>
                `).join("")}
            </div>
        </div>
    `;
}

function renderCatalogoVacio(pais) {
    const nombrePais = (state.catalogosV2.paises || [])
        .find(item => item.id === pais)?.name;

    const texto = nombrePais
        ? `Todavía no hay contenidos publicados específicamente asociados a ${nombrePais} en esta sección.`
        : "Todavía no hay contenidos publicados en esta sección.";

    return `
        <div class="catalog-empty">
            <span aria-hidden="true">✦</span>
            <p>${escaparHTML(texto)}</p>
        </div>
    `;
}

function obtenerEtiquetaCatalogo(item) {
    const categoria = String(item?.category || "").toLowerCase();

    const etiquetas = {
        santos: "Santo",
        maria: "Advocación mariana",
        devociones: "Devoción",
        beatas: "Beata"
    };

    return etiquetas[categoria] || item?.category || "Novena";
}

function obtenerDatoSecundarioCatalogo(item, seccion) {
    if (seccion === "santos") {
        const registro = state.catalogo.find(novena => novena.id === item.id);
        const fiesta = registro?.feast?.text;

        if (fiesta) {
            return `Fiesta: ${fiesta}`;
        }

        return "Santo";
    }

    if (seccion === "todos") {
        return obtenerEtiquetaCatalogo(item);
    }

    if (seccion === "maria") {
        return "Advocación mariana";
    }

    if (seccion === "devociones") {
        return "Devoción";
    }

    return item.status === "published"
        ? "Disponible"
        : "Próximamente";
}

function renderTarjetaCatalogoV2(item, seccion) {
    const imagen = item.image ||
        (item.sourceFile
            ? state.catalogo.find(n => n.id === item.id)?.image
            : "");

    const accion = item.sourceFile
        ? `data-action="open-novena" data-id="${escaparHTML(item.id)}"`
        : "";

    const territorial = item.territorial || {};
    const paises = [
        ...(territorial.origin || []),
        ...(territorial.historicalLinks || []),
        ...(territorial.specialDevotion || [])
    ].filter((codigo, index, lista) => lista.indexOf(codigo) === index);

    const paisesDisponibles = (state.catalogosV2.paises || []);
    const etiquetasPais = paises
        .map(codigo => paisesDisponibles.find(p => p.id === codigo)?.name)
        .filter(Boolean);

    return `
        <button
            class="catalog-card"
            type="button"
            ${accion}
            ${item.sourceFile ? "" : "disabled"}>
            ${imagen ? `
                <img
                    src="${escaparHTML(imagen)}"
                    alt=""
                    class="catalog-card-image"
                    loading="lazy">
            ` : `
                <span class="catalog-card-placeholder" aria-hidden="true">✦</span>
            `}
            <span class="catalog-card-body">
                <strong>${escaparHTML(item.name)}</strong>
                <small>
                    ${seccion === "maria"
                        ? escaparHTML(etiquetasPais.join(" · ") || "Tradición mariana")
                        : escaparHTML(obtenerDatoSecundarioCatalogo(item, seccion))}
                </small>
            </span>
        </button>
    `;
}
