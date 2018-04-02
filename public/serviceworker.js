// This is our service worker
//
var CACHE_NAME = 'gih-cache';

var CACHED_URLS = [
  '/index-offline.html',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css',
  '/css/gih-offline.css',
  '/img/jumbo-background-sm.jpg',
  '/img/logo-header.png',
];

self.addEventListener('install', function(event) {
  console.log('Installing now and caching hook');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Caching');
      return cache.addAll(CACHED_URLS);
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match('/index-offline.html');
    })
  );
});

// var responseContent =
//   "<html><body>" +
//   "<style>" +
//   "body {text-align: center; background-color: #333; color: #eee;}" +
//   "</style>" +
//   "<h1>Gotham Imperial Hotel</h1>" +
//   "</body></html>";
// self.addEventListener('fetch', function(event) {
//   // First few things to try
//   // if (event.request.url.includes('bootstrap.min.css')) {
//   //   event.respondWith(
//   //     new Response(
//   //       '.hotel-slogan {background: green!important;} nav {display:none}',
//   //       { headers: { 'Content-Type': 'text/css'}}
//   //     )
//   //   );
//   // }
// 
//   // if (event.request.url.includes('/img/logo.png')) {
//   //   event.respondWith(
//   //     fetch('/img/logo-flipped.png')
//   //   );
//   // }
// 
//   event.respondWith(
//     fetch(event.request).catch(function() {
//       return fetch('/index-offline.html');
//     })
//   );
//   console.log('Fetch request for:', event.request.url);
// });
