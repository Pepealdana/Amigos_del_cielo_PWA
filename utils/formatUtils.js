/* ==========================================
   FORMATOS
========================================== */

/**
 * Convierte texto a formato título.
 */

function capitalizar(texto) {

    if (!texto) return "";

    return texto
        .toLowerCase()
        .replace(
            /\b\w/g,
            letra => letra.toUpperCase()
        );

}

/**
 * Convierte "19-03"
 * en "19 de marzo".
 */

function formatearFestividad(fecha) {

    const partes = fecha.split("-");

    const dia = Number(partes[0]);

    const mes = Number(partes[1]);

    return `${dia} de ${MONTHS[mes - 1]}`;

}

/**
 * Limita un texto.
 */

function resumirTexto(

    texto,

    longitud = 140

) {

    if (!texto) return "";

    if (texto.length <= longitud) {

        return texto;

    }

    return texto.substring(

        0,

        longitud

    ) + "...";

}

/**
 * Convierte un nombre
 * en slug.
 */

function generarSlug(texto) {

    return texto

        .toLowerCase()

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "")

        .replace(/\s+/g, "-");

}