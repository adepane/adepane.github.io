importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { NavigationRoute } = workbox.routing;
const { createHandlerBoundToURL } = workbox.precaching;
const { CacheFirst } = workbox.strategies;
const { StaleWhileRevalidate } = workbox.strategies;
const { NetworkFirst } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { precacheAndRoute } = workbox.precaching;
const { ExpirationPlugin } = workbox.expiration;
const { setCacheNameDetails } = workbox.core;
const rev = 1;

setCacheNameDetails({
    prefix: 'hasil-liga',
});

precacheAndRoute([
    { url:"/", revision:rev },
    { url:"/index.html", revision:rev },
    { url:"/p/nav.html", revision:rev },
    { url:"/p/result.html", revision:rev },
    { url:"/manifest.json", revision:rev },
    { url:"/css/materialize.min.css", revision:rev },
    { url:"/css/style.css", revision:rev },
    { url:"/js/materialize.min.js", revision:rev },
    { url:"/js/helpers.js", revision:rev },
    { url:"/js/api.js", revision:rev },
    { url:"/js/nav.js", revision:rev },
    { url:"/js/match.js", revision:rev },
    { url:"/js/db.js", revision:rev },
    { url:"/js/idb.js", revision:rev },
    { url:"/index.js", revision:rev },
    { url:"/js/single.js", revision:rev },
    { url:"/sw-init.js", revision:rev },
    { url:"/img/logo.png", revision:rev },
    { url:"/img/favicon.ico", revision:rev },
    { url:"/img/icons/icon-72x72.png", revision:rev },
    { url:"/img/icons/icon-96x96.png", revision:rev },
    { url:"/img/icons/icon-128x128.png", revision:rev },
    { url:"/img/icons/icon-144x144.png", revision:rev },
    { url:"/img/icons/icon-152x152.png", revision:rev },
    { url:"/img/icons/icon-192x192.png", revision:rev },
    { url:"/img/icons/icon-384x384.png", revision:rev },
    { url:"/img/icons/icon-512x512.png", revision:rev },
    { url:"/img/icons/splash-640x1136.png", revision:rev },
    { url:"/img/icons/splash-750x1334.png", revision:rev },
    { url:"/img/icons/splash-828x1792.png", revision:rev },
    { url:"/img/icons/splash-1125x2436.png", revision:rev },
    { url:"/img/icons/splash-1242x2208.png", revision:rev },
    { url:"/img/icons/splash-1242x2688.png", revision:rev },
    { url:"/img/icons/splash-1536x2048.png", revision:rev },
    { url:"/img/icons/splash-1668x2224.png", revision:rev },
    { url:"/img/icons/splash-1668x2388.png", revision:rev },
    { url:"/img/icons/splash-2048x2732.png", revision:rev },
    { url:"https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", revision:rev },
    { url:"https://fonts.googleapis.com/icon?family=Material+Icons", revision:rev },
])

registerRoute(
    ({ request }) => request.destination === "image",
    new CacheFirst({
        cacheName: "images-cache",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
        ],
    })
);

const handler = createHandlerBoundToURL('/p/result.html');
const navigationRoute = new NavigationRoute(handler, {
    allowlist: [
        new RegExp('/p/result.html'),
    ]
});
registerRoute(navigationRoute);

workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    new StaleWhileRevalidate()
);

registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});