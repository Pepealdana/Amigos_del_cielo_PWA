/* ==========================================
   BUSCADOR
   Amigos del Cielo
========================================== */

/* ==========================================
   BUSCAR NOVENAS
========================================== */

function buscarNovenas(

    catalogo,

    texto

) {

    if (

        !texto ||

        !Array.isArray(catalogo)

    ) {

        return catalogo;

    }

    const termino =

        texto

            .toLowerCase()

            .trim();

    return catalogo.filter(

        novena => {

            const campos = [

                novena.name,

                novena.title,

                novena.subtitle,

                novena.description,

                novena.category,

                ...(novena.search || [])

            ]

                .filter(Boolean)

                .join(" ")

                .toLowerCase();

            return campos.includes(

                termino

            );

        }

    );

}

/* ==========================================
   FILTRAR POR CATEGORÍA
========================================== */

function filtrarCategoria(

    catalogo,

    categoria

) {

    if (

        !Array.isArray(catalogo)

    ) {

        return [];

    }

    if (

        !categoria ||

        categoria === "Todas"

    ) {

        return catalogo;

    }

    return catalogo.filter(

        novena =>

            novena.category === categoria

    );

}

/* ==========================================
   OBTENER CATEGORÍAS
========================================== */

function obtenerCategorias(

    catalogo

) {

    if (

        !Array.isArray(catalogo)

    ) {

        return ["Todas"];

    }

    const categorias =

        catalogo

            .map(

                item => item.category

            )

            .filter(Boolean)

            .sort();

    return [

        "Todas",

        ...new Set(categorias)

    ];

}

/* ==========================================
   OBTENER DESTACADA
========================================== */

function obtenerNovenaDestacada(

    catalogo

) {

    if (

        !Array.isArray(catalogo)

    ) {

        return null;

    }

    return (

        catalogo.find(

            novena =>

                novena.featured === true

        )

        ||

        catalogo[0]

        ||

        null

    );

}

/* ==========================================
   BUSCAR POR ID
========================================== */

function buscarNovenaPorId(

    catalogo,

    id

) {

    if (

        !Array.isArray(catalogo)

    ) {

        return null;

    }

    return (

        catalogo.find(

            novena =>

                novena.id === id

        )

        ||

        null

    );

}

/* ==========================================
   BUSCAR POR SLUG
========================================== */

function buscarNovenaPorSlug(

    catalogo,

    slug

) {

    if (

        !Array.isArray(catalogo)

    ) {

        return null;

    }

    return (

        catalogo.find(

            novena =>

                novena.slug === slug

        )

        ||

        null

    );

}

/* ==========================================
   NOVENAS PUBLICADAS
========================================== */

function obtenerNovenasPublicadas(

    catalogo

) {

    if (

        !Array.isArray(catalogo)

    ) {

        return [];

    }

    return catalogo.filter(

        novena =>

            novena.status === "published"

    );

}