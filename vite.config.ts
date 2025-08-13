import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  base: mode === "gh-pages" ? "/tanstack-sudoku" : "/",
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      spa: {
        enabled: true,
      },
      pages: [
        {
          path: "/",
        },
      ],
      target: "static",
      prerender: {
        enabled: false,
      },
    }),
    tailwindcss(),
  ],
}));
