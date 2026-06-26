/* ==========================================
   ORACIONES
========================================== */

/**
 * Renderiza una oración.
 */

function renderOracion(

    titulo,

    texto

) {

    return `

        <section class="prayer">

            <h3>

                ${titulo}

            </h3>

            <p>

                ${texto}

            </p>

        </section>

    `;

}

/**
 * Oración destacada.
 */

function renderOracionDestacada(

    texto

) {

    return `

        <blockquote
            class="featured-prayer">

            ${texto}

        </blockquote>

    `;

}