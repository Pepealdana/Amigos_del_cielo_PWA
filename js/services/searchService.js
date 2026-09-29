/* ==========================================
   SEARCH SERVICE — V1.5
   Amigos del Cielo
========================================== */

function normalizarResultadoBusqueda(item, type, actionType, target = null) {
    const title = item?.name || item?.title || item?.label || "";

    if (!item?.id || !title) {
        return null;
    }

    return {
        id: item.id,
        type,
        title,
        subtitle: item.subtitle || item.description || "",
        image: item.image || "",
        action: {
            type: actionType,
            target: target || item.id
        }
    };
}

function obtenerTextoBusquedaContenido(item) {
    return [
        item?.name,
        item?.title,
        item?.subtitle,
        item?.description,
        ...(Array.isArray(item?.search) ? item.search : []),
        ...(Array.isArray(item?.searchTerms) ? item.searchTerms : []),
        ...(Array.isArray(item?.tags) ? item.tags : []),
        ...(Array.isArray(item?.patronages) ? item.patronages : []),
        ...(Array.isArray(item?.virtues) ? item.virtues : [])
    ]
        .filter(Boolean)
        .join(" ");
}

function buscarEnListaContenido(items, termino, type, actionType) {
    if (!Array.isArray(items)) {
        return [];
    }

    const texto = normalizarTextoBusqueda(termino);

    if (!texto) {
        return [];
    }

    return items
        .filter(item =>
            normalizarTextoBusqueda(
                obtenerTextoBusquedaContenido(item)
            ).includes(texto)
        )
        .map(item =>
            normalizarResultadoBusqueda(
                item,
                type,
                actionType
            )
        )
        .filter(Boolean);
}

async function buscarContenido(termino, opciones = {}) {
    const texto = normalizarTextoBusqueda(termino);

    if (!texto) {
        return [];
    }

    if (
        !state.catalogo?.length &&
        typeof cargarCatalogo === "function"
    ) {
        await cargarCatalogo();
    }

    const catalogos = state.catalogosV2 || {};
    const resultados = [
        ...buscarEnListaContenido(
            catalogos.santos,
            texto,
            "saint",
            "open-profile"
        ),
        ...buscarEnListaContenido(
            catalogos.beatos,
            texto,
            "blessed",
            "open-profile"
        ),
        ...buscarEnListaContenido(
            catalogos.maria,
            texto,
            "maria",
            "open-profile"
        ),
        ...buscarEnListaContenido(
            catalogos.devociones,
            texto,
            "devotion",
            "open-profile"
        )
    ];

    const novenas = buscarNovenas(
        state.catalogo || [],
        texto
    ).map(item =>
        normalizarResultadoBusqueda(
            item,
            "novena",
            "open-novena"
        )
    ).filter(Boolean);

    resultados.push(...novenas);

    if (
        typeof cargarOraciones === "function"
    ) {
        try {
            const banco = await cargarOraciones();
            const oraciones = Array.isArray(banco?.common)
                ? banco.common
                : Object.entries(banco?.common || {}).map(([id, item]) => ({
                    ...item,
                    id
                }));

            resultados.push(
                ...buscarEnListaContenido(
                    oraciones,
                    texto,
                    "prayer",
                    "open-prayer"
                )
            );
        } catch (error) {
            console.warn("No fue posible buscar en el banco de oraciones:", error);
        }
    }

    const vistos = new Set();

    return resultados
        .filter(item => {
            const clave = item.type + ":" + item.id;
            if (vistos.has(clave)) {
                return false;
            }
            vistos.add(clave);
            return true;
        })
        .slice(0, Number(opciones.limit) || 20);
}

function buscarContenidoSincrono(termino, opciones = {}) {
    const texto = normalizarTextoBusqueda(termino);

    if (!texto) {
        return [];
    }

    const catalogos = state.catalogosV2 || {};
    const resultados = [
        ...buscarEnListaContenido(catalogos.santos, texto, "saint", "open-profile"),
        ...buscarEnListaContenido(catalogos.beatos, texto, "blessed", "open-profile"),
        ...buscarEnListaContenido(catalogos.maria, texto, "maria", "open-profile"),
        ...buscarEnListaContenido(catalogos.devociones, texto, "devotion", "open-profile"),
        ...buscarNovenas(state.catalogo || [], texto).map(item =>
            normalizarResultadoBusqueda(item, "novena", "open-novena")
        ).filter(Boolean)
    ];

    return resultados.slice(0, Number(opciones.limit) || 20);
}
