/* ==========================================
   ORACIONES
   Amigos del Cielo
========================================== */

/**
 * Renderiza un bloque de oración.
 *
 * @param {string} titulo
 * @param {string} texto
 * @returns {string}
 */

function renderOracion(

    titulo,

    texto

) {

    return `

        <section class="prayer">

            <h3 class="prayer-title">

                ${titulo}

            </h3>

            <div class="prayer-content">

                <p>

                    ${texto}

                </p>

            </div>

        </section>

    `;

}

/**
 * Renderiza una oración destacada.
 *
 * @param {string} texto
 * @returns {string}
 */

function renderOracionDestacada(

    texto

) {

    return `

        <blockquote class="featured-prayer">

            <p>

                ${texto}

            </p>

        </blockquote>

    `;

}

/**
 * Alias para mantener
 * consistencia entre componentes.
 */

const crearOracion = renderOracion;