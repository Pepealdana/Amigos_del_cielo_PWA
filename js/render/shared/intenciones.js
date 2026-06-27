/* ==========================================
   INTENCIONES
   Amigos del Cielo
========================================== */

/**
 * Renderiza el bloque de intenciones.
 *
 * @param {Array<string>} intenciones
 * @returns {string}
 */

function renderIntenciones(

    intenciones = []

) {

    return `

        <section class="intentions">

            <h3>

                Intenciones de oración

            </h3>

            <p>

                Presenta estas intenciones al Señor
                y añade también la intención
                que llevas en tu corazón.

            </p>

            ${

                intenciones.length

                    ? `

                    <ul class="intentions-list">

                        ${

                            intenciones

                                .map(

                                    item => `

                                        <li>

                                            ${item}

                                        </li>

                                    `

                                )

                                .join("")

                        }

                    </ul>

                    `

                    : ""

            }

            <label

                for="personal-intention"

                class="intention-label">

                Intención personal

            </label>

            <textarea

                id="personal-intention"

                class="intention-input"

                rows="5"

                placeholder="Escribe aquí tu intención (opcional)...">

            </textarea>

        </section>

    `;

}

/**
 * Alias para mantener
 * consistencia.
 */

const crearIntenciones = renderIntenciones;