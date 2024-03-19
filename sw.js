const staticCacheName = 'site-static'

const assets = [
    '/UnbeatableTicTacToeJS',
    '/UnbeatableTicTacToeJS/index.html',
    '/UnbeatableTicTacToeJS/app.js',
    '/UnbeatableTicTacToeJS/style.css',
    '/UnbeatableTicTacToeJS/tictactoe.png',
    '/UnbeatableTicTacToeJS/miniMax/miniMax.html',
    '/UnbeatableTicTacToeJS/miniMax/miniMax.js',
    '/UnbeatableTicTacToeJS/brute_force/brute_force.html',
    '/UnbeatableTicTacToeJS/brute_force/brute_force.js',
    'https://kit.fontawesome.com/1a4aca6b7d.js'
]

self.addEventListener('install', (event) => {
    // console.log('service worker installed');
    event.waitUntil(
        caches.open(staticCacheName)
            .then((cache) => {
                console.log('caching');
                cache.addAll(assets)
            })
    )
})

self.addEventListener('activate', (event) => {
    // console.log('service worker activated');
})

self.addEventListener('fetch', (event) => {
    // console.log('service worker listening to fetch events');
    event.respondWith(
        caches.match(event.request)
            .then((cacheResponse) => {
                return cacheResponse || fetch(event.request)
            })
    )
})