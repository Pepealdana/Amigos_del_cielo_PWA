/* ==========================================
   CATÁLOGO V2
   Amigos del Cielo
========================================== */

function renderCatalogoV2(\n    seccion,\n    pais = state.paisCatalogo || "ALL",\n    grupo = state.grupoCatalogo || "ALL"\n) {
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

    const gruposDisponibles = obtenerGruposCatalogo(datos.catalogo);
    const filtroGrupo =
        gruposDisponibles.some(item => item.id === grupo)
            ? grupo
            : "ALL";

    const termino = String(state.busquedaCatalogo || "").trim().toLocaleLowerCase("es");

    const catalogoFiltrado = datos.catalogo.filter(item => {
        const territorial = item.territorial || {};
        const relaciones = [
            ...(territorial.origin || []),
            ...(territorial.historicalLinks || []),
            ...(territorial.specialDevotion || [])
        ];

        const coincidePais =
            !datos.permitePais ||
            filtroPais === "ALL" ||
            relaciones.includes(filtroPais);

        const gruposItem = obtenerGruposItemCatalogo(item);
        const coincideGrupo =
            filtroGrupo === "ALL" ||
            gruposItem.includes(filtroGrupo);

        const textoItem = [
            item.name,
            item.title,
            item.description,
            ...(item.tags || []),
            ...(item.searchTerms || [])
        ]
            .filter(Boolean)
            .join(" ")
            .toLocaleLowerCase("es");

        const coincideBusqueda =
            !termino ||
            textoItem.includes(termino);

        return coincidePais && coincideGrupo && coincideBusqueda;
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
                    : renderCatalogoVacio(filtroPais, termino)}
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

function renderBusquedaCatalogo(valor = "") {
    return `
        <div class="catalog-search">
            <label for="catalog-search-input">Buscar en este catálogo</label>
            <div class="catalog-search-box">
                <span aria-hidden="true">⌕</span>
                <input
                    id="catalog-search-input"
                    type="search"
                    value="${escaparHTML(valor)}"
                    placeholder="Busca por nombre, título o palabra clave"
                    autocomplete="off"
                    spellcheck="false">
            </div>
        </div>
    `;
}

function obtenerGruposItemCatalogo(item) {
    return Array.isArray(item?.groups)
        ? item.groups
        : [];
}

function obtenerGruposCatalogo(catalogo = []) {
    const grupos = new Map();

    for (const item of catalogo) {
        for (const id of obtenerGruposItemCatalogo(item)) {
            if (!grupos.has(id)) {
                grupos.set(id, {
                    id,
                    label: obtenerNombreGrupoCatalogo(id)
                });
            }
        }
    }

    return Array.from(grupos.values());
}

function obtenerNombreGrupoCatalogo(id) {
    const nombres = {
        "devocion-extendida": "Devoción extendida",
        "latinoamericanos": "Latinoamericanos",
        "martires": "Mártires",
        "doctores": "Doctores de la Iglesia",
        "fundadores": "Fundadores",
        "jovenes": "Santos jóvenes",
        "franciscanos": "Familia franciscana",
        "apostoles": "Apóstoles"
    };

    return nombres[id] || id;
}

function renderFiltrosGrupoCatalogo(grupos = [], grupoActivo = "ALL") {
    if (!grupos.length) {
        return "";
    }

    return `
        <div class="catalog-group-filter">
            <div class="catalog-country-label">
                <span>Explorar por tema</span>
                <small>${grupoActivo === "ALL"
                    ? "Todos"
                    : escaparHTML(
                        grupos.find(item => item.id === grupoActivo)?.label ||
                        "Grupo seleccionado"
                    )}</small>
            </div>
            <div class="catalog-country-nav" role="group" aria-label="Filtrar por tema">
                <button
                    class="catalog-country-chip ${grupoActivo === "ALL" ? "active" : ""}"
                    type="button"
                    data-group-filter="ALL">
                    Todos
                </button>
                ${grupos.map(grupo => `
                    <button
                        class="catalog-country-chip ${grupo.id === grupoActivo ? "active" : ""}"
                        type="button"
                        data-group-filter="${escaparHTML(grupo.id)}">
                        ${escaparHTML(grupo.label)}
                    </button>
                `).join("")}
            </div>
        </div>
    `;
}

function renderCatalogoVacio(pais, termino = "") {
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
