// sw.js v3.5.39 (minimal: no caching to avoid white-screen loops)
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// NOTE: No fetch handler on purpose.
// Installability is satisfied by having a registered SW, but we avoid caching bugs.
