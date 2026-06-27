/* ==========================================
   FORMATOS
   Amigos del Cielo
========================================== */

/* ==========================================
   CAPITALIZAR TEXTO
========================================== */

function capitalizar(texto) {

    if (!texto) {

        return "";

    }

    return texto

        .toLowerCase()

        .replace(

            /\b\w/g,

            letra => letra.toUpperCase()

        );

}

/* ==========================================
   RESUMIR TEXTO
========================================== */

function resumirTexto(

    texto,

    longitud = 140

) {

    if (!texto) {

        return "";

    }

    if (

        texto.length <= longitud

    ) {

        return texto;

    }

    return texto.substring(

        0,

        longitud

    ) + "...";

}

/* ==========================================
   GENERAR SLUG
========================================== */

function generarSlug(texto) {

    if (!texto) {

        return "";

    }

    return texto

        .toLowerCase()

        .normalize("NFD")

        .replace(

            /[\u0300-\u036f]/g,

            ""

        )

        .replace(

            /[^a-z0-9\s-]/g,

            ""

        )

        .trim()

        .replace(

            /\s+/g,

            "-"

        )

        .replace(

            /-+/g,

            "-"

        );

}

/* ==========================================
   ELIMINAR ESPACIOS
========================================== */

function limpiarTexto(texto) {

    if (!texto) {

        return "";

    }

    return texto.trim();

}

/* ==========================================
   PRIMERA LETRA MAYÚSCULA
========================================== */

function primeraMayuscula(texto) {

    if (!texto) {

        return "";

    }

    return texto.charAt(0)

        .toUpperCase()

        + texto.slice(1);

}

/* ==========================================
   FORMATEAR PORCENTAJE
========================================== */

function formatearPorcentaje(valor) {

    const numero =

        Number(valor);

    if (

        isNaN(numero)

    ) {

        return "0%";

    }

    return `${numero}%`;

}

/* ==========================================
   FORMATEAR NÚMERO
========================================== */

function formatearNumero(numero) {

    return Number(numero)

        .toLocaleString(

            "es-CO"

        );

}