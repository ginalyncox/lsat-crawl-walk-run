// LSAT Crawl • Walk • Run service worker.
// Network-first: always try the live site; fall back to the cached copy when offline.
// Bump VERSION on deploy to retire old caches. Only caches with this PREFIX are touched,
// because other projects on the same domain share the browser's cache storage.
const PREFIX = "lsatcwr-";
const VERSION = PREFIX + "v1";
// Saved at install so the app works offline right after the first visit.
const SHELL = ["./"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).catch(() => {}).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)).catch(() => {}); }
        return res;
      })
      .catch(() => caches.match(e.request).then((hit) => hit || (e.request.mode === "navigate" ? caches.match("./") : undefined)))
  );
});
