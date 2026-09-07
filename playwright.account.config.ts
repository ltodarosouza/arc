import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  testMatch: 'account-journey.spec.ts',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  projects: [
    { name: 'account-chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
