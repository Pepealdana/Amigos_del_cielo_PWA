/* ==========================================
   RENDER INICIO
========================================== */

function renderInicio(catalogo) {

    const destacada = obtenerNovenaDestacada(catalogo);

    if (!destacada) {

        return `

            <section class="home">

                <h2>

                    No hay novenas disponibles

                </h2>

            </section>

        `;

    }

    return `

        <section class="home">

            ${crearImagen(

                destacada.image,

                destacada.name

            )}

            ${crearTitulo(

                destacada.name

            )}

            <p class="saint-title">

                ${destacada.title}

            </p>

            <p class="saint-feast">

                Festividad:
                ${destacada.feast}

            </p>

            ${crearBoton(

                "Abrir Novena",

                `abrirNovena('${destacada.id}')`

            )}

        </section>

    `;

}