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
            completada: false,
            fecha: null,
            fechaFinalizacion: null
        };
    }

    return {
        ...anterior,
        diasVisitados: obtenerDiasRezado(novenaId)
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

    const registro = {
        ...anterior,
        dia: numeroDia,
        diasVisitados,
        completada,
        fecha: new Date().toISOString(),
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
            !progreso.completada &&
            obtenerDiasRezado(item.id).length > 0
        );
    });
}

function obtenerNovenasTerminadas(catalogo = state.catalogo) {
    if (!Array.isArray(catalogo)) {
        return [];
    }

    return catalogo.filter(item => {
        const progreso = state.progreso?.[item?.id];
        return Boolean(item?.id && progreso?.completada);
    });
}

function reiniciarNovena(novenaId) {
    if (!novenaId) {
        return false;
    }

    return guardarRegistroProgreso(novenaId, {
        dia: 0,
        diasVisitados: [],
        completada: false,
        fecha: new Date().toISOString(),
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

    return guardarRegistroProgreso(novenaId, {
        ...anterior,
        dia: progreso.totalDias,
        diasVisitados: progreso.diasRezado,
        completada: true,
        fecha: new Date().toISOString(),
        fechaFinalizacion: anterior.fechaFinalizacion || new Date().toISOString()
    });
}
