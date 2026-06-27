/* ==========================================
   CONFIGURACIÓN GENERAL
========================================== */

const APP_CONFIG = {

    /* ==========================
       INFORMACIÓN
    ========================== */

    nombre: "Amigos del Cielo",

    descripcion:
        "Novenas, santos y oración diaria.",

    version: "1.0.0",

    autor: "Peter Aldana",

    licencia: "MIT",

    idioma: "es",

    /* ==========================
       NOVENAS
    ========================== */

    diasNovena: 9,

    categoriaPrincipal: "Santos",

    /* ==========================
       APARIENCIA
    ========================== */

    colorPrincipal: "#2C4A6B",

    colorSecundario: "#7FB2D6",

    colorAcento: "#D9B66B",

    /* ==========================
       ALMACENAMIENTO
    ========================== */

    storage: {

        favoritos:
            "adc_favoritos",

        progreso:
            "adc_progreso",

        configuracion:
            "adc_configuracion"

    },

    /* ==========================
       FUNCIONES
    ========================== */

    permitirOffline: true,

    permitirFavoritos: true,

    permitirBusqueda: true,

    permitirNotificaciones: false,

    permitirAudio: false,

    /* ==========================
       FECHAS
    ========================== */

    formatoFecha: "es-CO",

    /* ==========================
       REPOSITORIO
    ========================== */

    github:
        "https://github.com/Pepealdana/Amigos-del-Cielo"

};