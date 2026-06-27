/* ==========================================
   DIVIDER
   Amigos del Cielo
========================================== */

/**
 * Crea una línea divisoria.
 *
 * @param {string} tipo
 * @returns {string}
 */

function renderDivider(

    tipo = "default"

) {

    return `

        <hr

            class="divider divider-${tipo}">

    `;

}

/**
 * Crea un separador con texto.
 *
 * @param {string} texto
 * @returns {string}
 */

function renderDividerText(

    texto

) {

    return `

        <div class="divider-text">

            <span>

                ${texto}

            </span>

        </div>

    `;

}

/**
 * Alias para mantener
 * consistencia con los
 * demás componentes.
 */

const crearDivider = renderDivider;

const crearDividerTexto = renderDividerText;