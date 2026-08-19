
const CACHE="vuralpt-v2-assets1";
const CORE=["./","./index.html","./app.js","./style.css","./manifest.json","./icon-192.svg","./icon-512.svg","./assets/vignettes.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{
 const c=x.clone(); caches.open(CACHE).then(cache=>cache.put(e.request,c)); return x;
}).catch(()=>caches.match("./index.html")))));
