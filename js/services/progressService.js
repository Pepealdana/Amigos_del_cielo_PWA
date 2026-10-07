/* ==========================================
   PROGRESS SERVICE — V1.5
   Amigos del Cielo
========================================== */

/*
 * Dominio de progreso de novenas.
 *
 * Regla central:
 * abrir/visitar un día NO lo marca como rezado.
 * Solo marcarDiaRezado() modifica los días rezados.
 */

function obtenerDiasRezado(novenaId) {
    const progreso = state.progreso?.[novenaId];

    if (!progreso || typeof progreso !== "object") {
        return [];
    }

    const fuente = Array.isArray(progreso.diasVisitados)
        ? progreso.diasVisitados
        : Array.isArray(progreso.completados)
            ? progreso.completados
            : [];

    return [...new Set(
        fuente
            .map(Number)
            .filter(dia => Number.isInteger(dia) && dia >= 1)
    )].sort((a, b) => a - b);
}

function obtenerTotalDiasProgreso(novenaId = null) {
    if (
        novenaId &&
        state.novenaActual?.id === novenaId &&
        typeof obtenerTotalDiasNovena === "function"
    ) {
        return obtenerTotalDiasNovena();
    }

    return Number(APP_CONFIG.diasNovena) || 9;
}

function normalizarRegistroProgreso(novenaId) {
    if (!novenaId) {
        return null;
    }

    const anterior = state.progreso[novenaId];

    if (!anterior || typeof anterior !== "object") {
        return {
            dia: 0,
            diasVisitados: [],
            iniciada: false,
            completada: false,
            fecha: null,
            fechaInicio: null,
            fechaFinalizacion: null,
            historialCompletaciones: []
        };
    }

    const diasVisitados = obtenerDiasRezado(novenaId);

    return {
        ...anterior,
        diasVisitados,
        iniciada:
            anterior.iniciada === true ||
            Boolean(anterior.fechaInicio) ||
            diasVisitados.length > 0 ||
            anterior.completada === true,
        historialCompletaciones: Array.isArray(anterior.historialCompletaciones)
            ? anterior.historialCompletaciones
            : []
    };
}

function guardarRegistroProgreso(novenaId, registro) {
    if (!novenaId || !registro) {
        return false;
    }

    state.progreso[novenaId] = registro;
    state.ultimaNovenaId = novenaId;

    return guardarProgreso();
}

function iniciarProgresoNovena(novenaId, diaInicial = 1) {
    if (!novenaId) {
        return false;
    }

    const anterior = normalizarRegistroProgreso(novenaId);

    if (anterior.completada) {
        return false;
    }

    /*
     * Una novena ya iniciada conserva el día desde el que quedó
     * pendiente. Esto evita que "Comenzar/Continuar" vuelva a
     * calcular el día desde el calendario y pierda el estado del usuario.
     */
    if (anterior.iniciada) {
        return true;
    }

    const totalDias = obtenerTotalDiasProgreso(novenaId);
    const numeroDia = Number(diaInicial);
    const diaValido =
        Number.isInteger(numeroDia) &&
        numeroDia >= 1 &&
        numeroDia <= totalDias
            ? numeroDia
            : 1;

    const ahora = new Date().toISOString();

    return guardarRegistroProgreso(novenaId, {
        ...anterior,
        dia: diaValido,
        diasVisitados: [],
        iniciada: true,
        completada: false,
        fecha: ahora,
        fechaInicio: ahora,
        fechaFinalizacion: null
    });
}

function marcarDiaRezado(novenaId, dia) {
    if (!novenaId) {
        return { ok: false, reason: "NOVENA_ID_MISSING" };
    }

    const numeroDia = Number(dia);
    const totalDias = obtenerTotalDiasProgreso(novenaId);

    if (
        !Number.isInteger(numeroDia) ||
        numeroDia < 1 ||
        numeroDia > totalDias
    ) {
        return { ok: false, reason: "DAY_INVALID" };
    }

    const anterior = normalizarRegistroProgreso(novenaId);
    const diasVisitados = [...anterior.diasVisitados];

    if (!diasVisitados.includes(numeroDia)) {
        diasVisitados.push(numeroDia);
        diasVisitados.sort((a, b) => a - b);
    }

    const completada = diasVisitados.length >= totalDias;

    const ahora = new Date().toISOString();

    const registro = {
        ...anterior,
        dia: numeroDia,
        diasVisitados,
        iniciada: true,
        completada,
        fecha: ahora,
        fechaInicio: anterior.fechaInicio || ahora,
        fechaFinalizacion: completada
            ? (anterior.fechaFinalizacion || new Date().toISOString())
            : null
    };

    const guardado = guardarRegistroProgreso(novenaId, registro);

    return {
        ok: guardado,
        dia: numeroDia,
        diasVisitados,
        totalDias,
        completada
    };
}

function estaDiaRezado(novenaId, dia) {
    const numeroDia = Number(dia);

    return obtenerDiasRezado(novenaId).includes(numeroDia);
}

function obtenerDiaContinuacion(novenaId) {
    if (!novenaId) {
        return 1;
    }

    const totalDias = obtenerTotalDiasProgreso(novenaId);
    const diasRezado = new Set(obtenerDiasRezado(novenaId));

    if (diasRezado.size >= totalDias) {
        return totalDias;
    }

    for (let dia = 1; dia <= totalDias; dia += 1) {
        if (!diasRezado.has(dia)) {
            return dia;
        }
    }

    return totalDias;
}

function obtenerProgreso(novenaId) {
    const totalDias = obtenerTotalDiasProgreso(novenaId);
    const diasRezado = obtenerDiasRezado(novenaId);

    return {
        novenaId,
        diasRezado,
        totalDias,
        cantidadRezada: diasRezado.length,
        iniciada: state.progreso?.[novenaId]?.iniciada === true,
        completada: diasRezado.length >= totalDias,
        siguienteDia: obtenerDiaContinuacion(novenaId)
    };
}

function obtenerNovenasEnCurso(catalogo = state.catalogo) {
    if (!Array.isArray(catalogo)) {
        return [];
    }

    return catalogo.filter(item => {
        const progreso = state.progreso?.[item?.id];
        return (
            item?.id &&
            progreso &&
            progreso.iniciada === true &&
            !progreso.completada
        );
    });
}

function obtenerHistorialCompletaciones(novenaId) {
    const progreso = state.progreso?.[novenaId];

    if (!progreso || typeof progreso !== "object") {
        return [];
    }

    return Array.isArray(progreso.historialCompletaciones)
        ? progreso.historialCompletaciones.filter(item =>
            item &&
            typeof item === "object" &&
            item.fechaFinalizacion
        )
        : [];
}

function obtenerUltimaCompletacion(novenaId) {
    const historial = obtenerHistorialCompletaciones(novenaId);

    return historial.length
        ? historial[historial.length - 1]
        : null;
}

function obtenerVecesCompletada(novenaId) {
    return obtenerHistorialCompletaciones(novenaId).length;
}

function tieneCaminoRecorrido(novenaId) {
    return obtenerVecesCompletada(novenaId) > 0;
}

function registrarCompletacion(novenaId, fechaFinalizacion = new Date().toISOString()) {
    if (!novenaId) {
        return false;
    }

    const anterior = normalizarRegistroProgreso(novenaId);
    const historial = [...obtenerHistorialCompletaciones(novenaId)];
    const ultima = historial[historial.length - 1];

    if (ultima?.fechaFinalizacion === fechaFinalizacion) {
        return true;
    }

    historial.push({
        fechaInicio: anterior.fechaInicio || fechaFinalizacion,
        fechaFinalizacion
    });

    return guardarRegistroProgreso(novenaId, {
        ...anterior,
        historialCompletaciones: historial
    });
}

function obtenerNovenasTerminadas(catalogo = state.catalogo) {
    if (!Array.isArray(catalogo)) {
        return [];
    }

    return catalogo.filter(item => tieneCaminoRecorrido(item?.id));
}

function abandonarNovena(novenaId) {
    if (!novenaId) {
        return false;
    }

    const anterior = normalizarRegistroProgreso(novenaId);

    if (!anterior) {
        return false;
    }

    return guardarRegistroProgreso(novenaId, {
        ...anterior,
        dia: 0,
        diasVisitados: [],
        iniciada: false,
        completada: false,
        fecha: null,
        fechaInicio: null,
        fechaFinalizacion: null
    });
}

function reiniciarNovena(novenaId) {
    if (!novenaId) {
        return false;
    }

    const ahora = new Date().toISOString();
    const anterior = normalizarRegistroProgreso(novenaId);

    return guardarRegistroProgreso(novenaId, {
        ...anterior,
        dia: 1,
        diasVisitados: [],
        iniciada: true,
        completada: false,
        fecha: ahora,
        fechaInicio: ahora,
        fechaFinalizacion: null
    });
}

/*
 * Finalizar solo es válido cuando todos los días fueron marcados.
 * No permite convertir una visita al último día en una oración registrada.
 */
function finalizarNovena(novenaId) {
    if (!novenaId) {
        return false;
    }

    const progreso = obtenerProgreso(novenaId);

    if (!progreso.completada) {
        return false;
    }

    const anterior = normalizarRegistroProgreso(novenaId);
    const fechaFinalizacion = anterior.fechaFinalizacion || new Date().toISOString();

    const guardado = guardarRegistroProgreso(novenaId, {
        ...anterior,
        dia: progreso.totalDias,
        diasVisitados: progreso.diasRezado,
        completada: true,
        fecha: fechaFinalizacion,
        fechaFinalizacion
    });

    if (!guardado) {
        return false;
    }

    return registrarCompletacion(novenaId, fechaFinalizacion);
}
