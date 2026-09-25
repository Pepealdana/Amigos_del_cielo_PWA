/* ==========================================
   FORMATOS
   Amigos del Cielo
========================================== */

function capitalizar(texto) {
    if (!texto) return "";
    return texto.toLowerCase().replace(/\b\w/g, letra => letra.toUpperCase());
}

function resumirTexto(texto, longitud = 140) {
    if (!texto) return "";
    if (texto.length <= longitud) return texto;
    return texto.substring(0, longitud) + "...";
}

function generarSlug(texto) {
    if (!texto) return "";
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function limpiarTexto(texto) {
    return texto ? texto.trim() : "";
}

function primeraMayuscula(texto) {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function formatearPorcentaje(valor) {
    const numero = Number(valor);
    return Number.isFinite(numero) ? `${numero}%` : "0%";
}

function formatearNumero(numero) {
    return Number(numero).toLocaleString(APP_CONFIG.formatoFecha || "es");
}

function escaparHTML(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
