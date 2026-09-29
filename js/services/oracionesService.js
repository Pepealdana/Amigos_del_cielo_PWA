/* ==========================================
   ORACIONES SERVICE — V1.4
   Amigos del Cielo
========================================== */

const ORACIONES_PATH = "./data/oraciones.json";

let oracionesCargadas = null;

async function cargarOraciones() {
    if (oracionesCargadas) {
        return oracionesCargadas;
    }

    let response;

    try {
        response = await fetch(ORACIONES_PATH, { cache: "no-cache" });
    } catch (error) {
        const fallo = new Error("No fue posible cargar el banco de oraciones.");
        fallo.code = "PRAYERS_NETWORK";
        fallo.cause = error;
        throw fallo;
    }

    if (!response.ok) {
        const error = new Error(
            "No fue posible cargar el banco de oraciones (" +
            response.status +
            ")."
        );
        error.code = response.status === 404
            ? "PRAYERS_NOT_FOUND"
            : "PRAYERS_HTTP";
        error.status = response.status;
        throw error;
    }

    try {
        oracionesCargadas = await response.json();
    } catch (error) {
        const fallo = new Error(
            "El banco de oraciones contiene JSON inválido."
        );
        fallo.code = "PRAYERS_INVALID_JSON";
        fallo.cause = error;
        throw fallo;
    }

    return oracionesCargadas;
}

function obtenerOracion(id) {
    const grupos = oracionesCargadas?.common || {};
    return grupos[id] || null;
}

function obtenerOraciones(ids = []) {
    return ids
        .map(id => obtenerOracion(id))
        .filter(Boolean);
}

