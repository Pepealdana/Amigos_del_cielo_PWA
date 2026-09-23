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
        localStorage.clear();
    } catch (error) {
        console.error("Error limpiando almacenamiento:", error);
    }
}

/* ==========================================
   FAVORITOS
========================================== */

function cargarFavoritos() {
    state.favoritos = leerDeStorage(
        STORAGE_KEYS.FAVORITES,
        []
    );

    if (!Array.isArray(state.favoritos)) {
        state.favoritos = [];
    }
}

function guardarFavoritos() {
    guardarEnStorage(
        STORAGE_KEYS.FAVORITES,
        state.favoritos
    );
}

function esFavorita(id) {
    return state.favoritos.includes(id);
}

function alternarFavorita(id) {
    if (esFavorita(id)) {
        state.favoritos =
            state.favoritos.filter(item => item !== id);
    } else {
        state.favoritos.push(id);
    }

    guardarFavoritos();
}

/* ==========================================
   PROGRESO
========================================== */

function cargarProgreso() {
    state.progreso = leerDeStorage(
        STORAGE_KEYS.PROGRESS,
        {}
    );

    if (
        !state.progreso ||
        typeof state.progreso !== "object" ||
        Array.isArray(state.progreso)
    ) {
        state.progreso = {};
    }

    const ids = Object.keys(state.progreso);

    if (ids.length > 0) {
        state.ultimaNovenaId = ids
            .sort((a, b) => {
                const fechaA =
                    new Date(state.progreso[a]?.fecha || 0).getTime();

                const fechaB =
                    new Date(state.progreso[b]?.fecha || 0).getTime();

                return fechaB - fechaA;
            })[0];
    }
}

function guardarProgreso() {
    guardarEnStorage(
        STORAGE_KEYS.PROGRESS,
        state.progreso
    );
}

function actualizarProgreso(novenaId, dia) {

    const anterior =
        state.progreso[novenaId] || {};

    const completados =
        Array.isArray(anterior.completados)
            ? [...anterior.completados]
            : [];

    if (!completados.includes(dia)) {
        completados.push(dia);
        completados.sort((a, b) => a - b);
    }

    state.progreso[novenaId] = {
        ...anterior,
        dia,
        completados,
        fecha: new Date().toISOString()
    };

    state.ultimaNovenaId = novenaId;

    guardarProgreso();
}

/* ==========================================
   CONFIGURACIÓN
========================================== */

function cargarConfiguracion() {
    const configuracion = leerDeStorage(
        STORAGE_KEYS.SETTINGS,
        null
    );

    if (configuracion) {
        state.configuracion = {
            ...state.configuracion,
            ...configuracion
        };
    }
}

function guardarConfiguracion() {
    guardarEnStorage(
        STORAGE_KEYS.SETTINGS,
        state.configuracion
    );
}

/* ==========================================
   INTENCIONES
========================================== */

function cargarIntenciones() {
    state.intenciones = leerDeStorage(
        STORAGE_KEYS.INTENTIONS,
        {}
    );

    if (
        !state.intenciones ||
        typeof state.intenciones !== "object"
    ) {
        state.intenciones = {};
    }
}

function guardarIntenciones() {
    guardarEnStorage(
        STORAGE_KEYS.INTENTIONS,
        state.intenciones
    );
}

/* ==========================================
   INICIALIZAR STORAGE
========================================== */

function inicializarStorage() {
    cargarFavoritos();
    cargarProgreso();
    cargarConfiguracion();
    cargarIntenciones();
}