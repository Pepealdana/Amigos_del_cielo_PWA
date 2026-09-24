/* ==========================================
   DATA SERVICE
   Amigos del Cielo
========================================== */

const DATA_PATH = "./data/novenas.json";

async function cargarCatalogo() {
    const response = await fetch(DATA_PATH, { cache: "no-cache" });

    if (!response.ok) {
        throw new Error(
            "No fue posible cargar el catálogo (" +
            response.status +
            ")."
        );
    }

    const catalogo = await response.json();

    if (!Array.isArray(catalogo)) {
        throw new Error(
            "El catálogo de novenas no tiene un formato válido."
        );
    }

    state.catalogo = catalogo.filter(
        novena => novena && novena.status !== "draft"
    );

    return state.catalogo;
}

async function cargarNovena(id) {
    if (!id) {
        throw new Error(
            "No se indicó el identificador de la novena."
        );
    }

    const resumen = buscarNovenaPorId(
        state.catalogo,
        id
    );

    if (!resumen) {
        throw new Error(
            "No existe la novena con id: " + id
        );
    }

    if (!resumen.file) {
        throw new Error(
            'La novena "' + id + '" no tiene archivo de datos.'
        );
    }

    const ruta = "./" +
        resumen.file.replace("./", "");

    const response = await fetch(
        ruta,
        { cache: "no-cache" }
    );

    if (!response.ok) {
        throw new Error(
            "No fue posible cargar la novena (" +
            response.status +
            ")."
        );
    }

    const novena = await response.json();

    if (!novena || typeof novena !== "object") {
        throw new Error(
            "Los datos de la novena no son válidos."
        );
    }

    if (!Array.isArray(novena.days)) {
        novena.days = [];
    }

    state.novenaActual = novena;

    const progreso = state.progreso[id];

    state.diaActual =
        Number(progreso?.dia) || 1;

    return novena;
}

function obtenerDia(numeroDia) {
    if (
        !state.novenaActual ||
        !Array.isArray(state.novenaActual.days)
    ) {
        return null;
    }

    return state.novenaActual.days.find(
        dia => Number(dia.day) === Number(numeroDia)
    ) || null;
}

function obtenerDiaActualNovena() {
    return obtenerDia(state.diaActual);
}

function obtenerTotalDiasNovena() {
    const configurados =
        Number(state.novenaActual?.novena?.days);

    if (
        Number.isInteger(configurados) &&
        configurados > 0
    ) {
        return configurados;
    }

    const disponibles =
        state.novenaActual?.days?.length || 0;

    return disponibles || APP_CONFIG.diasNovena;
}

function cambiarDia(numeroDia) {
    const numero = Number(numeroDia);
    const total = obtenerTotalDiasNovena();

    if (
        !Number.isInteger(numero) ||
        numero < 1 ||
        numero > total ||
        !obtenerDia(numero)
    ) {
        return false;
    }

    state.diaActual = numero;
    return true;
}

function reiniciarNovena() {
    if (!state.novenaActual) {
        return;
    }

    const id = state.novenaActual.id;

    delete state.progreso[id];

    state.ultimaNovenaId = null;
    state.diaActual = 1;

    guardarProgreso();
}

function cerrarNovenaActual() {
    state.novenaActual = null;
    state.diaActual = 1;
}
