/* ==========================================
   DOM
========================================== */

/**
 * Obtener elemento por id.
 */

function $(id) {

    return document.getElementById(id);

}

/**
 * Cambiar contenido HTML.
 */

function setHTML(

    id,

    html

) {

    const elemento = $(id);

    if (elemento) {

        elemento.innerHTML = html;

    }

}

/**
 * Mostrar elemento.
 */

function mostrar(id) {

    $(id)?.classList.remove(

        "hidden"

    );

}

/**
 * Ocultar elemento.
 */

function ocultar(id) {

    $(id)?.classList.add(

        "hidden"

    );

}

/**
 * Alternar clase.
 */

function toggleClase(

    id,

    clase

) {

    $(id)?.classList.toggle(

        clase

    );

}