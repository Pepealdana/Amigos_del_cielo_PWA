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

/* ==========================================
   ORACIONES COMUNES DE LA NOVENA — V1.4
========================================== */

function renderOracionesDelDia(novena, dia) {

    const fields = Array.isArray(novena?.prayerStructure?.dailyPrayerFields)
        ? novena.prayerStructure.dailyPrayerFields
        : ["prayer"];

    return fields.map(field => {

        const value = dia?.[field];

        if (!value) {
            return "";
        }

        if (typeof value === "object" && !Array.isArray(value)) {
            return renderOracion(
                value.title || "Oración",
                value.text || ""
            );
        }

        return renderOracion(
            field === "eternalFather" ? "Oración al Padre eterno" : "Oración del día",
            value
        );

    }).join("");
}

function renderOracionesComunesDelDia(novena) {

    const ids = novena?.prayerStructure?.closingPrayers;

    if (!Array.isArray(ids) || ids.length === 0) {
        return "";
    }

    const oraciones = obtenerOraciones(ids);

    if (oraciones.length === 0) {
        return "";
    }

    return `
        <section class="prayer common-prayers">
            <h3>Oraciones comunes</h3>
            ${oraciones.map(oracion =>
                renderOracion(oracion.title, oracion.text)
            ).join("")}
        </section>
    `;
}
