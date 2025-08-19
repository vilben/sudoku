import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/", // ⬅ only look here for tests
  testMatch: /.*\.e2e\.spec\.ts/, // ⬅ only run .spec.ts files
  timeout: 30 * 1000,
  use: {
    headless: true,
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
});
