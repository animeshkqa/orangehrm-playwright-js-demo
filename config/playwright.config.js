import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: '../tests',
    timeout: 90000,
    retries: 0,
    reporter: [['html', { outputFolder: '../reports/playwright-report', open: 'never' }]],
    outputDir: '../reports/test-results',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: 'https://opensource-demo.orangehrmlive.com',
        timeout: 60000,
    },
});
