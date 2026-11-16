
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Test files location
  testDir: './tests',

  // Run independent tests in parallel
  fullyParallel: true,

  // Prevent test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // Configurable workers from GitHub Actions
  workers: process.env.PW_WORKERS
    ? Number(process.env.PW_WORKERS)
    : (process.env.CI ? 4 : undefined),

  // Test timeout
  timeout: 30_000,

  // Assertion timeout
  expect: {
    timeout: 5_000,
  },

  // Default reporter (overridden by CLI in GitHub Actions)
  reporter: 'html',

  // Shared browser and test settings
  use: {
    baseURL: 'https://www.saucedemo.com',

    testIdAttribute: 'data-test',

    actionTimeout: 10_000,

    navigationTimeout: 15_000,

    screenshot: 'only-on-failure',

    trace: 'on-first-retry',

    video: 'retain-on-failure',
  },

  // Browser projects
  projects: [

    // Desktop Chromium
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Microsoft Edge
    {
      name: 'microsoft edge',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'msedge',
      },
    },

    // Desktop Firefox
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    // Desktop Safari (WebKit)
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    // Mobile Chrome
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 7'],
      },
    },

    // Mobile Safari
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13'],
      },
    },

  ],
});
