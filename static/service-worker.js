const CACHE_NAME = "speech-analyzer-v1";
const ASSETS = ["/", "/index.html", "/script.js", "/manifest.json"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((resp) => resp || fetch(e.request))
  );
});