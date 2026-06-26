/* ==========================================
   HEADER INTERNO
========================================== */

function renderHeader(

    titulo,

    subtitulo = ""

){

    return `

        <header class="page-header">

            <h2>

                ${titulo}

            </h2>

            <p>

                ${subtitulo}

            </p>

        </header>

    `;

}