import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4319',
    channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:4319/api/health',
    env: {
      NITRO_HOST: '127.0.0.1',
      NITRO_PORT: '4319',
      NUXT_PUBLIC_LEGACY_URL: 'https://remyvnkhiemtruong.github.io/FIT.HCMUE-DOCUMENTS/',
    },
    reuseExistingServer: false,
    timeout: 30_000,
  },
})
