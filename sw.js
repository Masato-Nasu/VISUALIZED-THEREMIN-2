// sw.js v3.1.3
const CACHE='visualized-theremin-2-v3.1.3';
const ASSETS=[
  './',
  './index.html?v=3.1.3',
  './manifest.json?v=3.1.3',
  './icon-192.png',
  './icon-512.png',
  './Chime.mp3',
  './dog.mp3',
  './bear.mp3',
  './elephant.mp3'
];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE); await Promise.all(ASSETS.map(async (u)=>{try{const r=await fetch(u,{cache:'no-store'}); if(r.ok) await c.put(u,r.clone());}catch(_){}}));})()); self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim();});
self.addEventListener('fetch',e=>{const req=e.request; if(req.mode==='navigate'){e.respondWith(fetch(req).catch(()=>caches.match('./index.html?v=3.1.3')));return;} e.respondWith(caches.match(req).then(c=>c||fetch(req).then(r=>{const copy=r.clone(); caches.open(CACHE).then(cc=>cc.put(req,copy)); return r;})));});