/* ==========================================
   FAVORITAS
   Amigos del Cielo
========================================== */

function renderFavoritas(catalogo = [], favoritos = []) {

    const lista = Array.isArray(favoritos)
        ? catalogo.filter(novena => favoritos.includes(novena.id))
        : [];

    return `

        <section class="page-shell">

            <header class="page-header">

                <h2 class="page-title">
                    Mis favoritas
                </h2>

                <p class="page-subtitle">
                    Guarda las novenas que quieres tener a mano.
                </p>

            </header>

            ${lista.length === 0 ? `
                <div class="simple-panel">
                    <strong>Aún no tienes favoritas.</strong>
                    <p>
                        Puedes guardar una novena desde su pantalla
                        de información.
                    </p>
                </div>
            ` : `
                <div class="library-list">
                    ${renderListaBiblioteca(lista)}
                </div>
            `}

        </section>

    `;
}