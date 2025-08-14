import { defineConfig, mergeConfig } from "vitest/config";
import * as viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./vitest.setup.ts",
      alias: {
        "~": "/src",
      },
        exclude: [
            'node_modules',
            'dist',
            '.idea',
            '.git',
            '.cache',
            'e2e'
        ],
        include: ['src/**/*.test.{js,ts,jsx,tsx}']}
  }),
);
