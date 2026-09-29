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

function renderOracionAperturaNovena(novena, numeroDia) {

    if (Number(numeroDia) !== 1) {
        return "";
    }

    const texto = novena?.openingPrayer?.text || novena?.openingPrayer;

    return texto ? renderOracion("Oración inicial", texto) : "";
}

function renderOracionCierreNovena(novena, numeroDia, total) {

    if (Number(numeroDia) !== Number(total)) {
        return "";
    }

    const texto = novena?.closingPrayer?.text || novena?.closingPrayer;

    return texto ? renderOracion("Oración final", texto) : "";
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
        <section
            class="prayer common-prayers"
            aria-labelledby="oraciones-comunes-titulo">

            <h3 id="oraciones-comunes-titulo">
                Oraciones comunes
            </h3>

            <p class="common-prayers-intro">
                Oraciones que acompañan la novena.
            </p>
            ${oraciones.map(oracion => `
                <article class="prayer-card">
                    <div class="prayer-text">
                        <h4>${escaparHTML(oracion.title)}</h4>
                        <p>${escaparHTML(oracion.text)}</p>
                    </div>
                </article>
            `).join("")}
        </section>
    `;
}
