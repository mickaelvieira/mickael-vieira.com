/* eslint-env serviceworker */
/* eslint no-restricted-globals: "off" */
/* eslint no-undef: "off" */
/* eslint no-console: "off" */

self.importScripts("/caches.js");

const CACHE_ASSETS_VERSION = `assets-${manifest.assets.version}`;
const CACHE_HTML_VERSION = `html-${manifest.html.version}`;
const CACHE_FONTS_VERSION = "fonts-1";
const CACHE_SHORT_LIVED = "short-lived";
const activeCaches = [
  CACHE_ASSETS_VERSION,
  CACHE_HTML_VERSION,
  CACHE_FONTS_VERSION,
  CACHE_SHORT_LIVED
];

function addToCacheIfSuccessful(cache, request, response) {
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

async function fetchAndAddToCacheIfSuccessful(request, cache) {
  const response = await fetch(request);
  return addToCacheIfSuccessful(cache, request, response);
}

async function cacheFontsOnTheFly(request) {
  const cache = await self.caches.open(CACHE_FONTS_VERSION);
  const fromCache = await cache.match(request);
  return fromCache || fetchAndAddToCacheIfSuccessful(request, cache);
}

async function installAssets(files) {
  const cache = await self.caches.open(CACHE_ASSETS_VERSION);
  await Promise.all(files.map(file => cache.add(file)));
}

async function installHTML(files) {
  const cache = await self.caches.open(CACHE_HTML_VERSION);
  await Promise.all(files.map(file => cache.add(file)));
}

async function deleteInactiveCaches() {
  const names = await self.caches.keys();
  return Promise.all(
    names
      .filter(name => !activeCaches.includes(name))
      .map(name => self.caches.delete(name))
  );
}

async function listClients() {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  const urls = clients.map(({ url }) => url);
  console.log("[ServiceWorker] Matching clients:", urls.join(", "));
}

self.addEventListener("install", event => {
  event.waitUntil(
    Promise.all([
      installAssets(manifest.assets.files),
      installHTML(manifest.html.files)
    ])
  );
});

self.addEventListener("activate", async event => {
  await listClients();
  const deletion = await deleteInactiveCaches();
  if (deletion.filter(d => !d).length > 0) {
    console.log("[ServiceWorker] some cache deletion seem to have failed");
  }

  event.waitUntil(self.clients.claim());
});

function isFontsPath(path) {
  return /^\/dist\/fonts/.test(path);
}

self.addEventListener("fetch", async event => {
  const url = new URL(event.request.url);
  const { pathname } = url;
  const { request } = event;

  const response = isFontsPath(pathname)
    ? cacheFontsOnTheFly(request)
    : WithNetworkFallback(request);

  event.respondWith(response);
});
