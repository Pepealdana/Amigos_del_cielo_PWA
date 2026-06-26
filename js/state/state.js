/**
 * ============================================
 * AMIGOS DEL CIELO
 * Estado Global de la Aplicación
 * ============================================
 */

const estado = {

    // Catálogo completo de novenas
    catalogo: [],

    // Novena actualmente abierta
    novenaActual: null,

    // Día actual de la novena
    diaActual: 1,

    // Favoritos del usuario
    favoritos: [],

    // Progreso de lectura
    progreso: {},

    // Configuración futura
    configuracion: {

        tema: "claro",

        idioma: "es",

        notificaciones: false

    }

};