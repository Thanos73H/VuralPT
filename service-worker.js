const CACHE = "vuralpt-v2-info4";
const CORE = ["./", "./index.html", "./app.js", "./style.css", "./manifest.json", "./icon-192.svg", "./icon-512.svg"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(() => {
        // Only use index.html as a fallback for page navigations.
        // Never return HTML for images/SVGs/JS/CSS requests.
        if (request.mode === "navigate") {
          return caches.match("./index.html");
        }
        return new Response("", { status: 503, statusText: "Offline" });
      });
    })
  );
});
