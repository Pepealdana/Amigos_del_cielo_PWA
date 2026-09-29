const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
        baseURL: "http://127.0.0.1:4173",
        trace: "on-first-retry"
    },
    projects: [
        {
            name: "chromium-desktop",
            use: { ...devices["Desktop Chrome"] }
        },
        {
            name: "chromium-android",
            use: { ...devices["Pixel 5"] }
        }
    ],
    webServer: {
        command: "python3 -m http.server 4173 --bind 127.0.0.1",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: !process.env.CI,
        timeout: 30_000
    }
});
