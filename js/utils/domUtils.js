/* ==========================================
   DOM
   Amigos del Cielo
========================================== */

/* ==========================================
   OBTENER ELEMENTO
========================================== */

function $(id) {

    return document.getElementById(id);

}

/* ==========================================
   VERIFICAR SI EXISTE
========================================== */

function existeElemento(id) {

    return $(id) !== null;

}

/* ==========================================
   CAMBIAR HTML
========================================== */

function setHTML(

    id,

    html

) {

    const elemento = $(id);

    if (elemento) {

        elemento.innerHTML = html;

    }

}

/* ==========================================
   OBTENER HTML
========================================== */

function getHTML(id) {

    return $(id)?.innerHTML ?? "";

}

/* ==========================================
   CAMBIAR TEXTO
========================================== */

function setTexto(

    id,

    texto

) {

    const elemento = $(id);

    if (elemento) {

        elemento.textContent = texto;

    }

}

/* ==========================================
   MOSTRAR
========================================== */

function mostrar(id) {

    $(id)?.classList.remove(

        "hidden"

    );

}

/* ==========================================
   OCULTAR
========================================== */

function ocultar(id) {

    $(id)?.classList.add(

        "hidden"

    );

}

/* ==========================================
   ALTERNAR VISIBILIDAD
========================================== */

function alternar(id) {

    $(id)?.classList.toggle(

        "hidden"

    );

}

/* ==========================================
   AGREGAR CLASE
========================================== */

function agregarClase(

    id,

    clase

) {

    $(id)?.classList.add(

        clase

    );

}

/* ==========================================
   QUITAR CLASE
========================================== */

function quitarClase(

    id,

    clase

) {

    $(id)?.classList.remove(

        clase

    );

}

/* ==========================================
   ALTERNAR CLASE
========================================== */

function toggleClase(

    id,

    clase

) {

    $(id)?.classList.toggle(

        clase

    );

}

/* ==========================================
   ESTABLECER ATRIBUTO
========================================== */

function setAtributo(

    id,

    atributo,

    valor

) {

    $(id)?.setAttribute(

        atributo,

        valor

    );

}

/* ==========================================
   OBTENER ATRIBUTO
========================================== */

function getAtributo(

    id,

    atributo

) {

    return $(id)?.getAttribute(

        atributo

    );

}

/* ==========================================
   CREAR ELEMENTO
========================================== */

function crearElemento(

    etiqueta,

    clase = ""

) {

    const elemento =

        document.createElement(

            etiqueta

        );

    if (clase) {

        elemento.className = clase;

    }

    return elemento;

}

/* ==========================================
   VACIAR CONTENEDOR
========================================== */

function vaciar(id) {

    const elemento = $(id);

    if (elemento) {

        elemento.innerHTML = "";

    }

}

/* ==========================================
   ENFOCAR ELEMENTO
========================================== */

function enfocar(id) {

    $(id)?.focus();

}