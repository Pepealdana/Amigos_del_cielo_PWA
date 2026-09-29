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
            page.getByRole("heading", { name: "Día 2" })
        ).toBeVisible();

        await expect(
            page.locator("body")
        ).not.toContainText(
            "Error iniciando la aplicación"
        );
    });

});
