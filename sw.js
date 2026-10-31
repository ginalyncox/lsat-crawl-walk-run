// LSAT Crawl • Walk • Run service worker.
// Network-first: always try the live site; fall back to the cached copy when offline.
// Bump VERSION on deploy to retire old caches.
const VERSION = "lsatcwr-v1";

self.addEventListener("install", (e) => { self.skipWaiting(); });

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
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
