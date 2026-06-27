/* ==========================================
   CHIP
   Amigos del Cielo
========================================== */

/**
 * Crea un chip.
 *
 * @param {string} texto
 * @param {string} tipo
 * @returns {string}
 */

function renderChip(

    texto,

    tipo = "default"

) {

    return `

        <span class="chip chip-${tipo}">

            ${texto}

        </span>

    `;

}

/**
 * Crea un grupo de chips.
 *
 * @param {Array<string>} lista
 * @param {string} tipo
 * @returns {string}
 */

function renderChipGroup(

    lista = [],

    tipo = "default"

) {

    if (lista.length === 0) {

        return "";

    }

    return `

        <div class="chip-group">

            ${lista

                .map(

                    item => renderChip(

                        item,

                        tipo

                    )

                )

                .join("")}

        </div>

    `;

}

/**
 * Alias para mantener
 * consistencia con los
 * demás componentes.
 */

const crearChip = renderChip;

const crearGrupoChips = renderChipGroup;