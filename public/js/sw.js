self.importScripts("/caches.js");

/* eslint no-undef: "off" */
const CACHE_ASSETS_VERSION = "assets-" + manifest.assets.version;
const CACHE_HTML_VERSION = "html-" + manifest.html.version;
const CACHE_FONTS_VERSION = "fonts-1";
const activeCaches = [
  CACHE_ASSETS_VERSION,
  CACHE_HTML_VERSION,
  CACHE_FONTS_VERSION
];

async function cacheOrFetch(request) {
  const response = await self.caches.match(request);
  return response || fetch(request);
}

async function cacheFonts(request) {
  const cache = await self.caches.open(CACHE_FONTS_VERSION);
  const fromCache = await cache.match(request);
  return (
    fromCache ||
    fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
  );
}

async function installAssets(caches, files) {
  const cache = await caches.open(CACHE_ASSETS_VERSION);
  return await Promise.all(files.map(file => cache.add(file)));
}

async function installHTML(caches, files) {
  const cache = await caches.open(CACHE_HTML_VERSION);
  return await Promise.all(files.map(file => cache.add(file)));
}

self.addEventListener("install", event => {
  event.waitUntil(
    Promise.all([
      installAssets(self.caches, manifest.assets.files),
      installHTML(self.caches, manifest.html.files)
    ])
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    self.caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(cacheName => activeCaches.indexOf(cacheName) === -1)
            .map(cacheName => self.caches.delete(cacheName))
        )
      )
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  const response = /^\/dist\/fonts/.test(url.pathname)
    ? cacheFonts(event.request)
    : cacheOrFetch(event.request);

  event.respondWith(response);
});
