/* ==========================================
   DIVIDER
========================================== */

/**
 * Línea divisoria.
 */

function renderDivider() {

    return `

        <hr class="divider">

    `;

}

/**
 * Separador con texto.
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