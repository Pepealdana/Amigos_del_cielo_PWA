const { test, expect } = require("@playwright/test");

async function esperarServiceWorker(page) {
    await expect
        .poll(
            () =>
                page.evaluate(
                    () =>
                        Boolean(
                            navigator.serviceWorker?.controller
                        )
                ),
            { timeout: 10_000 }
        )
        .toBe(true);
}

test.describe("Amigos del Cielo — navegación PWA", () => {

    test("mantiene URL interna y permite atrás/adelante", async ({ page }) => {
        await page.goto("/?ruta=biblioteca");

        await expect(
            page.getByRole("heading", { name: "Biblioteca" })
        ).toBeVisible();

        await page.locator('[data-route="santos"]').first().click();

        await expect(page).toHaveURL(
            /[?&]ruta=santos(?:&|$)/
        );

        await expect(
            page.getByRole("heading", { name: "Santos" })
        ).toBeVisible();

        await page.goBack();

        await expect(page).toHaveURL(
            /[?&]ruta=biblioteca(?:&|$)/
        );

        await expect(
            page.getByRole("heading", { name: "Biblioteca" })
        ).toBeVisible();

        await page.goForward();

        await expect(page).toHaveURL(
            /[?&]ruta=santos(?:&|$)/
        );

        await expect(
            page.getByRole("heading", { name: "Santos" })
        ).toBeVisible();
    });

    test("abre una novena mediante deep link", async ({ page }) => {
        await page.goto(
            "/?ruta=dia&novena=san-jose&dia=2"
        );

        await expect(
            page.getByRole("heading", { name: "Llamado a una misión" })
        ).toBeVisible();

        await expect(
            page.locator("#app")
        ).toBeVisible();
    });


    test("continúa desde el día siguiente cuando una novena empieza tarde en el calendario", async ({ page }) => {
        await page.goto("/?ruta=dia&novena=san-jose&dia=6");

        await page.getByRole("button", { name: "Marcar día como rezado" }).click();

        await page.locator('[data-route="inicio"]').click();

        const tarjeta = page.locator(".continue-card").filter({
            hasText: "San José"
        });

        await expect(tarjeta).toContainText("Siguiente: día 7 de 9");
        await expect(tarjeta.getByRole("button", { name: "Continuar" })).toBeVisible();
    });

    test("reconoce como completada una novena antigua con sus nueve días guardados aunque la bandera esté desactualizada", async ({ page }) => {
        await page.addInitScript(() => {
            const dias = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            localStorage.setItem("adc-progress", JSON.stringify({
                "santa-teresita-de-lisieux": {
                    dia: 9,
                    diasVisitados: dias,
                    iniciada: true,
                    completada: false,
                    fechaInicio: "2026-10-01T12:00:00.000Z",
                    fecha: "2026-10-09T12:00:00.000Z",
                    historialCompletaciones: []
                }
            }));
        });

        await page.goto("/");

        const tarjeta = page.locator(".continue-card").filter({
            hasText: "Santa Teresita de Lisieux"
        });

        await expect(tarjeta).toContainText("Novena completada");
        await expect(tarjeta.getByRole("button", { name: "Volver a rezar" })).toBeVisible();
        await expect(tarjeta.locator(".progress-fill")).toHaveAttribute("style", /width:100%/);
    });

    test("funciona sin conexión después de preparar el App Shell", async ({
        page,
        context
    }) => {
        await page.goto(
            "/?ruta=dia&novena=san-jose&dia=2"
        );

        await esperarServiceWorker(page);

        await context.setOffline(true);

        await page.reload({
            waitUntil: "domcontentloaded"
        });

        await expect(
            page.getByRole("heading", { name: "Llamado a una misión" })
        ).toBeVisible();

        await expect(
            page.locator("body")
        ).not.toContainText(
            "Error iniciando la aplicación"
        );
    });

});
