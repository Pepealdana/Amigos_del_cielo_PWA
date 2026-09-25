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

    version: "1.1.0",

    autor: "Peter Aldana",

    correoContacto:
        "pepealdanagomez@hotmail.com",

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

    permitirAudio: false,

    /* ==========================
       FECHAS
    ========================== */

    formatoFecha: "es-CO",

    /* ==========================
       REPOSITORIO
    ========================== */

    github:
        "https://github.com/Pepealdana/Amigos_del_cielo_PWA"

};