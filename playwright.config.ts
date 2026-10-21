import { defineConfig } from '@playwright/test'
const port=Number(process.env.PORTAL_TEST_PORT || 4173)
export default defineConfig({
  testDir: './tests/browser',
  timeout: 30_000,
  retries: 0,
  workers: 2,
  reporter: 'list',
  use: { baseURL: `http://127.0.0.1:${port}/FIT.HCMUE-DOCUMENTS/`, headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: { command: `npm run preview -- --host 127.0.0.1 --port ${port}`, url: `http://127.0.0.1:${port}/FIT.HCMUE-DOCUMENTS/`, reuseExistingServer: !process.env.CI }
})
