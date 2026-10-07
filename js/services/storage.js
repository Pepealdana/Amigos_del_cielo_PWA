/* ==========================================
   STORAGE
   Amigos del Cielo
========================================== */

function guardarEnStorage(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
        return true;
    } catch (error) {
        console.error("Error guardando datos:", error);
        return false;
    }
}

function leerDeStorage(clave, valorPorDefecto = null) {
    try {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : valorPorDefecto;
    } catch (error) {
        console.error("Error leyendo datos:", error);
        return valorPorDefecto;
    }
}

function eliminarDeStorage(clave) {
    try {
        localStorage.removeItem(clave);
    } catch (error) {
        console.error("Error eliminando datos:", error);
    }
}

function limpiarStorage() {
    try {
        Object.values(STORAGE_KEYS).forEach(clave => localStorage.removeItem(clave));
    } catch (error) {
        console.error("Error limpiando almacenamiento:", error);
    }
}

/* ==========================================
   FAVORITOS
========================================== */

function cargarFavoritos() {
    state.favoritos = leerDeStorage(STORAGE_KEYS.FAVORITES, []);
    if (!Array.isArray(state.favoritos)) state.favoritos = [];
}

function guardarFavoritos() {
    return guardarEnStorage(STORAGE_KEYS.FAVORITES, state.favoritos);
}

function esFavorita(id) {
    return state.favoritos.includes(id);
}

function alternarFavorita(id) {
    if (!id) return;

    if (esFavorita(id)) {
        state.favoritos = state.favoritos.filter(item => item !== id);
    } else {
        state.favoritos.push(id);
    }

    guardarFavoritos();
}

/* ==========================================
   PROGRESO — PERSISTENCIA
========================================== */

function cargarProgreso() {
    state.progreso = leerDeStorage(STORAGE_KEYS.PROGRESS, {});

    if (!state.progreso || typeof state.progreso !== "object" || Array.isArray(state.progreso)) {
        state.progreso = {};
    }

    for (const datos of Object.values(state.progreso)) {
        if (!datos || typeof datos !== "object") continue;

        if (!Array.isArray(datos.diasVisitados) && Array.isArray(datos.completados)) {
            datos.diasVisitados = [...new Set(
                datos.completados
                    .map(Number)
                    .filter(dia => Number.isInteger(dia) && dia >= 1)
            )].sort((a, b) => a - b);
        }

        /*
         * Migración V1.5.1:
         * los registros anteriores no tenían la bandera "iniciada".
         * La reconstruimos sin alterar el progreso existente.
         */
        if (datos.iniciada !== true) {
            const diasVisitados = Array.isArray(datos.diasVisitados)
                ? datos.diasVisitados
                : [];

            datos.iniciada =
                Boolean(datos.fechaInicio) ||
                diasVisitados.length > 0 ||
                datos.completada === true;
        }

        /*
         * Migración V1.5:
         * los registros antiguos solo conocían el estado "completada".
         * Ese estado se convierte una sola vez en la primera entrada
         * del historial, para que nadie pierda sus amigos del cielo.
         */
        if (
            datos.completada === true &&
            !Array.isArray(datos.historialCompletaciones)
        ) {
            const fecha = datos.fechaFinalizacion || datos.fecha || new Date().toISOString();

            datos.historialCompletaciones = [{
                fechaInicio: datos.fechaInicio || fecha,
                fechaFinalizacion: fecha
            }];
        } else if (!Array.isArray(datos.historialCompletaciones)) {
            datos.historialCompletaciones = [];
        }
    }

    guardarEnStorage(STORAGE_KEYS.PROGRESS, state.progreso);

    const ids = Object.keys(state.progreso);

    if (ids.length > 0) {
        state.ultimaNovenaId = ids.sort((a, b) => {
            const fechaA = new Date(state.progreso[a]?.fecha || 0).getTime();
            const fechaB = new Date(state.progreso[b]?.fecha || 0).getTime();
            return fechaB - fechaA;
        })[0];
    }
}

function guardarProgreso() {
    return guardarEnStorage(STORAGE_KEYS.PROGRESS, state.progreso);
}

/* ==========================================
   CONFIGURACIÓN
========================================== */

function cargarConfiguracion() {
    const configuracion = leerDeStorage(STORAGE_KEYS.SETTINGS, null);

    if (configuracion && typeof configuracion === "object") {
        state.configuracion = {
            ...state.configuracion,
            ...configuracion
        };
    }
}

function guardarConfiguracion() {
    return guardarEnStorage(STORAGE_KEYS.SETTINGS, state.configuracion);
}

/* ==========================================
   INTENCIONES
========================================== */

function cargarPatronoAnual() {
    state.patronoAnual = leerDeStorage(STORAGE_KEYS.ANNUAL_PATRON, {});

    if (!state.patronoAnual || typeof state.patronoAnual !== "object" || Array.isArray(state.patronoAnual)) {
        state.patronoAnual = {};
    }
}

function guardarPatronoAnual() {
    return guardarEnStorage(STORAGE_KEYS.ANNUAL_PATRON, state.patronoAnual);
}

function obtenerPatronoAnual(anio = new Date().getFullYear()) {
    return state.patronoAnual[String(anio)] || null;
}

function registrarPatronoAnual(anio, santo) {
    if (!anio || !santo?.id) return false;

    state.patronoAnual[String(anio)] = {
        santoId: santo.id,
        fechaAsignacion: new Date().toISOString()
    };

    return guardarPatronoAnual();
}

/* ==========================================
   INTENCIONES
========================================== */

function cargarIntenciones() {
    state.intenciones = leerDeStorage(STORAGE_KEYS.INTENTIONS, {});

    if (
        !state.intenciones ||
        typeof state.intenciones !== "object" ||
        Array.isArray(state.intenciones)
    ) {
        state.intenciones = {};
    }
}

function guardarIntenciones() {
    return guardarEnStorage(STORAGE_KEYS.INTENTIONS, state.intenciones);
}

/* ==========================================
   INICIALIZAR STORAGE
========================================== */

function inicializarStorage() {
    cargarFavoritos();
    cargarProgreso();
    cargarConfiguracion();
    cargarPatronoAnual();
    cargarIntenciones();
}


