
const CACHE="vuralpt-v8-final";
const CORE=["./","./index.html","./app.js","./style.css","./manifest.json","./icon-192.svg","./icon-512.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener("install",e=>e.waitUntil(self.skipWaiting()));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{
 const c=x.clone(); caches.open(CACHE).then(cache=>cache.put(e.request,c)); return x;
}).catch(()=>caches.match("./index.html")))));
