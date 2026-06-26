/* ==========================================
   HISTORIA
========================================== */

function renderHistoria(novena) {

    return `

        <section class="home">

            ${crearImagen(

                novena.image,

                novena.name

            )}

            ${crearTitulo(

                novena.name

            )}

            <p class="history">

                ${novena.history.short}

            </p>

            <div class="button-group">

                ${crearBoton(

                    "Volver",

                    "mostrarPortadaNovena()"

                )}

                ${crearBoton(

                    "Comenzar Novena",

                    "iniciarNovena()"

                )}

            </div>

        </section>

    `;

}