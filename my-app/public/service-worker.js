const CACHE_NAME = "hipalz-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/logo192.png"
];

// ✅ Install and cache basic shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(urlsToCache)
    ).catch((err) => {
      console.error("❌ Cache failed", err);
    })
  );
  self.skipWaiting();
});

// ✅ Serve cached files
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) =>
      response || fetch(event.request)
    )
  );
});

// ✅ Cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) =>
          key !== CACHE_NAME ? caches.delete(key) : null
        )
      )
    )
  );
});
