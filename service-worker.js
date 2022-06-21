const cacheName = "switch-1";
const staticAssets = [
    "./",
    "./scripts",
    "./scripts/app.js",
    // "./node_modules",
    "./assets",
    "./assets/hospital.png",
    "./assets/big-hospital.png",
    "./index.html",
    "./manifest.json",
    "./package-lock.json",
    "./package.json",
    "./README.md",
    "./service-worker.js",
    "./switchdesk1.json",
    "./telephone.json",
];

self.addEventListener("install", async (e) => {
    console.log("SW installed");
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});
self.addEventListener("activate", (e) => {
    console.log("Activate!");
    self.clients.claim();
});
self.addEventListener("fetch", function (event) {
    console.log("Fetch!", event.request);
});

self.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
        console.log("APP resumed");
        window.location.reload();
    }
});
