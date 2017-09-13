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

/**
 * @param {Request} request
 *
 * @returns Promise<Response, Error>
 */
function cacheOrFetch(request) {
  return self.caches
    .match(request)
    .then(response => response || fetch(request));
}

/**
 * Cache fonts on the fly
 *
 * @param {Request} request
 *
 * @returns Promise<Response, Error>
 */
function cacheFonts(request) {
  return self.caches.open(CACHE_FONTS_VERSION).then(cache =>
    cache.match(request).then(
      fromCache =>
        fromCache ||
        fetch(request).then(response => {
          if (response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        })
    )
  );
}

/**
 * @param {CacheStorage} caches
 * @param {Array}        files
 *
 * @returns Promise
 */
function installAssets(caches, files) {
  return caches
    .open(CACHE_ASSETS_VERSION)
    .then(cache => Promise.all(files.map(file => cache.add(file))));
}

/**
 * @param {CacheStorage} caches
 * @param {Array}        files
 *
 * @returns Promise
 */
function installHTML(caches, files) {
  return caches
    .open(CACHE_HTML_VERSION)
    .then(cache => Promise.all(files.map(file => cache.add(file))));
}

/**
* Cache application's assets during the install
*/
self.addEventListener("install", event => {
  event.waitUntil(
    Promise.all([
      installAssets(self.caches, manifest.assets.files),
      installHTML(self.caches, manifest.html.files)
    ])
  );
});

/**
* Delete outdated caches during the activation
*/
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

/**
* Handle assets caching on the fly
*/
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  const response = /^\/dist\/fonts/.test(url.pathname)
    ? cacheFonts(event.request)
    : cacheOrFetch(event.request);

  event.respondWith(response);
});
