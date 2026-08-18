// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { vehicles } from "./src/data/vehicles.ts";

/**
 * GH_PAGES=1 comută build-ul pe modul static pentru GitHub Pages
 * (repo tehnic-dwf/auto-klass-reimagined). În Lovable rămâne build-ul
 * normal cu SSR, deci preview-ul nu e afectat.
 */
const isGithubPages = process.env["GH_PAGES"] === "1";
const base = isGithubPages ? "/auto-klass-reimagined/" : "/";

const staticPages = [
  "/",
  "/autoturisme",
  "/service/programare",
  "/service/dosar-daune",
  "/verificare-masini-rulate",
  "/comparatie",

  ...vehicles.map((vehicle) => `/autoturisme/${vehicle.slug}`),
].map((path) => ({ path }));

export default defineConfig({
  vite: { base },
  ...(isGithubPages
    ? {
        nitro: {
          preset: "static" as const,
          rollupConfig: {
            output: {
              entryFileNames: "server.js",
            },
          },
        },
        tanstackStart: {
          server: { entry: "server" },
          prerender: { enabled: true, crawlLinks: true },
          pages: staticPages,
        },
      }
    : {
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        // nitro/vite builds from this
        tanstackStart: { server: { entry: "server" } },
      }),
});
