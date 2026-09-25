/* ==========================================
   DATA SERVICE
   Amigos del Cielo
========================================== */

const DATA_PATH = "./data/novenas.json";

async function cargarCatalogo() {
    let response;

    try {
        response = await fetch(DATA_PATH, { cache: "no-cache" });
    } catch (error) {
        const fallo = new Error("No fue posible conectar con el catálogo.");
        fallo.code = "CATALOG_NETWORK";
        fallo.cause = error;
        throw fallo;
    }

    if (!response.ok) {
        const error = new Error(
            "No fue posible cargar el catálogo (" +
            response.status +
            ")."
        );
        error.code = response.status === 404
            ? "CATALOG_NOT_FOUND"
            : "CATALOG_HTTP";
        error.status = response.status;
        throw error;
    }

    let catalogo;

    try {
        catalogo = await response.json();
    } catch (error) {
        const fallo = new Error("El catálogo contiene datos que no se pueden interpretar.");
        fallo.code = "CATALOG_INVALID_JSON";
        fallo.cause = error;
        throw fallo;
    }

    if (!Array.isArray(catalogo)) {
        const error = new Error(
            "El catálogo de novenas no tiene un formato válido."
        );
        error.code = "CATALOG_INVALID";
        throw error;
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

async function cargarCatalogosV2() {
    const rutas = {
        santos: "./data/catalog/santos.json",
        maria: "./data/catalog/maria.json",
        devociones: "./data/catalog/devociones.json"
    };

    const entradas = await Promise.all(
        Object.entries(rutas).map(async ([clave, ruta]) => {
            const response = await fetch(ruta, { cache: "no-cache" });

            if (!response.ok) {
                throw new Error(
                    "No fue posible cargar el catálogo v2 de " +
                    clave +
                    " (" +
                    response.status +
                    ")."
                );
            }

            const datos = await response.json();

            if (!datos || !Array.isArray(datos.items)) {
                throw new Error(
                    "El catálogo v2 de " + clave + " no tiene un formato válido."
                );
            }

            return [clave, datos.items];
        })
    );

    state.catalogosV2 = Object.fromEntries(entradas);

    return state.catalogosV2;
}

async function cargarNovena(id) {
    if (!id) {
        const error = new Error("No se indicó el identificador de la novena.");
        error.code = "NOVENA_ID_MISSING";
        throw error;
    }

    const resumen = buscarNovenaPorId(state.catalogo, id);

    if (!resumen || !resumen.file) {
        const error = new Error(
            "No existe una novena válida con id: " + id
        );
        error.code = "NOVENA_NOT_FOUND";
        throw error;
    }

    const ruta = "./" + resumen.file.replace(/^\.\//, "");

    const novena = await cargarJSONConRecuperacion(ruta);

    if (!novena || typeof novena !== "object" || Array.isArray(novena)) {
        const error = new Error("Los datos de la novena no son válidos.");
        error.code = "NOVENA_INVALID";
        throw error;
    }

    if (!Array.isArray(novena.days) || novena.days.length === 0) {
        const error = new Error("La novena no contiene días válidos.");
        error.code = "NOVENA_EMPTY";
        throw error;
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

    const totalDias = obtenerTotalDiasNovena();
    const progreso = state.progreso[id];
    const diaGuardado = Number(progreso?.dia);

    if (Number.isInteger(diaGuardado) && diaGuardado >= 1 && diaGuardado <= totalDias) {
        state.diaActual = diaGuardado;
    } else if (progreso?.completada) {
        state.diaActual = totalDias;
    } else {
        state.diaActual = 1;
    }

    return novena;
}

async function cargarJSONConRecuperacion(ruta) {

    let ultimoError = null;

    try {
        const response = await fetch(
            ruta,
            { cache: "no-cache" }
        );

        if (!response.ok) {
            const error = new Error(
                "No fue posible cargar la novena (" +
                response.status +
                ")."
            );
            error.code =
                response.status === 404
                    ? "NOVENA_NOT_FOUND"
                    : "NOVENA_HTTP";
            error.status = response.status;
            throw error;
        }

        try {
            return await response.json();
        } catch (error) {
            const fallo = new Error("El archivo de la novena no contiene JSON válido.");
            fallo.code = "NOVENA_INVALID_JSON";
            fallo.cause = error;
            throw fallo;
        }

    } catch (error) {
        ultimoError = error;
    }

    /*
     * Si el Service Worker conserva una copia antigua o
     * dañada, se fuerza una segunda solicitud con una URL
     * diferente. Esto permite obtener la versión actual
     * de GitHub Pages y actualizar el caché.
     */
    if (navigator.onLine) {

        try {
            const separador =
                ruta.includes("?") ? "&" : "?";

            const rutaActualizada =
                ruta +
                separador +
                "refresh=1";

            const response = await fetch(
                rutaActualizada,
                { cache: "reload" }
            );

            if (!response.ok) {
                const error = new Error(
                    "No fue posible actualizar la novena (" +
                    response.status +
                    ")."
                );
                error.code =
                    response.status === 404
                        ? "NOVENA_NOT_FOUND"
                        : "NOVENA_HTTP";
                error.status = response.status;
                throw error;
            }

            try {
                return await response.json();
            } catch (error) {
                const fallo = new Error("El archivo actualizado de la novena no contiene JSON válido.");
                fallo.code = "NOVENA_INVALID_JSON";
                fallo.cause = error;
                throw fallo;
            }

        } catch (error) {
            ultimoError = error;
        }
    }

    if (ultimoError && !ultimoError.code) {
        ultimoError.code =
            navigator.onLine
                ? "NOVENA_LOAD_FAILED"
                : "NOVENA_OFFLINE";
    }

    throw ultimoError ||
        Object.assign(
            new Error("No fue posible cargar los datos de la novena."),
            { code: "NOVENA_LOAD_FAILED" }
        );
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
