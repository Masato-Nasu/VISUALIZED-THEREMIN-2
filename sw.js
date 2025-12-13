// sw.js v3.5.32
const VERSION = "3.5.22";
const CACHE = `VISUALIZED-THEREMIN-2-v${VERSION.replaceAll('.', '-')}`;
const ASSETS = [
  "./",
  "./index.html?v=3.5.22",
  "./manifest.json?v=3.5.22",
  "./icon-192.png",
  "./icon-512.png",
  "./Chime.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS.map(u => new Request(u, {cache: "reload"})));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(k => k.startsWith("VISUALIZED-THEREMIN-2-") && k !== CACHE)
      .map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Navigations: network first, fallback cache
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (_e) {
        return (await caches.match("./index.html?v=3.5.22")) || (await caches.match("./")) || Response.error();
      }
    })());
    return;
  }

  // Assets: cache first
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      const cache = await caches.open(CACHE);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (_e) {
      return cached || Response.error();
    }
  })());
});
