/* ==========================================
   FECHAS
   Amigos del Cielo
========================================== */

/* ==========================================
   FECHA ACTUAL
========================================== */

function obtenerFechaActual() {

    return new Date();

}

/* ==========================================
   DÍA ACTUAL
========================================== */

function obtenerDiaActual() {

    return obtenerFechaActual()

        .getDate();

}

/* ==========================================
   MES ACTUAL
========================================== */

function obtenerMesActual() {

    return obtenerFechaActual()

        .getMonth() + 1;

}

/* ==========================================
   PARSEAR FESTIVIDAD

   Acepta:

   "19-03"

   "19/03"

   {
      day:19,
      month:3,
      text:"19 de marzo"
   }
========================================== */

function parsearFestividad(fecha) {

    if (!fecha) {

        return null;

    }

    /* --------------------------
       Nuevo formato
    -------------------------- */

    if (

        typeof fecha === "object"

    ) {

        return {

            dia:

                Number(fecha.day),

            mes:

                Number(fecha.month)

        };

    }

    /* --------------------------
       Formato texto
    -------------------------- */

    if (

        typeof fecha === "string"

    ) {

        const partes =

            fecha

                .replace(/\//g, "-")

                .split("-");

        return {

            dia:

                Number(partes[0]),

            mes:

                Number(partes[1])

        };

    }

    return null;

}

/* ==========================================
   FORMATEAR FECHA LITÚRGICA
========================================== */

function formatearFechaLiturgica(fecha) {

    if (!fecha) {

        return "";

    }

    /* --------------------------
       Nuevo JSON
    -------------------------- */

    if (

        typeof fecha === "object"

    ) {

        if (

            fecha.text

        ) {

            return fecha.text;

        }

        if (

            fecha.day &&

            fecha.month

        ) {

            return `${fecha.day} de ${MONTHS[fecha.month - 1]}`;

        }

    }

    /* --------------------------
       Formato antiguo
    -------------------------- */

    const datos =

        parsearFestividad(fecha);

    if (

        !datos ||

        isNaN(datos.dia) ||

        isNaN(datos.mes)

    ) {

        return "";

    }

    return `${datos.dia} de ${MONTHS[datos.mes - 1]}`;

}

/* ==========================================
   FORMATO CORTO
========================================== */

function formatearFechaCorta(fecha) {

    return formatearFechaLiturgica(

        fecha

    );

}

/* ==========================================
   FESTIVIDAD DEL MES
========================================== */

function esDelMesActual(fecha) {

    const datos =

        parsearFestividad(fecha);

    if (!datos) {

        return false;

    }

    return (

        datos.mes ===

        obtenerMesActual()

    );

}

/* ==========================================
   COMPARAR FESTIVIDAD

   ¿Es hoy la festividad?
========================================== */

function esHoyLaFestividad(fecha) {

    const datos =

        parsearFestividad(fecha);

    if (!datos) {

        return false;

    }

    return (

        datos.dia === obtenerDiaActual()

        &&

        datos.mes === obtenerMesActual()

    );

}

/* ==========================================
   DÍAS HASTA LA FESTIVIDAD

   (Se usará para las notificaciones)
========================================== */

function diasHastaFestividad(fecha) {

    const datos =

        parsearFestividad(fecha);

    if (!datos) {

        return null;

    }

    const hoy =

        obtenerFechaActual();

    let anio =

        hoy.getFullYear();

    let festividad =

        new Date(

            anio,

            datos.mes - 1,

            datos.dia

        );

    if (

        festividad < hoy

    ) {

        festividad =

            new Date(

                anio + 1,

                datos.mes - 1,

                datos.dia

            );

    }

    const diferencia =

        festividad - hoy;

    return Math.ceil(

        diferencia /

        (1000 * 60 * 60 * 24)

    );

}