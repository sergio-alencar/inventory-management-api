/// <reference types="node" />
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 60000,
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    actionTimeout: 10000,
    navigationTimeout: 15000,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  //   webServer: {
  //     command: "npm run dev",
  //     url: "http://localhost:5173",
  //     reuseExistingServer: !process.env.CI,
  //     env: {
  //       VITE_API_URL: "https://inventory-management-api-48yw.onrender.com/api",
  //     },
  //     timeout: 120 * 1000,
  //   },
});
