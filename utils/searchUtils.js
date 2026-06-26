/* ==========================================
   BUSCADOR
========================================== */

/**
 * Buscar por nombre.
 */

function buscarNovenas(

    catalogo,

    texto

) {

    if (!texto) {

        return catalogo;

    }

    const termino =

        texto.toLowerCase();

    return catalogo.filter(

        novena =>

            novena.name
                .toLowerCase()
                .includes(termino)

            ||

            novena.title
                .toLowerCase()
                .includes(termino)

            ||

            novena.category
                .toLowerCase()
                .includes(termino)

    );

}

/**
 * Filtrar por categoría.
 */

function filtrarCategoria(

    catalogo,

    categoria

) {

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

/**
 * Obtener categorías.
 */

function obtenerCategorias(

    catalogo

) {

    const lista =

        catalogo.map(

            item => item.category

        );

    return [

        "Todas",

        ...new Set(lista)

    ];

}