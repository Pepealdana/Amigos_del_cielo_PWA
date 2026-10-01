/* ==========================================
   CATÁLOGO V2
   Amigos del Cielo
========================================== */

function renderCatalogoV2(
    seccion,
    pais = state.paisCatalogo || "ALL",
    grupo = state.grupoCatalogo || "ALL"
) {
    const configuracion = {
        santos: {
            titulo: "Santos",
            descripcion: "Santos canonizados y testimonios de santidad para conocer, orar y seguir.",
            catalogo: state.catalogosV2.santos || [],
            icono: "✦",
            permitePais: true
        },
        beatos: {
            titulo: "Beatos",
            descripcion: "Beatos reconocidos por la Iglesia, con especial presencia en la tradición hispanoamericana.",
            catalogo: state.catalogosV2.beatos || [],
            icono: "✧",
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
            catalogo: obtenerCatalogoNovenasUnificado(),
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
            catalogo: obtenerCatalogoMaestroUnificado(),
            icono: "✦",
            permitePais: true
        }
    };

    const datos = configuracion[seccion] || configuracion.novenas;

    if (state.catalogoFiltroSeccion !== seccion) {
        state.paisCatalogo = "ALL";
        state.grupoCatalogo = "ALL";
        state.catalogoFiltroSeccion = seccion;
        pais = "ALL";
        grupo = "ALL";
    }

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

    const publicadosBase = catalogoFiltrado.filter(item => item.status === "published");
    const pendientes = catalogoFiltrado.filter(item => item.status === "pending");

    /*
     * El catálogo no es un ranking. Al entrar a una sección se crea una
     * nueva secuencia aleatoria para favorecer el descubrimiento de otros
     * contenidos. Durante los rerenders internos se conserva esa secuencia.
     */
    if (state.catalogoOrdenSeccion !== seccion) {
        state.catalogoOrdenSeccion = seccion;
        state.catalogoOrden = mezclarCatalogoParaDescubrimiento(publicadosBase);
    }

    const idsVisibles = new Set(publicadosBase.map(item => item.id));
    const publicados = (Array.isArray(state.catalogoOrden) ? state.catalogoOrden : publicadosBase)
        .filter(item => idsVisibles.has(item.id));

    return `
        <section class="catalog-page page-shell">
            <div class="catalog-context-nav">
                <button
                    class="context-back"
                    type="button"
                    data-route="biblioteca"
                    aria-label="Volver a la Biblioteca">
                    ← Volver a Biblioteca
                </button>
            </div>

            <header class="catalog-head">
                <div>
                    <h2>${escaparHTML(datos.titulo)}</h2>
                    <p>${escaparHTML(datos.descripcion)}</p>
                </div>
            </header>

            <nav class="catalog-section-nav" aria-label="Explorar">
                ${[
                    ["todos", "Todos"],
                    ["santos", "Santos"],
                    ["beatos", "Beatos"],
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

            ${renderBusquedaCatalogo(state.busquedaCatalogo || "")}

            ${renderFiltrosGrupoCatalogo(gruposDisponibles, filtroGrupo)}

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


function renderFiltrosPais() {
    // El filtro territorial se integra en el panel único de filtros.
    return "";
}

function renderFiltrosGrupoCatalogo(grupos = [], grupoActivo = "ALL") {
    const paisActivo = state.paisCatalogo || "ALL";
    const seccionActual = ["todos", "santos", "beatos", "maria"].includes(router?.rutaActual)
        ? router.rutaActual
        : "";
    if (!seccionActual && !grupos.length) {
        return "";
    }

    const filtrosActivos = [];

    if (seccionActual && paisActivo !== "ALL") {
        const pais = obtenerNombrePaisCatalogo(paisActivo);

        if (pais) {
            filtrosActivos.push(
                '<button class="catalog-active-filter" type="button" ' +
                'data-filter-remove="country" ' +
                'aria-label="Quitar filtro de país ' + escaparHTML(pais) + '">' +
                '<span>País: ' + escaparHTML(pais) + '</span>' +
                '<span aria-hidden="true">×</span>' +
                '</button>'
            );
        }
    }

    if (grupoActivo !== "ALL") {
        const grupo = grupos.find(item => item.id === grupoActivo);

        if (grupo) {
            filtrosActivos.push(
                '<button class="catalog-active-filter" type="button" ' +
                'data-filter-remove="group" ' +
                'aria-label="Quitar filtro ' + escaparHTML(grupo.label) + '">' +
                '<span>' + escaparHTML(grupo.label) + '</span>' +
                '<span aria-hidden="true">×</span>' +
                '</button>'
            );
        }
    }

    const totalActivos = filtrosActivos.length;

    return (
        '<section class="catalog-filter-area" aria-label="Filtros del catálogo">' +
            '<div class="catalog-filter-toolbar">' +
                '<button class="catalog-filter-trigger" type="button" ' +
                    'data-catalog-filter-open aria-haspopup="dialog" ' +
                    'aria-controls="catalog-filter-sheet">' +
                    '<span aria-hidden="true">☷</span>' +
                    '<span>Filtros</span>' +
                    (totalActivos
                        ? '<span class="catalog-filter-count">' + totalActivos + '</span>'
                        : '') +
                '</button>' +
                (totalActivos
                    ? '<button class="catalog-clear-filters" type="button" ' +
                      'data-catalog-filter-clear>Limpiar</button>'
                    : '') +
            '</div>' +
            (totalActivos
                ? '<div class="catalog-active-filters" aria-label="Filtros activos">' +
                    filtrosActivos.join('') +
                  '</div>'
                : '') +
        '</section>'
    );
}

function obtenerNombrePaisCatalogo(codigo) {
    return (state.catalogosV2.paises || [])
        .find(item => item.id === codigo)?.name || "";
}

function obtenerPaisesDisponiblesCatalogo(catalogo = []) {
    const codigosConContenido = new Set();

    for (const item of catalogo) {
        const territorial = item.territorial || {};

        [
            ...(territorial.origin || []),
            ...(territorial.historicalLinks || []),
            ...(territorial.specialDevotion || [])
        ].forEach(codigo => codigosConContenido.add(codigo));
    }

    return (state.catalogosV2?.paises || [])
        .filter(pais => codigosConContenido.has(pais.id))
        .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

function obtenerCatalogoParaFiltrosCatalogo(seccion) {
    const configuracion = {
        santos: state.catalogosV2?.santos || [],
        beatos: state.catalogosV2?.beatos || [],
        maria: state.catalogosV2?.maria || [],
        novenas: obtenerCatalogoNovenasUnificado(),
        devociones: (state.catalogosV2?.devociones || [])
            .filter(item => (item.category || "devociones") === "devociones"),
        todos: obtenerCatalogoMaestroUnificado()
    };

    return configuracion[seccion] || [];
}

function contarResultadosFiltroCatalogo(
    seccion,
    pais,
    grupo
) {
    const catalogo = obtenerCatalogoParaFiltrosCatalogo(seccion);
    const termino = String(state.busquedaCatalogo || "")
        .trim()
        .toLocaleLowerCase("es");

    return catalogo.filter(item => {
        const territorial = item.territorial || {};
        const relaciones = [
            ...(territorial.origin || []),
            ...(territorial.historicalLinks || []),
            ...(territorial.specialDevotion || [])
        ];

        const coincidePais =
            pais === "ALL" ||
            relaciones.includes(pais);

        const gruposItem = obtenerGruposItemCatalogo(item);
        const coincideGrupo =
            grupo === "ALL" ||
            gruposItem.includes(grupo);

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

        return coincidePais &&
            coincideGrupo &&
            (!termino || textoItem.includes(termino)) &&
            item.status === "published";
    }).length;
}

function renderPanelFiltrosCatalogo(
    seccion,
    catalogo,
    permitePais,
    paisActivo,
    grupos,
    grupoActivo
) {
    const paises = obtenerPaisesDisponiblesCatalogo(catalogo);
    const resultados = contarResultadosFiltroCatalogo(
        seccion,
        paisActivo,
        grupoActivo
    );

    return (
        '<div class="catalog-filter-backdrop" data-catalog-filter-close aria-hidden="true"></div>' +
        '<aside class="catalog-filter-sheet" id="catalog-filter-sheet" ' +
            'role="dialog" aria-modal="true" aria-labelledby="catalog-filter-title">' +

            '<header class="catalog-filter-sheet-head">' +
                '<div>' +
                    '<span class="catalog-filter-sheet-kicker">Refinar</span>' +
                    '<h2 id="catalog-filter-title">Filtrar contenido</h2>' +
                    '<p>Elige un país o un tema sin recorrer listas horizontales.</p>' +
                '</div>' +
                '<button class="catalog-filter-sheet-close" type="button" ' +
                    'data-catalog-filter-close aria-label="Cerrar filtros">×</button>' +
            '</header>' +

            '<div class="catalog-filter-sheet-body">' +

                (permitePais
                    ? '<section class="catalog-filter-section">' +
                        '<div class="catalog-filter-section-head">' +
                            '<div><h3>País</h3><small data-filter-country-summary>' +
                                escaparHTML(
                                    paisActivo === "ALL"
                                        ? "Todos los países"
                                        : obtenerNombrePaisCatalogo(paisActivo)
                                ) +
                            '</small></div>' +
                        '</div>' +

                        '<label class="catalog-filter-search">' +
                            '<span class="sr-only">Buscar país</span>' +
                            '<span aria-hidden="true">⌕</span>' +
                            '<input type="search" data-filter-country-search ' +
                                'placeholder="Buscar país..." autocomplete="off" spellcheck="false">' +
                        '</label>' +

                        '<div class="catalog-filter-options">' +
                            '<label class="catalog-filter-option" data-country-option="todos">' +
                                '<input type="radio" name="catalog-filter-country" value="ALL" ' +
                                    (paisActivo === "ALL" ? "checked" : "") + '>' +
                                '<span class="catalog-filter-option-control" aria-hidden="true"></span>' +
                                '<span class="catalog-filter-option-text">' +
                                    '<strong>Todos</strong>' +
                                    '<small>Todo el catálogo</small>' +
                                '</span>' +
                            '</label>' +

                            paises.map(pais =>
                                '<label class="catalog-filter-option" data-country-option="' +
                                    escaparHTML(pais.name.toLocaleLowerCase("es")) + '">' +
                                    '<input type="radio" name="catalog-filter-country" value="' +
                                        escaparHTML(pais.id) + '" ' +
                                        (pais.id === paisActivo ? "checked" : "") + '>' +
                                    '<span class="catalog-filter-option-control" aria-hidden="true"></span>' +
                                    '<span class="catalog-filter-option-text"><strong>' +
                                        escaparHTML(pais.bandera || "") + " " +
                                        escaparHTML(pais.name) +
                                    '</strong></span>' +
                                '</label>'
                            ).join("") +
                        '</div>' +
                    '</section>'
                    : "") +

                (grupos.length
                    ? '<section class="catalog-filter-section">' +
                        '<div class="catalog-filter-section-head">' +
                            '<div><h3>Tema</h3><small data-filter-group-summary>' +
                                (grupoActivo === "ALL"
                                    ? "Todos los temas"
                                    : escaparHTML(
                                        grupos.find(item => item.id === grupoActivo)?.label ||
                                        "Tema seleccionado"
                                    )) +
                            '</small></div>' +
                        '</div>' +

                        '<div class="catalog-filter-options">' +
                            '<label class="catalog-filter-option">' +
                                '<input type="radio" name="catalog-filter-group" value="ALL" ' +
                                    (grupoActivo === "ALL" ? "checked" : "") + '>' +
                                '<span class="catalog-filter-option-control" aria-hidden="true"></span>' +
                                '<span class="catalog-filter-option-text"><strong>Todos</strong></span>' +
                            '</label>' +

                            grupos.map(grupo =>
                                '<label class="catalog-filter-option">' +
                                    '<input type="radio" name="catalog-filter-group" value="' +
                                        escaparHTML(grupo.id) + '" ' +
                                        (grupo.id === grupoActivo ? "checked" : "") + '>' +
                                    '<span class="catalog-filter-option-control" aria-hidden="true"></span>' +
                                    '<span class="catalog-filter-option-text"><strong>' +
                                        escaparHTML(grupo.label) +
                                    '</strong></span>' +
                                '</label>'
                            ).join("") +
                        '</div>' +
                    '</section>'
                    : "") +

            '</div>' +

            '<footer class="catalog-filter-sheet-foot">' +
                '<span class="catalog-filter-results" data-filter-preview-results>' +
                    resultados + (resultados === 1 ? " disponible" : " disponibles") +
                '</span>' +
                '<div class="catalog-filter-sheet-actions">' +
                    '<button class="catalog-filter-reset" type="button" data-catalog-filter-reset>Limpiar</button>' +
                    '<button class="catalog-filter-apply" type="button" data-catalog-filter-apply>Aplicar filtros</button>' +
                '</div>' +
            '</footer>' +
        '</aside>'
    );
}

function renderBusquedaCatalogo(valor = "") {
    return `
        <form class="catalog-search" id="catalog-search-form">
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
                <button type="submit" class="catalog-search-submit">Buscar</button>
            </div>
        </form>
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
        "padres-iglesia": "Padres de la Iglesia",
        "doctores": "Doctores de la Iglesia",
        "fundadores": "Fundadores",
        "jovenes": "Santos jóvenes",
        "franciscanos": "Familia franciscana",
        "apostoles": "Apóstoles",
        "sacerdotes": "Sacerdotes",
        "religiosos": "Religiosos",
        "laicos": "Laicos",
        "educadores": "Educadores",
        "cientificos": "Científicos",
        "salesianos": "Familia salesiana",
        "advocaciones-marianas": "Advocaciones marianas",
        "devociones-cristocentricas": "Devociones cristocéntricas",
        "devociones-trinitarias": "Devociones trinitarias",
        "angeles-y-arcangeles": "Ángeles y arcángeles"
    };

    return nombres[id] || id;
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

function obtenerFiestaCatalogo(item) {
    const registro = (state.catalogo || [])
        .find(novena => novena.id === item?.id);

    return item?.feast?.text || registro?.feast?.text || "";
}

function obtenerPaisesEtiquetaCatalogo(item) {
    const territorial = item?.territorial || {};
    const paises = [
        ...(territorial.origin || []),
        ...(territorial.historicalLinks || []),
        ...(territorial.specialDevotion || [])
    ].filter((codigo, index, lista) => lista.indexOf(codigo) === index);

    return paises
        .map(codigo =>
            (state.catalogosV2?.paises || [])
                .find(pais => pais.id === codigo)?.name
        )
        .filter(Boolean);
}

function obtenerDatoSecundarioCatalogo(item, seccion) {
    const fiesta = obtenerFiestaCatalogo(item);

    if (seccion === "santos") {
        return fiesta
            ? `Fiesta: ${fiesta}`
            : "Santo";
    }

    if (seccion === "beatos") {
        return fiesta
            ? `Fiesta: ${fiesta}`
            : "Beato";
    }

    if (seccion === "novenas") {
        return fiesta
            ? `Fiesta: ${fiesta}`
            : "Novena";
    }

    if (seccion === "maria") {
        const paises = obtenerPaisesEtiquetaCatalogo(item);
        const pais = paises.join(" · ");

        if (fiesta && pais) {
            return `${pais} · Fiesta: ${fiesta}`;
        }

        return fiesta
            ? `Fiesta: ${fiesta}`
            : (pais || "Advocación mariana");
    }

    if (seccion === "devociones") {
        return fiesta
            ? `Fiesta: ${fiesta}`
            : "Devoción";
    }

    if (seccion === "todos") {
        const etiqueta = obtenerEtiquetaCatalogo(item);

        return fiesta
            ? `${etiqueta} · Fiesta: ${fiesta}`
            : etiqueta;
    }

    return item.status === "published"
        ? "Disponible"
        : "Próximamente";
}

function mezclarCatalogoParaDescubrimiento(items = []) {
    const copia = [...items];

    for (let indice = copia.length - 1; indice > 0; indice -= 1) {
        const posicion = Math.floor(Math.random() * (indice + 1));
        [copia[indice], copia[posicion]] = [copia[posicion], copia[indice]];
    }

    return copia;
}


function renderTarjetaCatalogoV2(item, seccion) {
    const imagen = item.image ||
        (item.sourceFile
            ? state.catalogo.find(n => n.id === item.id)?.image
            : "");

    const tieneNovena = Boolean(
        (state.catalogo || []).some(novena => novena.id === item.id)
    );

    const accion = tieneNovena
        ? `data-action="open-novena" data-id="${escaparHTML(item.id)}"`
        : `data-action="open-profile" data-id="${escaparHTML(item.id)}"`;

    const textoAccion = tieneNovena
        ? "Abrir novena"
        : "Conocer";

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
            aria-label="${textoAccion} ${escaparHTML(item.name)}">
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
                    ${escaparHTML(obtenerDatoSecundarioCatalogo(item, seccion))}
                </small>
            </span>
        </button>
    `;
}


function obtenerCatalogoMaestroUnificado() {
    return [
        ...(state.catalogosV2?.santos || []),
        ...(state.catalogosV2?.beatos || []),
        ...(state.catalogosV2?.maria || []),
        ...(state.catalogosV2?.devociones || [])
    ];
}

function obtenerCatalogoNovenasUnificado() {
    const maestros = obtenerCatalogoMaestroUnificado();
    const porId = new Map(maestros.map(item => [item.id, item]));

    return (state.catalogo || []).map(novena => {
        const maestro = porId.get(novena.id);

        return {
            ...novena,
            status: novena.status === "draft" ? "pending" : "published",
            sourceFile: novena.file,
            category: maestro?.category || normalizarCategoriaNovena(novena.category),
            groups: maestro?.groups || [],
            territorial: maestro?.territorial || {},
            title: maestro?.title || novena.title,
            description: maestro?.description || novena.description
        };
    });
}

function normalizarCategoriaNovena(categoria = "") {
    const valor = String(categoria).toLowerCase();
    if (valor.includes("beata")) return "beatas";
    if (valor.includes("devoc")) return "devociones";
    if (valor.includes("mar")) return "maria";
    if (valor.includes("santo")) return "santos";
    return categoria;
}


/* ==========================================
   FILTROS UX — PANEL RESPONSIVO
========================================== */

let catalogFilterPreviousFocus = null;

function obtenerSeccionCatalogoActual() {
    return ["todos", "santos", "beatos", "maria", "novenas", "devociones"]
        .includes(router?.rutaActual)
        ? router.rutaActual
        : "todos";
}

function abrirPanelFiltrosCatalogo() {
    if (document.getElementById("catalog-filter-sheet")) {
        return;
    }

    const seccion = obtenerSeccionCatalogoActual();
    const datos = {
        santos: { catalogo: state.catalogosV2?.santos || [], permitePais: true },
        beatos: { catalogo: state.catalogosV2?.beatos || [], permitePais: true },
        maria: { catalogo: state.catalogosV2?.maria || [], permitePais: true },
        novenas: { catalogo: obtenerCatalogoNovenasUnificado(), permitePais: false },
        devociones: {
            catalogo: (state.catalogosV2?.devociones || [])
                .filter(item => (item.category || "devociones") === "devociones"),
            permitePais: false
        },
        todos: { catalogo: obtenerCatalogoMaestroUnificado(), permitePais: true }
    }[seccion] || {
        catalogo: obtenerCatalogoMaestroUnificado(),
        permitePais: true
    };

    catalogFilterPreviousFocus = document.activeElement;

    document.body.insertAdjacentHTML(
        "beforeend",
        renderPanelFiltrosCatalogo(
            seccion,
            datos.catalogo,
            datos.permitePais,
            state.paisCatalogo || "ALL",
            obtenerGruposCatalogo(datos.catalogo),
            state.grupoCatalogo || "ALL"
        )
    );

    document.body.classList.add("catalog-filter-open");

    document
        .querySelector(".catalog-filter-sheet-close")
        ?.focus();
}

function cerrarPanelFiltrosCatalogo() {
    document
        .querySelectorAll(".catalog-filter-backdrop, .catalog-filter-sheet")
        .forEach(elemento => elemento.remove());

    document.body.classList.remove("catalog-filter-open");

    if (
        catalogFilterPreviousFocus &&
        document.contains(catalogFilterPreviousFocus)
    ) {
        catalogFilterPreviousFocus.focus();
    }

    catalogFilterPreviousFocus = null;
}

function actualizarPreviewFiltrosCatalogo() {
    const hoja = document.getElementById("catalog-filter-sheet");

    if (!hoja) {
        return;
    }

    const seccion = obtenerSeccionCatalogoActual();
    const pais =
        hoja.querySelector(
            'input[name="catalog-filter-country"]:checked'
        )?.value || "ALL";

    const grupo =
        hoja.querySelector(
            'input[name="catalog-filter-group"]:checked'
        )?.value || "ALL";

    const cantidad = contarResultadosFiltroCatalogo(
        seccion,
        pais,
        grupo
    );

    const indicador =
        hoja.querySelector("[data-filter-preview-results]");

    if (indicador) {
        indicador.textContent =
            cantidad + (cantidad === 1 ? " disponible" : " disponibles");
    }

    const paisResumen =
        hoja.querySelector("[data-filter-country-summary]");

    if (paisResumen) {
        paisResumen.textContent =
            pais === "ALL"
                ? "Todos los países"
                : obtenerNombrePaisCatalogo(pais);
    }

    const grupos =
        obtenerGruposCatalogo(
            obtenerCatalogoParaFiltrosCatalogo(seccion)
        );

    const grupoResumen =
        hoja.querySelector("[data-filter-group-summary]");

    if (grupoResumen) {
        grupoResumen.textContent =
            grupo === "ALL"
                ? "Todos los temas"
                : grupos.find(item => item.id === grupo)?.label ||
                  "Tema seleccionado";
    }
}

function aplicarFiltrosCatalogoDesdePanel() {
    const hoja = document.getElementById("catalog-filter-sheet");

    if (!hoja) {
        return;
    }

    state.paisCatalogo =
        hoja.querySelector(
            'input[name="catalog-filter-country"]:checked'
        )?.value || "ALL";

    state.grupoCatalogo =
        hoja.querySelector(
            'input[name="catalog-filter-group"]:checked'
        )?.value || "ALL";

    const seccion = obtenerSeccionCatalogoActual();

    cerrarPanelFiltrosCatalogo();

    mostrarCatalogoV2(
        seccion,
        state.paisCatalogo,
        state.grupoCatalogo
    );
}

function limpiarFiltrosCatalogoEnPanel() {
    const hoja = document.getElementById("catalog-filter-sheet");

    if (!hoja) {
        return;
    }

    const paisTodos =
        hoja.querySelector(
            'input[name="catalog-filter-country"][value="ALL"]'
        );

    const grupoTodos =
        hoja.querySelector(
            'input[name="catalog-filter-group"][value="ALL"]'
        );

    if (paisTodos) {
        paisTodos.checked = true;
    }

    if (grupoTodos) {
        grupoTodos.checked = true;
    }

    actualizarPreviewFiltrosCatalogo();
}

document.addEventListener("click", evento => {
    if (evento.target.closest("[data-catalog-filter-open]")) {
        abrirPanelFiltrosCatalogo();
        return;
    }

    if (evento.target.closest("[data-catalog-filter-close]")) {
        cerrarPanelFiltrosCatalogo();
        return;
    }

    if (evento.target.closest("[data-catalog-filter-apply]")) {
        aplicarFiltrosCatalogoDesdePanel();
        return;
    }

    if (evento.target.closest("[data-catalog-filter-reset]")) {
        limpiarFiltrosCatalogoEnPanel();
        return;
    }

    if (evento.target.closest("[data-catalog-filter-clear]")) {
        state.paisCatalogo = "ALL";
        state.grupoCatalogo = "ALL";

        mostrarCatalogoV2(
            obtenerSeccionCatalogoActual(),
            "ALL",
            "ALL"
        );
        return;
    }

    if (evento.target.closest('[data-filter-remove="country"]')) {
        state.paisCatalogo = "ALL";

        mostrarCatalogoV2(
            obtenerSeccionCatalogoActual(),
            "ALL",
            state.grupoCatalogo || "ALL"
        );
        return;
    }

    if (evento.target.closest('[data-filter-remove="group"]')) {
        state.grupoCatalogo = "ALL";

        mostrarCatalogoV2(
            obtenerSeccionCatalogoActual(),
            state.paisCatalogo || "ALL",
            "ALL"
        );
    }
});

document.addEventListener("change", evento => {
    if (
        evento.target.matches(
            'input[name="catalog-filter-country"], input[name="catalog-filter-group"]'
        )
    ) {
        actualizarPreviewFiltrosCatalogo();
    }
});

document.addEventListener("input", evento => {
    if (!evento.target.matches("[data-filter-country-search]")) {
        return;
    }

    const termino = evento.target.value
        .trim()
        .toLocaleLowerCase("es");

    document
        .querySelectorAll("[data-country-option]")
        .forEach(opcion => {
            opcion.hidden =
                Boolean(termino) &&
                !opcion.dataset.countryOption.includes(termino);
        });
});

document.addEventListener("keydown", evento => {
    if (
        evento.key === "Escape" &&
        document.getElementById("catalog-filter-sheet")
    ) {
        cerrarPanelFiltrosCatalogo();
    }
});


function mostrarPerfilCatalogo(id) {
    const catalogos = [
        ...(state.catalogosV2?.santos || []),
        ...(state.catalogosV2?.beatos || []),
        ...(state.catalogosV2?.maria || []),
        ...(state.catalogosV2?.devociones || [])
    ];

    const item = catalogos.find(entry => entry?.id === id);

    if (!item) {
        return;
    }

    const territorial = item.territorial || {};
    const codigos = [
        ...(territorial.origin || []),
        ...(territorial.historicalLinks || []),
        ...(territorial.specialDevotion || [])
    ].filter((codigo, index, lista) => lista.indexOf(codigo) === index);

    const paises = codigos
        .map(codigo => obtenerNombrePaisCatalogo(codigo))
        .filter(Boolean)
        .join(" · ");

    const grupos = (item.groups || [])
        .map(obtenerNombreGrupoCatalogo)
        .filter(Boolean)
        .join(" · ");

    const categoria = normalizarCategoriaNovena(
        item.category || ""
    );

    const categoriaTexto = {
        santos: "Santo",
        beatas: "Beato o Beata",
        maria: "Advocación mariana",
        devociones: "Devoción"
    }[categoria] || "Contenido espiritual";

    const registroNovena = (state.catalogo || [])
        .find(novena => novena.id === item.id);

    const imagen = item.image ||
        registroNovena?.image ||
        "";

    const esSanto =
        categoria === "santos";

    const contenido =
        (esSanto
            ? '<div class="catalog-profile-swipe" data-swipe-profile="santos" data-current-id="' +
              escaparHTML(item.id) +
              '">'
            : "") +
        (imagen
            ? '<div class="catalog-profile-media"><img src="' +
              escaparHTML(imagen) +
              '" alt="" class="catalog-profile-image"></div>'
            : "") +
        '<p class="catalog-profile-category">' +
            escaparHTML(categoriaTexto) +
        '</p>' +
        (item.description
            ? "<p>" + escaparHTML(item.description) + "</p>"
            : "") +
        (item.feast?.text
            ? "<p><strong>Celebración:</strong> " + escaparHTML(item.feast.text) + "</p>"
            : "") +
        (paises
            ? "<p><strong>Vínculos territoriales:</strong> " + escaparHTML(paises) + "</p>"
            : "") +
        (grupos
            ? "<p><strong>Temas:</strong> " + escaparHTML(grupos) + "</p>"
            : "") +
        '<p class="modal-note">Conocer este testimonio permite acercarse a una historia concreta de fe, con sus circunstancias, desafíos y camino hacia Cristo.</p>' +
        (registroNovena
            ? '<button class="btn btn-primary" type="button" data-action="open-novena" data-id="' +
              escaparHTML(item.id) +
              '">Abrir novena</button>'
            : "");

    mostrarModal(
        escaparHTML(item.name),
        contenido + (esSanto ? "</div>" : "")
    );

    if (esSanto) {
        inicializarSwipePerfilSantos();
    }
}



function obtenerSecuenciaNavegacionSantos() {
    const santos = state.catalogosV2?.santos || [];

    if (
        state.catalogoOrdenSeccion === "santos" &&
        Array.isArray(state.catalogoOrden) &&
        state.catalogoOrden.length
    ) {
        const idsSantos = new Set(
            santos.map(item => item.id)
        );

        const orden = state.catalogoOrden.filter(
            item => idsSantos.has(item?.id)
        );

        if (orden.length) {
            return orden;
        }
    }

    return santos;
}

let swipeSantosInicializado = false;
let swipeSantosInicioX = 0;
let swipeSantosInicioY = 0;
let swipeSantosActivo = false;

function inicializarSwipePerfilSantos() {
    /*
     * El listener se instala una sola vez sobre document.
     * El perfil del santo se crea y destruye cada vez que cambia
     * el modal, por lo que enlazar eventos directamente al elemento
     * hacía que el comportamiento dependiera demasiado del ciclo
     * de vida del modal.
     */
    if (swipeSantosInicializado) {
        return;
    }

    swipeSantosInicializado = true;

    document.addEventListener(
        "touchstart",
        evento => {
            if (evento.touches.length !== 1) {
                swipeSantosActivo = false;
                return;
            }

            const area = evento.target.closest?.(
                '.catalog-profile-swipe[data-swipe-profile="santos"]'
            );

            if (!area) {
                swipeSantosActivo = false;
                return;
            }

            if (
                evento.target.closest?.(
                    "button, a, input, select, textarea, [role=\"button\"]"
                )
            ) {
                swipeSantosActivo = false;
                return;
            }

            const toque = evento.touches[0];

            swipeSantosInicioX = toque.clientX;
            swipeSantosInicioY = toque.clientY;
            swipeSantosActivo = true;
        },
        { passive: true, capture: true }
    );

    document.addEventListener(
        "touchend",
        evento => {
            if (
                !swipeSantosActivo ||
                evento.changedTouches.length !== 1
            ) {
                swipeSantosActivo = false;
                return;
            }

            const area = document.querySelector(
                '.modal .catalog-profile-swipe[data-swipe-profile="santos"]'
            );

            const toque = evento.changedTouches[0];
            const desplazamientoX =
                toque.clientX - swipeSantosInicioX;
            const desplazamientoY =
                toque.clientY - swipeSantosInicioY;

            swipeSantosActivo = false;

            const esHorizontal =
                Math.abs(desplazamientoX) >= 45 &&
                Math.abs(desplazamientoX) >
                    Math.abs(desplazamientoY) * 1.1;

            if (!area || !esHorizontal) {
                return;
            }

            const secuencia = obtenerSecuenciaNavegacionSantos();
            const idActual = area.dataset.currentId;

            const indice = secuencia.findIndex(
                item => item?.id === idActual
            );

            if (indice < 0) {
                return;
            }

            const siguienteIndice =
                desplazamientoX < 0
                    ? indice + 1
                    : indice - 1;

            const siguiente = secuencia[siguienteIndice];

            if (siguiente?.id) {
                mostrarPerfilCatalogo(siguiente.id);
            }
        },
        { passive: true, capture: true }
    );

    document.addEventListener(
        "touchcancel",
        () => {
            swipeSantosActivo = false;
        },
        { passive: true, capture: true }
    );
}

