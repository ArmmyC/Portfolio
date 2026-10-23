import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(projectRoot, "dist/index.html");
const notFoundPath = resolve(projectRoot, "dist/404.html");
const rootPlaceholder = '<div id="root"></div>';
const calendarPages = [
  {
    path: "/calendar",
    route: "calendar-home",
    output: resolve(projectRoot, "dist/calendar/index.html"),
    title: "Armmy Hermes Gmail Summary | Google Calendar",
    description:
      "A personal Hermes assistant integration for listing upcoming Google Calendar events and creating timed events when asked.",
    canonical: "https://kamolpop.dev/calendar",
  },
  {
    path: "/calendar/privacy",
    route: "calendar-privacy",
    output: resolve(projectRoot, "dist/calendar/privacy/index.html"),
    title: "Privacy policy | Armmy Hermes Gmail Summary",
    description:
      "Privacy disclosures for Armmy Hermes Gmail Summary, a Google OAuth app used by a personal Hermes integration.",
    canonical: "https://kamolpop.dev/calendar/privacy",
  },
  {
    path: "/calendar/terms",
    route: "calendar-terms",
    output: resolve(projectRoot, "dist/calendar/terms/index.html"),
    title: "Terms of Service | Armmy Hermes Gmail Summary",
    description:
      "Terms for the personal Google Calendar integration, including account permissions and service functionality.",
    canonical: "https://kamolpop.dev/calendar/terms",
  },
];

function insertRenderedRoot(template, markup, route) {
  if (!template.includes(rootPlaceholder)) {
    throw new Error("Could not find the empty application root in the built HTML.");
  }

  return template.replace(
    rootPlaceholder,
    '<div id="root" data-prerendered="' + route + '">' + markup + "</div>",
  );
}

function rewriteBuiltAssetUrls(markup, manifest, base) {
  const basePath = base.endsWith("/") ? base : base + "/";

  return markup.replace(/\/src\/assets\/([^"'<>\s)]+)/g, (sourceUrl, assetPath) => {
    const manifestEntry = manifest["src/assets/" + assetPath];

    if (!manifestEntry?.file) {
      throw new Error("Could not find a production build asset for " + sourceUrl + ".");
    }

    return basePath + manifestEntry.file;
  });
}

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceMetaContent(html, attribute, name, content) {
  const escapedName = name.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
  const tagPattern = new RegExp(
    '<meta\\s+' + attribute + '="' + escapedName + '"\\s+content="[^"]*"\\s*\\/>',
  );
  const replacement =
    '<meta ' + attribute + '="' + name + '" content="' + escapeAttribute(content) + '" />';

  if (!tagPattern.test(html)) {
    throw new Error('Could not find the ' + attribute + '="' + name + '" metadata tag.');
  }

  return html.replace(tagPattern, replacement);
}

function withRouteMetadata(template, page) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, "<title>" + escapeAttribute(page.title) + "</title>");
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
    '<meta name="description" content="' + escapeAttribute(page.description) + '" />',
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    '<link rel="canonical" href="' + escapeAttribute(page.canonical) + '" />',
  );

  if (html === template) {
    throw new Error("Could not apply route-specific title and description metadata.");
  }

  html = replaceMetaContent(html, "property", "og:title", page.title);
  html = replaceMetaContent(html, "property", "og:description", page.description);
  html = replaceMetaContent(html, "property", "og:url", page.canonical);
  html = replaceMetaContent(html, "name", "twitter:title", page.title);
  html = replaceMetaContent(html, "name", "twitter:description", page.description);
  return html;
}

function createNotFoundDocument(template) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, "<title>Page not found | Kamolpop Vitayarat</title>")
    .replace(
      /<meta name="robots" content="[^"]+"\s*\/>/,
      '<meta name="robots" content="noindex, nofollow" />',
    )
    .replace(/\s*<link rel="canonical" href="[^"]*"\s*\/>/, "")
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
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

  const calendarDocuments = calendarPages.map((page) => ({
    path: page.output,
    html: insertRenderedRoot(
      withRouteMetadata(template, page),
      rewriteBuiltAssetUrls(renderRoute(page.path), manifest, base),
      page.route,
    ),
  }));

  await Promise.all([
    writeFile(htmlPath, homeHtml),
    writeFile(notFoundPath, notFoundHtml),
    ...calendarDocuments.map(async ({ path, html }) => {
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, html);
    }),
  ]);
} finally {
  await vite?.close();
}
