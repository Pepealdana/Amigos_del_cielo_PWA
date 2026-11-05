/* ==========================================
   PROGRESS SERVICE — V1.5.2
   Amigos del Cielo
========================================== */

/*
 * Fuente única de verdad para el avance de cada novena.
 * Visitar un día no lo marca como rezado: solo marcarDiaRezado().
 */

function obtenerTotalDiasProgreso(novenaId = null) {
    if (
        novenaId &&
        state.novenaActual?.id === novenaId &&
        typeof obtenerTotalDiasNovena === "function"
    ) {
        const totalActual = Number(obtenerTotalDiasNovena());
        if (Number.isInteger(totalActual) && totalActual > 0) {
            return totalActual;
        }
    }

    return Number(APP_CONFIG.diasNovena) || 9;
}

function obtenerDiasRezado(novenaId) {
    const progreso = state.progreso?.[novenaId];

    if (!progreso || typeof progreso !== "object") {
        return [];
    }

    const totalDias = obtenerTotalDiasProgreso(novenaId);
    const fuente = Array.isArray(progreso.diasVisitados)
        ? progreso.diasVisitados
        : Array.isArray(progreso.completados)
            ? progreso.completados
            : [];

    return [...new Set(
        fuente
            .map(Number)
            .filter(dia =>
                Number.isInteger(dia) &&
                dia >= 1 &&
                dia <= totalDias
            )
    )].sort((a, b) => a - b);
}

function obtenerEstadoProgresoNovena(novenaId) {
    const registro = state.progreso?.[novenaId];
    const totalDias = obtenerTotalDiasProgreso(novenaId);
    const diasRezado = obtenerDiasRezado(novenaId);
    const diasCompletos = Array.from(
        { length: totalDias },
        (_, indice) => indice + 1
    );
    const todosLosDiasRezados = diasCompletos.every(
        dia => diasRezado.includes(dia)
    );

    const completada =
        registro?.completada === true ||
        todosLosDiasRezados;

    const iniciada = Boolean(
        registro?.iniciada === true ||
        registro?.fechaInicio ||
        diasRezado.length > 0 ||
        completada
    );

    /*
     * El día de inicio puede ser distinto de 1 cuando el usuario
     * comienza siguiendo el calendario litúrgico. La continuación
     * recorre los días en ese orden circular: por ejemplo 6,7,8,9,1...
     * Así no regresa al día 1 inmediatamente después de rezar el 6.
     */
    const diaInicioGuardado = Number(registro?.diaInicio);
    const diaInicioInferido = diasRezado.length
        ? diasRezado[0]
        : Number(registro?.dia);
    const diaInicio =
        Number.isInteger(diaInicioGuardado) &&
        diaInicioGuardado >= 1 &&
        diaInicioGuardado <= totalDias
            ? diaInicioGuardado
            : (
                Number.isInteger(diaInicioInferido) &&
                diaInicioInferido >= 1 &&
                diaInicioInferido <= totalDias
                    ? diaInicioInferido
                    : 1
            );

    const ordenDias = [
        ...Array.from({ length: totalDias - diaInicio + 1 }, (_, i) => diaInicio + i),
        ...Array.from({ length: diaInicio - 1 }, (_, i) => i + 1)
    ];

    let siguienteDia = 1;

    if (iniciada && !completada) {
        siguienteDia =
            ordenDias.find(dia => !diasRezado.includes(dia)) ||
            diaInicio;
    } else if (completada) {
        siguienteDia = totalDias;
    }

    return {
        novenaId,
        iniciada,
        completada,
        totalDias,
        diasRezado,
        cantidadRezada: diasRezado.length,
        diaInicio,
        siguienteDia,
        porcentaje: completada
            ? 100
            : Math.min(100, Math.round((diasRezado.length / totalDias) * 100))
    };
}

function normalizarRegistroProgreso(novenaId) {
    if (!novenaId) return null;

    const anterior = state.progreso?.[novenaId];

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

    return {
        ...anterior,
        diasVisitados: obtenerDiasRezado(novenaId),
        diaInicio: Number(anterior.diaInicio) || (
            obtenerDiasRezado(novenaId)[0] ||
            Number(anterior.dia) ||
            1
        ),
        historialCompletaciones: Array.isArray(anterior.historialCompletaciones)
            ? anterior.historialCompletaciones
            : []
    };
}

function guardarRegistroProgreso(novenaId, registro) {
    if (!novenaId || !registro) return false;

    state.progreso[novenaId] = registro;
    state.ultimaNovenaId = novenaId;
    return guardarProgreso();
}

function iniciarProgresoNovena(novenaId, diaInicial = 1) {
    if (!novenaId) return false;

    const anterior = normalizarRegistroProgreso(novenaId);
    if (obtenerEstadoProgresoNovena(novenaId).completada) return false;
    if (obtenerEstadoProgresoNovena(novenaId).iniciada) return true;

    const totalDias = obtenerTotalDiasProgreso(novenaId);
    const numeroDia = Number(diaInicial);
    const diaValido =
        Number.isInteger(numeroDia) && numeroDia >= 1 && numeroDia <= totalDias
            ? numeroDia
            : 1;
    const ahora = new Date().toISOString();

    return guardarRegistroProgreso(novenaId, {
        ...anterior,
        dia: diaValido,
        diaInicio: diaValido,
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

    if (!Number.isInteger(numeroDia) || numeroDia < 1 || numeroDia > totalDias) {
        return { ok: false, reason: "DAY_INVALID" };
    }

    const anterior = normalizarRegistroProgreso(novenaId);
    const diasVisitados = [...anterior.diasVisitados];

    if (!diasVisitados.includes(numeroDia)) {
        diasVisitados.push(numeroDia);
        diasVisitados.sort((a, b) => a - b);
    }

    const completada = Array.from(
        { length: totalDias },
        (_, indice) => indice + 1
    ).every(diaRequerido => diasVisitados.includes(diaRequerido));

    const diaInicio =
        Number(anterior.diaInicio) >= 1 &&
        Number(anterior.diaInicio) <= totalDias
            ? Number(anterior.diaInicio)
            : (Number(anterior.dia) >= 1 ? Number(anterior.dia) : numeroDia);

    const ordenDias = [
        ...Array.from({ length: totalDias - diaInicio + 1 }, (_, i) => diaInicio + i),
        ...Array.from({ length: diaInicio - 1 }, (_, i) => i + 1)
    ];
    const siguienteDia = completada
        ? totalDias
        : (ordenDias.find(dia => !diasVisitados.includes(dia)) || diaInicio);

    const ahora = new Date().toISOString();
    const registro = {
        ...anterior,
        dia: siguienteDia,
        diaInicio,
        diasVisitados,
        iniciada: true,
        completada,
        fecha: ahora,
        fechaInicio: anterior.fechaInicio || ahora,
        fechaFinalizacion: completada
            ? (anterior.fechaFinalizacion || ahora)
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
    return obtenerDiasRezado(novenaId).includes(Number(dia));
}

function obtenerDiaContinuacion(novenaId) {
    return obtenerEstadoProgresoNovena(novenaId).siguienteDia;
}

function obtenerProgreso(novenaId) {
    return obtenerEstadoProgresoNovena(novenaId);
}

function obtenerNovenasConProgreso(catalogo = state.catalogo) {
    if (!Array.isArray(catalogo)) return [];

    return catalogo.filter(item => {
        if (!item?.id) return false;
        const estado = obtenerEstadoProgresoNovena(item.id);
        return estado.iniciada;
    });
}

function obtenerNovenasEnCurso(catalogo = state.catalogo) {
    return obtenerNovenasConProgreso(catalogo).filter(
        item => !obtenerEstadoProgresoNovena(item.id).completada
    );
}

function obtenerHistorialCompletaciones(novenaId) {
    const progreso = state.progreso?.[novenaId];

    if (!progreso || typeof progreso !== "object") return [];

    return Array.isArray(progreso.historialCompletaciones)
        ? progreso.historialCompletaciones.filter(item =>
            item && typeof item === "object" && item.fechaFinalizacion
        )
        : [];
}

function obtenerUltimaCompletacion(novenaId) {
    const historial = obtenerHistorialCompletaciones(novenaId);
    return historial.length ? historial[historial.length - 1] : null;
}

function obtenerVecesCompletada(novenaId) {
    return obtenerHistorialCompletaciones(novenaId).length;
}

function tieneCaminoRecorrido(novenaId) {
    return obtenerVecesCompletada(novenaId) > 0;
}

function registrarCompletacion(novenaId, fechaFinalizacion = new Date().toISOString()) {
    if (!novenaId) return false;

    const anterior = normalizarRegistroProgreso(novenaId);
    const historial = [...obtenerHistorialCompletaciones(novenaId)];
    const ultima = historial[historial.length - 1];

    if (ultima?.fechaFinalizacion === fechaFinalizacion) return true;

    historial.push({
        fechaInicio: anterior.fechaInicio || fechaFinalizacion,
        fechaFinalizacion
    });

    return guardarRegistroProgreso(novenaId, {
        ...anterior,
        iniciada: true,
        completada: true,
        historialCompletaciones: historial
    });
}

function obtenerNovenasTerminadas(catalogo = state.catalogo) {
    if (!Array.isArray(catalogo)) return [];

    return catalogo.filter(item =>
        item?.id && obtenerEstadoProgresoNovena(item.id).completada
    );
}

function abandonarNovena(novenaId) {
    if (!novenaId) return false;

    const anterior = normalizarRegistroProgreso(novenaId);
    if (!anterior) return false;

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
    if (!novenaId) return false;

    const ahora = new Date().toISOString();
    const anterior = normalizarRegistroProgreso(novenaId);

    return guardarRegistroProgreso(novenaId, {
        ...anterior,
        dia: 1,
        diaInicio: 1,
        diasVisitados: [],
        iniciada: true,
        completada: false,
        fecha: ahora,
        fechaInicio: ahora,
        fechaFinalizacion: null
    });
}

function finalizarNovena(novenaId) {
    if (!novenaId || !obtenerEstadoProgresoNovena(novenaId).completada) {
        return false;
    }

    const anterior = normalizarRegistroProgreso(novenaId);
    const fechaFinalizacion = anterior.fechaFinalizacion || new Date().toISOString();

    const guardado = guardarRegistroProgreso(novenaId, {
        ...anterior,
        dia: obtenerTotalDiasProgreso(novenaId),
        iniciada: true,
        completada: true,
        fecha: fechaFinalizacion,
        fechaFinalizacion
    });

    return guardado && registrarCompletacion(novenaId, fechaFinalizacion);
}
