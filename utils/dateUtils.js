/* ==========================================
   FECHAS
========================================== */

/**
 * Devuelve la fecha actual.
 */

function obtenerFechaActual() {

    return new Date();

}

/**
 * Devuelve el mes actual (1-12)
 */

function obtenerMesActual() {

    return obtenerFechaActual()

        .getMonth() + 1;

}

/**
 * Devuelve el día actual.
 */

function obtenerDiaActual() {

    return obtenerFechaActual()

        .getDate();

}

/**
 * Convierte "19-03"
 * en {dia:19,mes:3}
 */

function parsearFestividad(fecha) {

    const partes =

        fecha.split("-");

    return {

        dia: Number(partes[0]),

        mes: Number(partes[1])

    };

}

/**
 * Determina si una festividad
 * pertenece al mes actual.
 */

function esDelMesActual(fecha) {

    return (

        parsearFestividad(fecha).mes ===

        obtenerMesActual()

    );

}