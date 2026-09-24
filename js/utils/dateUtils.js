/* ==========================================
   FECHAS
   Amigos del Cielo
========================================== */

function obtenerFechaActual() {
    return new Date();
}

function obtenerDiaActual() {
    return obtenerFechaActual().getDate();
}

function obtenerMesActual() {
    return obtenerFechaActual().getMonth() + 1;
}

function parsearFestividad(fecha) {
    if (!fecha) {
        return null;
    }

    if (typeof fecha === "object") {
        const dia = Number(fecha.day);
        const mes = Number(fecha.month);

        if (!Number.isInteger(dia) || !Number.isInteger(mes)) {
            return null;
        }

        return { dia, mes };
    }

    if (typeof fecha === "string") {
        const partes = fecha.replace(/\//g, "-").split("-");

        const dia = Number(partes[0]);
        const mes = Number(partes[1]);

        if (!Number.isInteger(dia) || !Number.isInteger(mes)) {
            return null;
        }

        return { dia, mes };
    }

    return null;
}

function formatearFechaLiturgica(fecha) {
    if (!fecha) {
        return "";
    }

    if (typeof fecha === "object" && fecha.text) {
        return fecha.text;
    }

    const datos = parsearFestividad(fecha);

    if (!datos) {
        return "";
    }

    return `${datos.dia} de ${MONTHS[datos.mes - 1] || ""}`.trim();
}

function formatearFechaCorta(fecha) {
    return formatearFechaLiturgica(fecha);
}

function esDelMesActual(fecha) {
    const datos = parsearFestividad(fecha);

    return Boolean(
        datos &&
        datos.mes === obtenerMesActual()
    );
}

function esHoyLaFestividad(fecha) {
    const datos = parsearFestividad(fecha);

    if (!datos) {
        return false;
    }

    const hoy = obtenerFechaActual();

    return (
        datos.dia === hoy.getDate() &&
        datos.mes === hoy.getMonth() + 1
    );
}

/* ==========================================================
   FECHAS DE LA NOVENA
   Una novena de 9 días que termina en la festividad
   comienza 8 días calendario antes del día de la fiesta.
========================================================== */

function crearFechaLocal(anio, mes, dia) {
    return new Date(anio, mes - 1, dia, 12, 0, 0, 0);
}

function formatearFechaISO(fecha) {
    if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) {
        return "";
    }

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
}

function sumarDias(fecha, cantidad) {
    const resultado = new Date(fecha.getTime());
    resultado.setDate(resultado.getDate() + cantidad);
    return resultado;
}

function obtenerFechaFestividad(fecha, anio = obtenerFechaActual().getFullYear()) {
    const datos = parsearFestividad(fecha);

    if (!datos || datos.mes < 1 || datos.mes > 12) {
        return null;
    }

    const resultado = crearFechaLocal(
        anio,
        datos.mes,
        datos.dia
    );

    /* Las festividades móviles requieren una fecha anual concreta. */
    if (
        typeof fecha === "object" &&
        fecha.movable === true
    ) {
        return null;
    }

    return resultado;
}

function obtenerFechaInicioNovena(fecha, anio = obtenerFechaActual().getFullYear()) {
    const festividad = obtenerFechaFestividad(fecha, anio);

    if (!festividad) {
        return null;
    }

    return sumarDias(festividad, -8);
}

function obtenerFechaFinNovena(fecha, anio = obtenerFechaActual().getFullYear()) {
    return obtenerFechaFestividad(fecha, anio);
}

function obtenerDiaProgramadoNovena(fecha, fechaActual = obtenerFechaActual()) {
    const anioActual = fechaActual.getFullYear();

    let inicio = obtenerFechaInicioNovena(fecha, anioActual);
    let fin = obtenerFechaFinNovena(fecha, anioActual);

    if (!inicio || !fin) {
        return null;
    }

    if (fechaActual < inicio) {
        return {
            estado: "proxima",
            dia: 0,
            inicio,
            fin
        };
    }

    if (fechaActual > fin) {
        inicio = obtenerFechaInicioNovena(fecha, anioActual + 1);
        fin = obtenerFechaFinNovena(fecha, anioActual + 1);

        if (!inicio || !fin) {
            return null;
        }

        return {
            estado: "proxima",
            dia: 0,
            inicio,
            fin
        };
    }

    const diferencia =
        Math.floor(
            (
                fechaActual.getTime() -
                inicio.getTime()
            ) /
            (1000 * 60 * 60 * 24)
        );

    return {
        estado: "en-curso",
        dia: Math.min(9, diferencia + 1),
        inicio,
        fin
    };
}

function obtenerEstadoNovena(fecha) {
    return obtenerDiaProgramadoNovena(
        fecha,
        obtenerFechaActual()
    );
}

function diasHastaFestividad(fecha) {
    const datos = parsearFestividad(fecha);

    if (!datos) {
        return null;
    }

    const hoy = obtenerFechaActual();
    let festividad = crearFechaLocal(
        hoy.getFullYear(),
        datos.mes,
        datos.dia
    );

    if (festividad < hoy) {
        festividad = crearFechaLocal(
            hoy.getFullYear() + 1,
            datos.mes,
            datos.dia
        );
    }

    return Math.ceil(
        (
            festividad.getTime() -
            hoy.getTime()
        ) /
        (1000 * 60 * 60 * 24)
    );
}
