/* ==========================================
   RENDER ORACIÓN
   Amigos del Cielo
========================================== */

function renderOracion(titulo, texto) {

    return `

        <section class="prayer">

            <h3>
                ${escaparHTML(titulo)}
            </h3>

            <article class="prayer-card">

                <div class="prayer-text">

                    <p>
                        ${escaparHTML(texto)}
                    </p>

                </div>

            </article>

        </section>

    `;
}

function renderOracionInicial(novena) {
    return renderOracion(
        "Oración Inicial",
        novena?.openingPrayer?.text || novena?.openingPrayer || ""
    );
}

function renderOracionFinal(novena) {
    return renderOracion(
        "Oración Final",
        novena?.closingPrayer?.text || novena?.closingPrayer || ""
    );
}
