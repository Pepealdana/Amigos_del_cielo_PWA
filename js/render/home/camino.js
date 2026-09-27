/* ==========================================
   MI CAMINO
   Amigos del Cielo
========================================== */

function obtenerDatosAmigoDelCielo(patronoAnual = {}) {
    const anio = new Date().getFullYear();
    const registro = patronoAnual?.[String(anio)];

    if (!registro?.santoId) return null;

    const santo = (state.catalogosV2?.santos || [])
        .find(item => item?.id === registro.santoId);

    if (!santo) return null;

    return { anio, registro, santo };
}

function renderCamino(
    catalogo = [],
    progreso = {},
    favoritos = [],
    patronoAnual = {}
) {
    const patron = obtenerDatosAmigoDelCielo(patronoAnual);

    const entradasProgreso = Object.entries(progreso || {})
        .filter(([id]) => buscarNovenaPorId(catalogo, id))
        .sort((a, b) =>
            new Date(b[1]?.fecha || 0).getTime() -
            new Date(a[1]?.fecha || 0).getTime()
        );

    const novenasEnCurso = entradasProgreso.filter(
        ([, datos]) => datos?.completada !== true
    ).length;

    const novenasCompletadas = entradasProgreso.filter(
        ([, datos]) => datos?.completada === true
    ).length;

    return `
        <section class="page-shell camino-page">

            <header class="page-header">
                <p class="section-kicker">Tu recorrido</p>
                <h2 class="page-title">Mi camino</h2>
                <p class="page-subtitle">
                    Un espacio para conservar tus favoritos,
                    tu progreso y tu amigo del cielo del año.
                </p>
            </header>

            <section class="annual-patron-card">

                <div class="annual-patron-header">
                    <span class="annual-patron-kicker">
                        Amigo del cielo del año
                    </span>
                    <span class="annual-patron-year">
                        ${new Date().getFullYear()}
                    </span>
                </div>

                ${patron ? `
                    <div class="annual-patron-result">

                        ${patron.santo.image ? `
                            <img
                                src="${escaparHTML(patron.santo.image)}"
                                alt="${escaparHTML(patron.santo.name)}"
                                class="annual-patron-image"
                                loading="eager">
                        ` : `
                            <div
                                class="annual-patron-placeholder"
                                aria-hidden="true">
                                ✦
                            </div>
                        `}

                        <div class="annual-patron-content">

                            <p class="annual-patron-label">
                                Tu amigo del cielo para ${patron.anio}
                            </p>

                            <h3>
                                ${escaparHTML(patron.santo.name)}
                            </h3>

                            ${patron.santo.title ? `
                                <p class="annual-patron-title">
                                    ${escaparHTML(patron.santo.title)}
                                </p>
                            ` : ""}

                            ${patron.santo.feast?.text ? `
                                <p class="annual-patron-feast">
                                    ${escaparHTML(patron.santo.feast.text)}
                                </p>
                            ` : ""}

                            <p class="annual-patron-date">
                                Recibido el
                                ${escaparHTML(
                                    new Date(patron.registro.fechaAsignacion)
                                        .toLocaleDateString("es-CO", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })
                                )}
                            </p>

                            <button
                                class="btn btn-primary"
                                type="button"
                                data-action="open-patron-profile"
                                data-id="${escaparHTML(patron.santo.id)}">
                                Conocer a mi amigo del cielo
                            </button>

                        </div>

                    </div>

                ` : `

                    <div class="annual-patron-intro">

                        <div class="annual-patron-symbol" aria-hidden="true">
                            ✦
                        </div>

                        <h3>
                            Un amigo para caminar este año
                        </h3>

                        <p>
                            Antes de realizar el sorteo, haz una breve
                            oración y pide al Espíritu Santo que te ayude
                            a recibir este momento con fe.
                        </p>

                        <div class="annual-patron-prayer">
                            <p>
                                Espíritu Santo, acompáñame en este momento.
                                Abre mi corazón para recibir con fe a este
                                amigo del cielo, conocer su vida, aprender de
                                sus virtudes y caminar más cerca de Cristo.
                                Amén.
                            </p>
                        </div>

                        <button
                            class="btn btn-accent"
                            type="button"
                            data-action="draw-patron">
                            Conocer a mi amigo del cielo
                        </button>

                        <p class="annual-patron-tradition">
                            Esta experiencia está inspirada en una práctica
                            que Santa Faustina recoge en su Diario y que hoy
                            continúa promoviendo Faustinum: recibir por sorteo
                            un patrono especial para acompañar el año.
                        </p>

                    </div>

                `}

            </section>

            <section class="camino-summary">

                <article class="camino-summary-card">
                    <span class="camino-summary-icon" aria-hidden="true">♡</span>
                    <strong>${Array.isArray(favoritos) ? favoritos.length : 0}</strong>
                    <span>Favoritos</span>
                    <button class="btn btn-outline" type="button" data-route="favoritas">
                        Ver favoritos
                    </button>
                </article>

                <article class="camino-summary-card">
                    <span class="camino-summary-icon" aria-hidden="true">◷</span>
                    <strong>${novenasEnCurso}</strong>
                    <span>En curso</span>
                    <button class="btn btn-outline" type="button" data-route="progreso">
                        Ver progreso
                    </button>
                </article>

                <article class="camino-summary-card">
                    <span class="camino-summary-icon" aria-hidden="true">✓</span>
                    <strong>${novenasCompletadas}</strong>
                    <span>Completadas</span>
                    <button class="btn btn-outline" type="button" data-route="progreso">
                        Mi recorrido
                    </button>
                </article>

            </section>

        </section>
    `;
}
