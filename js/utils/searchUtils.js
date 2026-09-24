/* ==========================================
   BUSCADOR
   Amigos del Cielo
========================================== */

function normalizarTextoBusqueda(texto) {
    return String(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function obtenerIntervencionesNovena(novena) {
    if (!novena) {
        return [];
    }

    const intervenciones = Array.isArray(novena.interventions)
        ? novena.interventions
        : [];

    return intervenciones
        .map(intervencion => {
            if (typeof intervencion === "string") {
                return {
                    id: normalizarTextoBusqueda(intervencion),
                    label: intervencion,
                    keywords: []
                };
            }

            return {
                id: intervencion?.id || "",
                label: intervencion?.label || "",
                keywords: Array.isArray(intervencion?.keywords)
                    ? intervencion.keywords
                    : []
            };
        })
        .filter(intervencion => intervencion.label);
}

function obtenerCoincidenciasIntervencion(novena, texto) {
    const termino = normalizarTextoBusqueda(texto);

    if (!termino) {
        return [];
    }

    return obtenerIntervencionesNovena(novena)
        .filter(intervencion => {
            const contenido = [
                intervencion.id,
                intervencion.label,
                ...intervencion.keywords
            ]
                .filter(Boolean)
                .join(" ");

            return normalizarTextoBusqueda(contenido)
                .includes(termino);
        });
}

function obtenerEtiquetasIntervencion(novena, texto) {
    return obtenerCoincidenciasIntervencion(novena, texto)
        .map(intervencion => intervencion.label)
        .join(" · ");
}

function buscarNovenas(catalogo, texto) {

    if (!Array.isArray(catalogo)) {
        return [];
    }

    const termino =
        normalizarTextoBusqueda(texto);

    if (!termino) {
        return catalogo;
    }

    return catalogo.filter(novena => {

        const campos = [
            novena.name,
            novena.slug,
            novena.title,
            novena.subtitle,
            novena.description,
            novena.category,
            novena.feast?.text,
            ...(Array.isArray(novena.search)
                ? novena.search
                : []),
            ...(Array.isArray(novena.patronages)
                ? novena.patronages
                : [])
        ];

        const intervenciones =
            obtenerIntervencionesNovena(novena)
                .flatMap(intervencion => [
                    intervencion.id,
                    intervencion.label,
                    ...intervencion.keywords
                ]);

        return normalizarTextoBusqueda(
            [
                ...campos,
                ...intervenciones
            ]
                .filter(Boolean)
                .join(" ")
        ).includes(termino);
    });
}

function filtrarCategoria(catalogo, categoria) {

    if (!Array.isArray(catalogo)) {
        return [];
    }

    if (!categoria || categoria === "Todas") {
        return catalogo;
    }

    return catalogo.filter(
        novena => novena.category === categoria
    );
}

function obtenerCategorias(catalogo) {

    if (!Array.isArray(catalogo)) {
        return ["Todas"];
    }

    const categorias =
        catalogo
            .map(item => item.category)
            .filter(Boolean)
            .sort((a, b) =>
                String(a).localeCompare(
                    String(b),
                    "es"
                )
            );

    return [
        "Todas",
        ...new Set(categorias)
    ];
}

function obtenerNovenaDestacada(catalogo) {

    if (!Array.isArray(catalogo)) {
        return null;
    }

    return (
        catalogo.find(
            novena =>
                novena.featured === true
        ) ||
        catalogo[0] ||
        null
    );
}

function buscarNovenaPorId(catalogo, id) {

    if (!Array.isArray(catalogo)) {
        return null;
    }

    return (
        catalogo.find(
            novena =>
                novena.id === id
        ) ||
        null
    );
}

function buscarNovenaPorSlug(catalogo, slug) {

    if (!Array.isArray(catalogo)) {
        return null;
    }

    return (
        catalogo.find(
            novena =>
                novena.slug === slug
        ) ||
        null
    );
}

function obtenerNovenasPublicadas(catalogo) {

    if (!Array.isArray(catalogo)) {
        return [];
    }

    return catalogo.filter(
        novena =>
            novena.status === "published"
    );
}
