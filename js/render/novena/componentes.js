/* ==========================================
   COMPONENTES DE NOVENA
   Amigos del Cielo
========================================== */

/**
 * Sección genérica.
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
 * Sección con lista.
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

/**
 * Imagen principal del santo.
 */

function renderImagenNovena(
    novena
) {

    return `

        <img

            src="${novena.image}"

            alt="${novena.name}"

            class="saint-image">

    `;

}

/**
 * Encabezado de la novena.
 */

function renderCabeceraNovena(
    novena
) {

    return `

        ${renderImagenNovena(

            novena

        )}

        <h2>

            ${novena.name}

        </h2>

        <p class="saint-title">

            ${novena.title}

        </p>

    `;

}

/**
 * Festividad.
 */

function renderFestividad(
    novena
) {

    return `

        <p class="saint-feast">

            📅
            ${formatearFechaLiturgica(

                novena.feast

            )}

        </p>

    `;

}

/**
 * Patronazgos.
 */

function renderPatronazgos(
    novena
) {

    return renderListaSeccion(

        "Patrono de",

        novena.patronages

    );

}

/**
 * Virtudes.
 */

function renderVirtudes(
    novena
) {

    return renderListaSeccion(

        "Virtudes",

        novena.virtues

    );

}

/**
 * Botonera estándar.
 */

function renderBotonera(
    botones
) {

    return `

        <div class="button-group">

            ${botones.join("")}

        </div>

    `;

}