import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const sdkPath = fileURLToPath(new URL("./rotary-sdk.js", import.meta.url));

/**
 * Serves the repository's shared `rotary-sdk.js` while `vite dev` runs.
 *
 * The page loads the root SDK; this middleware serves it during development.
 */
export function serveRotarySdk(): Plugin {
  return {
    name: "rotary-sdk-dev-server",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split("?")[0];
        if (path !== "/rotary-sdk.js") return next();
        response.setHeader("Content-Type", "text/javascript; charset=utf-8");
        response.end(readFileSync(sdkPath));
      });
    },
  };
}

/**
 * Builds a page that also works when `index.html` is opened straight from disk:
 * the entry becomes a classic deferred script (no `type="module"`, no
 * `crossorigin`) and referenced fonts are inlined, because browsers refuse module scripts, crossorigin
 * subresources, CORS-mode web fonts and CORS-mode mask images on `file://`
 * documents.
 *
 * The SDK remains at the repository root; dist entries reference it two levels up.
 */
export function classicOfflineBuild(): Plugin {
  return {
    name: "rotary-classic-offline-build",
    apply: "build",
    config: () => ({
      build: {
        // web fonts are fetched in CORS mode, which a file:// document refuses
        assetsInlineLimit: (filePath: string) => /\.(woff2?|ttf|otf|eot)$/i.test(filePath),
        modulePreload: false,
        rollupOptions: { output: { format: "iife", inlineDynamicImports: true } },
      },
    }),
    transformIndexHtml: {
      order: "post",
      handler: (html) =>
        html
          .replace(/src="\.\.\/rotary-sdk\.js/g, 'src="../../rotary-sdk.js')
          .replace(/<script type="module" crossorigin src=/g, "<script defer src=")
          .replace(/<link rel="stylesheet" crossorigin href=/g, '<link rel="stylesheet" href='),
    },
  };
}
