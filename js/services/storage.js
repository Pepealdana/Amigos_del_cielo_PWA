/* ==========================================
   STORAGE
   Amigos del Cielo
========================================== */

/* ==========================================
   FUNCIONES INTERNAS
========================================== */

function guardarEnStorage(clave, datos) {

    try {

        localStorage.setItem(

            clave,

            JSON.stringify(datos)

        );

        return true;

    }

    catch (error) {

        console.error(

            "Error guardando datos:",

            error

        );

        return false;

    }

}

function leerDeStorage(

    clave,

    valorPorDefecto = null

) {

    try {

        const datos =

            localStorage.getItem(clave);

        return datos

            ? JSON.parse(datos)

            : valorPorDefecto;

    }

    catch (error) {

        console.error(

            "Error leyendo datos:",

            error

        );

        return valorPorDefecto;

    }

}

function eliminarDeStorage(clave) {

    try {

        localStorage.removeItem(clave);

    }

    catch (error) {

        console.error(

            "Error eliminando datos:",

            error

        );

    }

}

function limpiarStorage() {

    try {

        localStorage.clear();

    }

    catch (error) {

        console.error(

            "Error limpiando almacenamiento:",

            error

        );

    }

}

/* ==========================================
   FAVORITOS
========================================== */

function cargarFavoritos() {

    state.favoritos =

        leerDeStorage(

            STORAGE_KEYS.FAVORITES,

            []

        );

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

            state.favoritos.filter(

                item => item !== id

            );

    }

    else {

        state.favoritos.push(id);

    }

    guardarFavoritos();

}

/* ==========================================
   PROGRESO
========================================== */

function cargarProgreso() {

    state.progreso =

        leerDeStorage(

            STORAGE_KEYS.PROGRESS,

            {}

        );

}

function guardarProgreso() {

    guardarEnStorage(

        STORAGE_KEYS.PROGRESS,

        state.progreso

    );

}

function actualizarProgreso(

    novenaId,

    dia

) {

    state.progreso[novenaId] = {

        dia,

        fecha:

            new Date().toISOString()

    };

    guardarProgreso();

}

/* ==========================================
   CONFIGURACIÓN
========================================== */

function cargarConfiguracion() {

    const configuracion =

        leerDeStorage(

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

    state.intenciones =

        leerDeStorage(

            STORAGE_KEYS.INTENTIONS,

            {}

        );

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