/* ==========================================
   COMPONENTES COMPUESTOS
   Amigos del Cielo
========================================== */

/**
 * Construye un bloque compuesto
 * formado por un título y contenido.
 *
 * @param {string} titulo
 * @param {string} contenido
 * @returns {string}
 */

function renderSeccion(
    titulo,
    contenido
) {

    return `

        <section class="section">

            <h2 class="section-title">

                ${titulo}

            </h2>

            ${contenido}

        </section>

    `;

}

/**
 * Crea un bloque con un encabezado
 * y una lista de elementos.
 */

function renderListaSeccion(
    titulo,
    items
) {

    return renderSeccion(

        titulo,

        renderLista(items)

    );

}