/* ==========================================
   CHIP
========================================== */

/**
 * Chip individual.
 */

function renderChip(

    texto

) {

    return `

        <span class="chip">

            ${texto}

        </span>

    `;

}

/**
 * Grupo de chips.
 */

function renderChipGroup(

    lista

) {

    if (!lista || lista.length === 0) {

        return "";

    }

    return `

        <div class="chip-group">

            ${lista
                .map(
                    renderChip
                )
                .join("")
            }

        </div>

    `;

}