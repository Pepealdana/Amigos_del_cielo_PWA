/* ==========================================
   MODAL
   Amigos del Cielo
========================================== */

/**
 * Renderiza un modal genérico.
 *
 * @param {string} titulo
 * @param {string} contenido
 * @param {string} textoBoton
 * @returns {string}
 */

function renderModal(

    titulo,

    contenido,

    textoBoton = "Cerrar"

) {

    return `

        <div

            class="modal"

            role="dialog"

            aria-modal="true">

            <div class="modal-content">

                <h2 class="modal-title">

                    ${titulo}

                </h2>

                <div class="modal-body">

                    ${contenido}

                </div>

                <div class="modal-footer">

                    ${crearBoton(

                        textoBoton,

                        "cerrarModal()"

                    )}

                </div>

            </div>

        </div>

    `;

}

/**
 * Inserta un modal
 * en la aplicación.
 */

function mostrarModal(

    titulo,

    contenido,

    textoBoton = "Cerrar"

) {

    document.body.insertAdjacentHTML(

        "beforeend",

        renderModal(

            titulo,

            contenido,

            textoBoton

        )

    );

}

/**
 * Elimina el modal.
 */

function cerrarModal() {

    document

        .querySelector(

            ".modal"

        )

        ?.remove();

}

/**
 * Alias para mantener
 * consistencia.
 */

const crearModal = renderModal;