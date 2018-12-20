self.importScripts("/caches.js");

/* eslint no-undef: "off" */
const CACHE_ASSETS_VERSION = "assets-" + manifest.assets.version;
const CACHE_HTML_VERSION = "html-" + manifest.html.version;
const CACHE_FONTS_VERSION = "fonts-1";
const CACHE_SHORT_LIVED = "short-lived";
const activeCaches = [
  CACHE_ASSETS_VERSION,
  CACHE_HTML_VERSION,
  CACHE_FONTS_VERSION,
  CACHE_SHORT_LIVED
];

function addToCacheIfSuccessful(cache: Cache, request: Request, response: Response) {
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

async function fetchAndAddToCacheIfSuccessful(request: Request, cache: Cache) {
  const response = await fetch(request);
  return addToCacheIfSuccessful(cache, request, response);
}

async function cacheWithNetworkFallback(request: Request) {
  const response = await self.caches.match(request);
  return response || fetch(request);
}

async function networkWithCacheFallback(request: Request) {
  const cache = await self.caches.open(CACHE_SHORT_LIVED);
  try {
    const response = await fetch(request);
    return addToCacheIfSuccessful(cache, request, response);
  } catch (e) {
    return cache.match(request);
  }
}

async function cacheFontsOnTheFly(request: Request) {
  const cache = await self.caches.open(CACHE_FONTS_VERSION);
  const fromCache = await cache.match(request);
  return fromCache || fetchAndAddToCacheIfSuccessful(request, cache);
}

async function installAssets(files: string[]) {
  const cache = await self.caches.open(CACHE_ASSETS_VERSION);
  return await Promise.all(files.map(file => cache.add(file)));
}

async function installHTML(files: string[]) {
  const cache = await self.caches.open(CACHE_HTML_VERSION);
  return await Promise.all(files.map(file => cache.add(file)));
}

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    Promise.all([
      installAssets(manifest.assets.files),
      installHTML(manifest.html.files)
    ])
  );
});

self.addEventListener("activate", async (event: ExtendableEvent) => {
  const names = await self.caches.keys();
  event.waitUntil(
    Promise.all(
      names
        .filter(name => !activeCaches.includes(name))
        .map(name => self.caches.delete(name))
    )
  );
});

function isFontsPath(path: string) {
  return /^\/dist\/fonts/.test(path);
}

self.addEventListener("fetch", (event: FetchEvent) => {
  const url = new URL(event.request.url);
  const pathname = url.pathname;
  const request = event.request;

  const response = isFontsPath(pathname)
    ? cacheFontsOnTheFly(request)
    : cacheWithNetworkFallback(request);

  event.respondWith(response);
});
