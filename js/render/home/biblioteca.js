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

    const categorias =
        obtenerCategorias(catalogo);

    let listaInicial =
        filtrarCategoria(
            catalogo,
            categoriaBibliotecaPWA
        );

    if (state.busqueda.trim()) {
        listaInicial =
            buscarNovenas(
                listaInicial,
                state.busqueda
            );
    }

    return `

        <section class="library page-shell">

            <header class="library-head">

                <h2>Biblioteca</h2>

                <p>
                    Encuentra una novena o un santo
                    y comienza tu camino de oración.
                </p>

            </header>

            <div class="search-box">

                <span
                    class="search-box-icon"
                    aria-hidden="true">
                    🔎
                </span>

                <input
                    id="library-search"
                    type="search"
                    value="${escaparHTML(state.busqueda || "")}"
                    placeholder="Buscar una novena o un santo..."
                    autocomplete="off"
                    aria-label="Buscar una novena o un santo en la biblioteca">

            </div>

            <div
                class="library-filters"
                aria-label="Categorías">

                ${categorias.map(categoria => `

                    <button
                        class="library-filter ${categoria === "Todas" ? "active" : ""}"
                        type="button"
                        data-category="${escaparHTML(categoria)}">

                        ${escaparHTML(categoria)}

                    </button>

                `).join("")}

            </div>

            <div
                id="library-list"
                class="library-list">

                ${renderListaBiblioteca(listaInicial)}

            </div>

        </section>

    `;
}

function renderListaBiblioteca(catalogo = []) {

    if (
        !Array.isArray(catalogo) ||
        catalogo.length === 0
    ) {
        return `
            <div class="simple-panel">
                <strong>No encontramos resultados.</strong>
                <p>
                    Prueba con otro término o categoría.
                </p>
            </div>
        `;
    }

    return catalogo.map(novena => `

        <button
            class="library-item"
            type="button"
            data-action="open-novena"
            data-id="${escaparHTML(novena.id)}">

            ${novena.image ? `
                <img
                    src="${escaparHTML(novena.image)}"
                    alt="${escaparHTML(novena.name)}"
                    class="library-item-image"
                    loading="lazy">
            ` : `
                <span
                    class="library-item-image library-item-image-placeholder"
                    aria-hidden="true">✦</span>
            `}

            <span class="library-item-content">

                <strong class="library-item-name">
                    ${escaparHTML(novena.name)}
                </strong>

                <span class="library-item-title">
                    ${escaparHTML(novena.title || "")}
                </span>

                <span class="library-item-meta">
                    ${escaparHTML(
                        formatearFechaLiturgica(
                            novena.feast
                        )
                    )}
                </span>

            </span>

            <span
                class="library-item-arrow"
                aria-hidden="true">
                ›
            </span>

        </button>

    `).join("");
}
