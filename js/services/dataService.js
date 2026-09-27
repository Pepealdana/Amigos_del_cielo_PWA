/* ==========================================
   DATA SERVICE
   Amigos del Cielo
========================================== */

const CATALOG_V2_PATHS = {
    santos: "./data/catalog/santos.json",
    beatos: "./data/catalog/beatos.json",
    maria: "./data/catalog/maria.json",
    devociones: "./data/catalog/devociones.json",
    paises: "./data/catalog/paises.json"
};

let catalogosV2Cargados = false;

async function cargarCatalogosV2() {

    if (catalogosV2Cargados) {
        return state.catalogosV2;
    }

    const entradas = await Promise.all(
        Object.entries(CATALOG_V2_PATHS).map(
            async ([clave, ruta]) => {

                let response;

                try {
                    response = await fetch(ruta, { cache: "no-cache" });
                } catch (error) {
                    const fallo = new Error(
                        "No fue posible conectar con el catálogo de " + clave + "."
                    );
                    fallo.code = "CATALOG_NETWORK";
                    fallo.cause = error;
                    throw fallo;
                }

                if (!response.ok) {
                    const error = new Error(
                        "No fue posible cargar el catálogo de " +
                        clave + " (" + response.status + ")."
                    );
                    error.code = response.status === 404
                        ? "CATALOG_NOT_FOUND"
                        : "CATALOG_HTTP";
                    error.status = response.status;
                    throw error;
                }

                let datos;

                try {
                    datos = await response.json();
                } catch (error) {
                    const fallo = new Error(
                        "El catálogo de " + clave +
                        " contiene datos que no se pueden interpretar."
                    );
                    fallo.code = "CATALOG_INVALID_JSON";
                    fallo.cause = error;
                    throw fallo;
                }

                if (!datos || !Array.isArray(datos.items)) {
                    const error = new Error(
                        "El catálogo de " + clave +
                        " no tiene un formato válido."
                    );
                    error.code = "CATALOG_INVALID";
                    throw error;
                }

                return [clave, datos.items];
            }
        )
    );

    state.catalogosV2 = Object.fromEntries(entradas);

    /*
     * Desde v1.3.1 los catálogos V2 son la única fuente
     * de metadatos del catálogo en tiempo de ejecución.
     *
     * Cada registro publicado debe declarar sourceFile,
     * que apunta al JSON de contenido correspondiente.
     */
    const catalogo = [];

    for (const clave of ["santos", "beatos", "maria", "devociones"]) {

        const items = Array.isArray(state.catalogosV2[clave])
            ? state.catalogosV2[clave]
            : [];

        for (const item of items) {

            if (
                !item ||
                item.status !== "published" ||
                !item.id ||
                !item.name ||
                !item.sourceFile
            ) {
                continue;
            }

            catalogo.push({
                ...item,
                file: item.sourceFile,
                image: item.image || "",
                feast: item.feast || null
            });
        }
    }

    state.catalogo = catalogo;
    catalogosV2Cargados = true;

    return state.catalogosV2;
}

/*
 * Compatibilidad con el punto de entrada histórico.
 * El catálogo legado data/novenas.json ya no se carga.
 */
async function cargarCatalogo() {
    await cargarCatalogosV2();
    return state.catalogo;
}

async function cargarNovena(id) {

    if (!id) {
        const error = new Error("No se indicó el identificador de la novena.");
        error.code = "NOVENA_ID_MISSING";
        throw error;
    }

    const resumen = buscarNovenaPorId(state.catalogo, id);
    const resumenV2 = buscarContenidoCatalogoV2(id);
    const archivo = resumen?.file || resumenV2?.sourceFile;

    if (!archivo) {
        const error = new Error("No existe una novena válida con id: " + id);
        error.code = "NOVENA_NOT_FOUND";
        throw error;
    }

    const ruta = "./" + archivo.replace(/^\.\//, "");
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

    novena.id = resumen?.id || resumenV2?.id || id;

    if (!novena.feast) {
        novena.feast = resumen?.feast || resumenV2?.feast || null;
    }

    if (!novena.image) {
        novena.image = resumen?.image || resumenV2?.image || "";
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

function buscarContenidoCatalogoV2(id) {

    const catalogos = state.catalogosV2 || {};

    for (const clave of ["santos", "beatos", "maria", "devociones"]) {

        const items = Array.isArray(catalogos[clave])
            ? catalogos[clave]
            : [];

        const encontrado = items.find(item => item?.id === id);

        if (encontrado) {
            return encontrado;
        }
    }

    return null;
}

async function cargarJSONConRecuperacion(ruta) {

    let ultimoError = null;

    try {

        const response = await fetch(ruta, { cache: "no-cache" });

        if (!response.ok) {
            const error = new Error(
                "No fue posible cargar la novena (" + response.status + ")."
            );
            error.code = response.status === 404
                ? "NOVENA_NOT_FOUND"
                : "NOVENA_HTTP";
            error.status = response.status;
            throw error;
        }

        try {
            return await response.json();
        } catch (error) {
            const fallo = new Error(
                "El archivo de la novena no contiene JSON válido."
            );
            fallo.code = "NOVENA_INVALID_JSON";
            fallo.cause = error;
            throw fallo;
        }

    } catch (error) {
        ultimoError = error;
    }

    if (navigator.onLine) {

        try {

            const separador = ruta.includes("?") ? "&" : "?";
            const rutaActualizada = ruta + separador + "refresh=1";

            const response = await fetch(
                rutaActualizada,
                { cache: "reload" }
            );

            if (!response.ok) {
                const error = new Error(
                    "No fue posible actualizar la novena (" +
                    response.status + ")."
                );
                error.code = response.status === 404
                    ? "NOVENA_NOT_FOUND"
                    : "NOVENA_HTTP";
                error.status = response.status;
                throw error;
            }

            try {
                return await response.json();
            } catch (error) {
                const fallo = new Error(
                    "El archivo actualizado de la novena no contiene JSON válido."
                );
                fallo.code = "NOVENA_INVALID_JSON";
                fallo.cause = error;
                throw fallo;
            }

        } catch (error) {
            ultimoError = error;
        }
    }

    if (ultimoError && !ultimoError.code) {
        ultimoError.code = navigator.onLine
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

    if (!state.novenaActual || !Array.isArray(state.novenaActual.days)) {
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

    const configurados = Number(state.novenaActual?.novena?.days);

    if (Number.isInteger(configurados) && configurados > 0) {
        return configurados;
    }

    const disponibles = state.novenaActual?.days?.length || 0;

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
