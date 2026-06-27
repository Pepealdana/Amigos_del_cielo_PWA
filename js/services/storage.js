/* ==========================================
   STORAGE
   Amigos del Cielo
========================================== */

const STORAGE_KEYS = {

    FAVORITOS: "adc_favoritos",

    PROGRESO: "adc_progreso",

    CONFIGURACION: "adc_configuracion"

};

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

function leerDeStorage(clave, valorPorDefecto = null) {

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

            STORAGE_KEYS.FAVORITOS,

            []

        );

}

function guardarFavoritos() {

    guardarEnStorage(

        STORAGE_KEYS.FAVORITOS,

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

            STORAGE_KEYS.PROGRESO,

            {}

        );

}

function guardarProgreso() {

    guardarEnStorage(

        STORAGE_KEYS.PROGRESO,

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

            STORAGE_KEYS.CONFIGURACION,

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

        STORAGE_KEYS.CONFIGURACION,

        state.configuracion

    );

}

/* ==========================================
   INICIALIZAR STORAGE
========================================== */

function inicializarStorage() {

    cargarFavoritos();

    cargarProgreso();

    cargarConfiguracion();

}