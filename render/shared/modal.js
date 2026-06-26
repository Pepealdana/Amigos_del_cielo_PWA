/* ==========================================
   MODAL
========================================== */

/**
 * Modal genérico.
 */

function renderModal(

    titulo,

    contenido,

    boton = "Cerrar"

) {

    return `

        <div class="modal">

            <div class="modal-content">

                <h2>

                    ${titulo}

                </h2>

                <div>

                    ${contenido}

                </div>

                <button
                    onclick="cerrarModal()">

                    ${boton}

                </button>

            </div>

        </div>

    `;

}

/**
 * Cerrar modal.
 */

function cerrarModal() {

    const modal =

        document.querySelector(
            ".modal"
        );

    if (modal) {

        modal.remove();

    }

}