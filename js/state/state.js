/* ==========================================
   AMIGOS DEL CIELO
   ESTADO GLOBAL
========================================== */

const state = {
    catalogo: [],
    catalogosV2: {
        santos: [],
        maria: [],
        devociones: [],
        paises: []
    },
    novenaActual: null,
    diaActual: 1,
    ultimaNovenaId: null,
    favoritos: [],
    progreso: {},
    intenciones: {},
    configuracion: {
        tema: "claro",
        idioma: "es",
        region: "CO",
        tamanoTexto: "normal"
    },
    busqueda: "",
    busquedaCatalogo: "",
    paisCatalogo: "ALL",
    grupoCatalogo: "ALL"
};
