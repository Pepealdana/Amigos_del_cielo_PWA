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
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-body">

            <div class="modal-content">

                <h2 id="modal-title" class="modal-title">

                    ${titulo}

                </h2>

                <div id="modal-body" class="modal-body">

                    ${contenido}

                </div>

                <div class="modal-footer">

                    <button
                        class="btn btn-primary modal-close-button"
                        type="button"
                        onclick="cerrarModal()"
                        aria-label="${escaparHTML(textoBoton)}">
                        ${escaparHTML(textoBoton)}
                    </button>

                </div>

            </div>

        </div>

    `;

}

/**
 * Inserta un modal
 * en la aplicación.
 */

let elementoConFocoAntesDelModal = null;

function mostrarModal(

    titulo,

    contenido,

    textoBoton = "Cerrar"

) {

    cerrarModal();

    elementoConFocoAntesDelModal =
        document.activeElement;

    document.body.insertAdjacentHTML(
        "beforeend",
        renderModal(
            titulo,
            contenido,
            textoBoton
        )
    );

    const modal = document.querySelector(".modal");
    const botonCerrar = modal?.querySelector(".modal-close-button");

    botonCerrar?.focus();

    modal?.addEventListener("click", evento => {
        if (evento.target === modal) {
            cerrarModal();
        }
    });

}

/**
 * Elimina el modal.
 */

function mantenerFocoModal(evento) {

    if (evento.key !== "Tab") return;

    const modal = document.querySelector(".modal");
    if (!modal) return;

    const elementos = Array.from(
        modal.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
    );

    if (!elementos.length) {
        evento.preventDefault();
        return;
    }

    const primero = elementos[0];
    const ultimo = elementos[elementos.length - 1];

    if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
    }
}

function cerrarModal() {

    document
        .querySelector(".modal")
        ?.remove();

    if (
        elementoConFocoAntesDelModal &&
        document.contains(elementoConFocoAntesDelModal)
    ) {
        elementoConFocoAntesDelModal.focus();
    }

    elementoConFocoAntesDelModal = null;
}

/**
 * Alias para mantener
 * consistencia.
 */

const crearModal = renderModal;