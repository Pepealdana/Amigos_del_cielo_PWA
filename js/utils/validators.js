/* ==========================================
   VALIDADORES
========================================== */

/**
 * Texto vacío.
 */

function esTextoValido(texto) {

    return (

        texto &&

        texto.trim().length > 0

    );

}

/**
 * Número válido.
 */

function esNumero(valor) {

    return (

        !isNaN(valor)

    );

}

/**
 * Día válido.
 */

function esDiaNovena(dia) {

    return (

        Number.isInteger(dia)

        &&

        dia >= 1

        &&

        dia <= 9

    );

}

/**
 * Objeto válido.
 */

function existeObjeto(objeto) {

    return (

        objeto !== null

        &&

        objeto !== undefined

    );

}

/**
 * Array válido.
 */

function existeLista(lista) {

    return (

        Array.isArray(lista)

        &&

        lista.length > 0

    );

}