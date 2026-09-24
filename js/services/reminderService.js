/* ==========================================
   RECORDATORIOS
   Amigos del Cielo
========================================== */

let temporizadorRecordatorios = null;

async function solicitarPermisoNotificaciones() {
    if (!("Notification" in window)) {
        return "unsupported";
    }

    if (Notification.permission === "granted") {
        return "granted";
    }

    if (Notification.permission === "denied") {
        return "denied";
    }

    try {
        return await Notification.requestPermission();
    } catch (error) {
        console.error(
            "No fue posible solicitar permiso de notificaciones:",
            error
        );

        return "denied";
    }
}

async function mostrarNotificacionOracion(novena) {
    if (
        !novena ||
        !("Notification" in window) ||
        Notification.permission !== "granted"
    ) {
        return false;
    }

    try {
        const registro =
            await navigator.serviceWorker?.ready;

        if (!registro) {
            return false;
        }

        await registro.showNotification(
            "Amigos del Cielo",
            {
                body:
                    `Es momento de rezar la novena de ${novena.name}.`,
                icon: "./assets/icons/icon-192.png",
                badge: "./assets/icons/icon-192.png",
                tag: `novena-${novena.id}`,
                data: {
                    novenaId: novena.id
                }
            }
        );

        return true;
    } catch (error) {
        console.error(
            "No fue posible mostrar la notificación:",
            error
        );

        return false;
    }
}

async function revisarRecordatorios() {
    const ahora = new Date();
    const horaActual =
        String(ahora.getHours()).padStart(2, "0") +
        ":" +
        String(ahora.getMinutes()).padStart(2, "0");

    const fechaActual =
        formatearFechaISO(ahora);

    for (const [novenaId, recordatorio] of Object.entries(
        state.recordatorios || {}
    )) {
        if (
            !recordatorio?.activo ||
            recordatorio.hora !== horaActual ||
            recordatorio.ultimaNotificacion === fechaActual
        ) {
            continue;
        }

        const novena =
            buscarNovenaPorId(
                state.catalogo,
                novenaId
            );

        if (!novena) {
            continue;
        }

        const estado =
            obtenerEstadoNovena(novena.feast);

        /*
         * El recordatorio se emite solamente durante
         * los 9 días del calendario de la novena.
         */
        if (estado?.estado !== "en-curso") {
            continue;
        }

        const mostrado =
            await mostrarNotificacionOracion(novena);

        if (mostrado) {
            state.recordatorios[novenaId] = {
                ...recordatorio,
                ultimaNotificacion: fechaActual
            };

            guardarRecordatorios();
        }
    }
}

function iniciarMonitorRecordatorios() {
    if (temporizadorRecordatorios) {
        clearInterval(temporizadorRecordatorios);
    }

    revisarRecordatorios();

    /*
     * Mientras la PWA está abierta, comprobamos cada 30 segundos.
     * El navegador no garantiza temporizadores exactos con la app
     * cerrada. Para recordatorios fiables en segundo plano se
     * necesitaría Push/Web Push o una aplicación nativa.
     */
    temporizadorRecordatorios =
        setInterval(
            revisarRecordatorios,
            30000
        );
}
