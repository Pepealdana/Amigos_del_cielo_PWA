/* ==========================================
   PORTADA NOVENA
========================================== */

function renderPortadaNovena(novena) {

    return `

        <section class="home">

            ${crearImagen(

                novena.image,

                novena.name

            )}

            ${crearTitulo(

                novena.name

            )}

            <p class="saint-title">

                ${novena.title}

            </p>

            <p class="saint-feast">

                Festividad:
                ${novena.feast}

            </p>

            ${crearLista(

                "Patrono de",

                novena.patronages

            )}

            <div class="button-group">

                ${crearBoton(

                    "Leer Historia",

                    "mostrarHistoria()"

                )}

                ${crearBoton(

                    "Comenzar Novena",

                    "iniciarNovena()"

                )}

            </div>

        </section>

    `;

}