/* ==========================================
   BIBLIOTECA
   Amigos del Cielo
========================================== */

function renderBiblioteca(catalogo = []) {

    if (!Array.isArray(catalogo) || catalogo.length === 0) {
        return renderEmptyState(
            "Biblioteca vacía",
            "Todavía no hay novenas disponibles."
        );
    }

    const categorias = obtenerCategorias(catalogo);

    return `

        <section class="library page-shell">

            <header class="library-head">

                <h2>Biblioteca</h2>

                <p>
                    Encuentra una novena y comienza tu camino de oración.
                </p>

            </header>

            <div class="search-box">

                <span class="search-box-icon" aria-hidden="true">🔎</span>

                <input
                    id="library-search"
                    type="search"
                    placeholder="Buscar una novena..."
                    autocomplete="off"
                    aria-label="Buscar una novena en la biblioteca">

            </div>

            <div class="library-filters" aria-label="Categorías">

                ${categorias.map(categoria => `

                    <button
                        class="library-filter ${categoria === "Todas" ? "active" : ""}"
                        type="button"
                        data-category="${categoria}">
                        ${categoria}
                    </button>

                `).join("")}

            </div>

            <div id="library-list" class="library-list">
                ${renderListaBiblioteca(catalogo)}
            </div>

        </section>

    `;
}

function renderListaBiblioteca(catalogo = []) {

    if (!Array.isArray(catalogo) || catalogo.length === 0) {
        return `
            <div class="simple-panel">
                <strong>No encontramos novenas.</strong>
                <p>Prueba con otro término de búsqueda.</p>
            </div>
        `;
    }

    return catalogo.map(novena => `

        <button
            class="library-item"
            type="button"
            data-action="open-novena"
            data-id="${novena.id}">

            <img
                src="${novena.image}"
                alt=""
                class="library-item-image"
                loading="lazy">

            <span class="library-item-content">

                <strong class="library-item-name">
                    ${novena.name}
                </strong>

                <span class="library-item-title">
                    ${novena.title}
                </span>

                <span class="library-item-meta">
                    ${formatearFechaLiturgica(novena.feast)}
                </span>

            </span>

            <span class="library-item-arrow" aria-hidden="true">›</span>

        </button>

    `).join("");
}