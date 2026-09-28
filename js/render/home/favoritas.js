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
            <div class="context-page-nav">
                <button
                    class="context-back"
                    type="button"
                    data-route="camino"
                    aria-label="Volver a Mi Camino">
                    ← Volver a Mi Camino
                </button>
            </div>

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
                        Guarda una novena desde su pantalla de información
                        para tenerla a mano cuando quieras volver a rezarla.
                    </p>
                    <button class="btn btn-outline" type="button" data-route="novenas">
                        Explorar novenas
                    </button>
                </div>
            ` : `
                <div class="library-results favoritos-list">
                    ${renderListaFavoritas(lista)}
                </div>
            `}

        </section>
    `;
}

function renderListaFavoritas(lista = []) {

    return lista.map(novena => `
        <button
            class="library-result"
            type="button"
            data-action="open-novena"
            data-id="${escaparHTML(novena.id)}">

            ${novena.image ? `
                <img
                    src="${escaparHTML(novena.image)}"
                    alt=""
                    class="library-result-image"
                    loading="lazy">
            ` : `
                <span
                    class="library-result-image library-image-placeholder"
                    aria-hidden="true">✦</span>
            `}

            <span class="library-result-content">
                <strong>${escaparHTML(novena.name)}</strong>
                <span>${escaparHTML(novena.title || "")}</span>
                <small>${escaparHTML(novena.feast?.text || "Contenido espiritual")}</small>
            </span>

            <span class="library-action-arrow" aria-hidden="true">›</span>
        </button>
    `).join("");
}
