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
    const hoy = obtenerFechaActual();
    const festividad = obtenerFechaFestividad(
        fecha,
        hoy.getFullYear()
    );

    if (!festividad) {
        return false;
    }

    return (
        festividad.getDate() === hoy.getDate() &&
        festividad.getMonth() === hoy.getMonth() &&
        festividad.getFullYear() === hoy.getFullYear()
    );
}

/* ==========================================================
   FECHAS DE LA NOVENA
   Una novena de 9 días que termina en la festividad
   comienza 8 días calendario antes del día de la fiesta.
========================================================== */

function crearFechaLocal(anio, mes, dia) {
    return new Date(anio, mes - 1, dia, 0, 0, 0, 0);
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

function calcularPascua(anio) {
    const a = anio % 19;
    const b = Math.floor(anio / 100);
    const c = anio % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31);
    const dia = ((h + l - 7 * m + 114) % 31) + 1;
    return crearFechaLocal(anio, mes, dia);
}

function obtenerDomingoOrdinal(anio, mes, ordinal) {
    const primerDia = crearFechaLocal(anio, mes, 1);
    const desplazamiento = (7 - primerDia.getDay()) % 7;
    return sumarDias(
        primerDia,
        desplazamiento + ((ordinal - 1) * 7)
    );
}

function obtenerFechaFestividad(fecha, anio = obtenerFechaActual().getFullYear()) {
    if (!fecha) return null;

    if (typeof fecha === "object" && fecha.movable === true) {
        const tipo = String(fecha.type || fecha.key || "").toLowerCase();
        const texto = String(fecha.text || "").toLowerCase();
        const pascua = calcularPascua(anio);

        if (tipo === "divina-misericordia" || texto.includes("ii domingo de pascua")) {
            return sumarDias(pascua, 7);
        }
        if (tipo === "pentecostes" || texto.includes("pentecost")) {
            return sumarDias(pascua, 49);
        }
        if (tipo === "sagrado-corazon" || texto.includes("sagrado corazón")) {
            return sumarDias(pascua, 68);
        }
        if (tipo === "divino-nino" || texto.includes("primer domingo de septiembre")) {
            return obtenerDomingoOrdinal(anio, 9, 1);
        }

        const patronDomingo = texto.match(/(primer|segundo|tercer|cuarto) domingo de ([a-záéíóúñ]+)/i);

        if (patronDomingo) {
            const ordinales = {
                primer: 1,
                segundo: 2,
                tercer: 3,
                cuarto: 4
            };

            const meses = {
                enero: 1,
                febrero: 2,
                marzo: 3,
                abril: 4,
                mayo: 5,
                junio: 6,
                julio: 7,
                agosto: 8,
                septiembre: 9,
                octubre: 10,
                noviembre: 11,
                diciembre: 12
            };

            const ordinal = ordinales[patronDomingo[1].toLowerCase()];
            const mes = meses[patronDomingo[2].toLowerCase()];

            if (ordinal && mes) {
                return obtenerDomingoOrdinal(anio, mes, ordinal);
            }
        }

        return null;
    }

    const datos = parsearFestividad(fecha);
    if (!datos || datos.mes < 1 || datos.mes > 12 || datos.dia < 1 || datos.dia > 31) {
        return null;
    }
    return crearFechaLocal(anio, datos.mes, datos.dia);
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

    const fechaSoloDia = crearFechaLocal(
        fechaActual.getFullYear(),
        fechaActual.getMonth() + 1,
        fechaActual.getDate()
    );

    let inicio = obtenerFechaInicioNovena(fecha, anioActual);
    let fin = obtenerFechaFinNovena(fecha, anioActual);

    if (!inicio || !fin) {
        return null;
    }

    if (fechaSoloDia < inicio) {
        return {
            estado: "proxima",
            dia: 0,
            inicio,
            fin
        };
    }

    if (fechaSoloDia > fin) {
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
                fechaSoloDia.getTime() -
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
    if (!fecha) {
        return null;
    }

    const hoy = obtenerFechaActual();
    const inicioHoy = crearFechaLocal(
        hoy.getFullYear(),
        hoy.getMonth() + 1,
        hoy.getDate()
    );

    let festividad = obtenerFechaFestividad(
        fecha,
        hoy.getFullYear()
    );

    if (!festividad) {
        return null;
    }

    if (festividad < inicioHoy) {
        festividad = obtenerFechaFestividad(
            fecha,
            hoy.getFullYear() + 1
        );
    }

    if (!festividad) {
        return null;
    }

    return Math.round(
        (
            festividad.getTime() -
            inicioHoy.getTime()
        ) /
        (1000 * 60 * 60 * 24)
    );
}
