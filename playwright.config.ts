
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Test files location
  testDir: './tests',

  // Run independent test files in parallel
  fullyParallel: true,

  // Prevent test.only from being committed in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // Use one worker in CI; default worker count locally
  workers: process.env.CI ? 1 : undefined,

  // Maximum execution time for one test
  timeout: 30_000,

  // Assertion timeout
  expect: {
    timeout: 5_000,
  },

  // Test reporting
  reporter: 'html',

  // Shared browser and test settings
  use: {
    // Application base URL
    baseURL: 'https://www.saucedemo.com',

    // SauceDemo marks stable test locators with data-test
    testIdAttribute: 'data-test',

    // Default timeout for locator actions
    actionTimeout: 10_000,

    // Default timeout for navigation actions
    navigationTimeout: 15_000,

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Capture trace on first retry
    trace: 'on-first-retry',

    // Retain video when a test fails
    video: 'retain-on-failure',
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {

    //   name: 'microsoft edge',
    //   use :{
    //   ...devices['Desktop Edge'],
    //   channel: 'msedge'
    // },

    // },

    // //Enable later if cross-browser testing is required
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    //  {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 7'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 13'],
    //   },
    // },
  ],
});
