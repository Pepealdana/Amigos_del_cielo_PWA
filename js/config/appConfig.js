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

    version: "1.2.0",

    autor: "Peter Aldana",

    correoContacto:
        "pepealdanagomez@hotmail.com",

    licencia: "MIT",

    idioma: "es",

    regionDefault: "CO",

    regionesHispanohablantes: [
        { codigo: "AR", nombre: "Argentina" },
        { codigo: "BO", nombre: "Bolivia" },
        { codigo: "CL", nombre: "Chile" },
        { codigo: "CO", nombre: "Colombia" },
        { codigo: "CR", nombre: "Costa Rica" },
        { codigo: "CU", nombre: "Cuba" },
        { codigo: "DO", nombre: "República Dominicana" },
        { codigo: "EC", nombre: "Ecuador" },
        { codigo: "ES", nombre: "España" },
        { codigo: "GT", nombre: "Guatemala" },
        { codigo: "HN", nombre: "Honduras" },
        { codigo: "MX", nombre: "México" },
        { codigo: "NI", nombre: "Nicaragua" },
        { codigo: "PA", nombre: "Panamá" },
        { codigo: "PE", nombre: "Perú" },
        { codigo: "PR", nombre: "Puerto Rico" },
        { codigo: "PY", nombre: "Paraguay" },
        { codigo: "SV", nombre: "El Salvador" },
        { codigo: "UY", nombre: "Uruguay" },
        { codigo: "VE", nombre: "Venezuela" },
        { codigo: "OT", nombre: "Otro país hispanohablante" }
    ],

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

    formatoFecha: "es",

    /* ==========================
       REPOSITORIO
    ========================== */

    github:
        "https://github.com/Pepealdana/Amigos_del_cielo_PWA"

};