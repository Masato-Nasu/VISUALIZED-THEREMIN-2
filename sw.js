// sw.js v3.5.16
const CACHE='VISUALIZED-THEREMIN-2-v3-5-16';
const ASSETS=[
  './',
  './index.html?v=3.5.14',
  './manifest.json?v=3.5.14',
  './icon-192.png',
  './icon-512.png',
  './Chime.mp3'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim();});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.mode==='navigate'){ e.respondWith(fetch(req).catch(()=>caches.match('./index.html?v=3.5.14'))); return; }
  e.respondWith(caches.match(req).then(c=>c||fetch(req).then(r=>{ const copy=r.clone(); caches.open(CACHE).then(cc=>cc.put(req,copy)); return r; })));
});
