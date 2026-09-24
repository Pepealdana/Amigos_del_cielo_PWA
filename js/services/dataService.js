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
        novena =>
            novena &&
            novena.status !== "draft" &&
            novena.id &&
            novena.name &&
            novena.file
    );

    return state.catalogo;
}

async function cargarNovena(id) {
    if (!id) {
        throw new Error("No se indicó el identificador de la novena.");
    }

    const resumen = buscarNovenaPorId(state.catalogo, id);

    if (!resumen || !resumen.file) {
        throw new Error(
            "No existe una novena válida con id: " + id
        );
    }

    const ruta = "./" + resumen.file.replace(/^\.\//, "");

    const response = await fetch(ruta, { cache: "no-cache" });

    if (!response.ok) {
        throw new Error(
            "No fue posible cargar la novena (" +
            response.status +
            ")."
        );
    }

    const novena = await response.json();

    if (!novena || typeof novena !== "object") {
        throw new Error("Los datos de la novena no son válidos.");
    }

    if (!Array.isArray(novena.days)) {
        novena.days = [];
    }

    if (!novena.id) {
        novena.id = resumen.id;
    }

    if (!novena.feast) {
        novena.feast = resumen.feast || null;
    }

    if (!novena.image) {
        novena.image = resumen.image || "";
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

function obtenerDiaInicialPorCalendario(novena) {
    if (!novena?.feast) {
        return 1;
    }

    const estado = obtenerEstadoNovena(novena.feast);

    if (
        estado?.estado === "en-curso" &&
        estado.dia >= 1 &&
        estado.dia <= obtenerTotalDiasNovena()
    ) {
        return estado.dia;
    }

    return 1;
}

function cerrarNovenaActual() {
    state.novenaActual = null;
    state.diaActual = 1;
}
