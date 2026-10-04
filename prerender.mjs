import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(projectRoot, "dist/index.html");
const notFoundPath = resolve(projectRoot, "dist/404.html");
const rootPlaceholder = '<div id="root"></div>';

function insertRenderedRoot(template, markup, route) {
  if (!template.includes(rootPlaceholder)) {
    throw new Error("Could not find the empty application root in the built HTML.");
  }

  return template.replace(
    rootPlaceholder,
    `<div id="root" data-prerendered="${route}">${markup}</div>`,
  );
}

function rewriteBuiltAssetUrls(markup, manifest, base) {
  const basePath = base.endsWith("/") ? base : `${base}/`;

  return markup.replace(/\/src\/assets\/([^"'<>\s)]+)/g, (sourceUrl, assetPath) => {
    const manifestEntry = manifest[`src/assets/${assetPath}`];

    if (!manifestEntry?.file) {
      throw new Error(`Could not find a production build asset for ${sourceUrl}.`);
    }

    return `${basePath}${manifestEntry.file}`;
  });
}

function createNotFoundDocument(template) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, "<title>Page not found | Kamolpop Vitayarat</title>")
    .replace(
      /<meta name="robots" content="[^"]+"\s*\/>/,
      '<meta name="robots" content="noindex, nofollow" />',
    )
    .replace(/\s*<link rel="canonical" href="[^"]+"\s*\/>/, "")
    .replace(
      /<meta\s+name="description"\s+content="[^"]+"\s*\/>/s,
      '<meta name="description" content="The page you requested could not be found." />',
    )
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, "");
}

let vite;

try {
  vite = await createServer({
    configFile: resolve(projectRoot, "vite.config.ts"),
    root: projectRoot,
    mode: "production",
    logLevel: "error",
    appType: "custom",
    server: { middlewareMode: true },
  });

  const { renderRoute } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const template = await readFile(htmlPath, "utf8");
  const manifestPath = resolve(projectRoot, "dist/.vite/manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const base = vite.config.base;
  const homeHtml = insertRenderedRoot(
    template,
    rewriteBuiltAssetUrls(renderRoute("/"), manifest, base),
    "home",
  );
  const notFoundHtml = insertRenderedRoot(
    createNotFoundDocument(template),
    rewriteBuiltAssetUrls(renderRoute("/__not-found__"), manifest, base),
    "not-found",
  );

  await Promise.all([
    writeFile(htmlPath, homeHtml),
    writeFile(notFoundPath, notFoundHtml),
  ]);
} finally {
  await vite?.close();
}
