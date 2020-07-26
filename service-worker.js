const CACHE_NAME = "movies-v0.9b";

var cachedUrls = [
    // added soon

    '/manifest.json',
    '/',
    '/index.html',
    
    // added data
    //// added icons
    '/data/icon/movie.svg',
    '/data/icon/icon-72x72.png',
    '/data/icon/icon-96x96.png',
    '/data/icon/icon-128x128.png',
    '/data/icon/icon-144x144.png',
    '/data/icon/icon-152x152.png',
    '/data/icon/icon-192x192.png',
    '/data/icon/icon-384x384.png',
    '/data/icon/icon-512x512.png',

    //// added images
    '/data/images/discover/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg',
    '/data/images/discover/33VdppGbeNxICrFUtW2WpGHvfYc.jpg',
    '/data/images/discover/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg',
    '/data/images/discover/c01Y4suApJ1Wic2xLmaq1QYcfoZ.jpg',
    '/data/images/discover/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg',
    '/data/images/discover/oiFxdnsQyGs3DBLzHzW92GrDR6w.jpg',
    '/data/images/discover/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg',
    '/data/images/discover/wlfDxbGEsW58vGhFljKkcR5IxDj.jpg',
    '/data/images/discover/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg',
    '/data/images/discover/y95lQLnuNKdPAzw9F9Ab8kJ80c3.jpg',

    '/data/images/latest/ygewRyv4645SATwYxpx1fmDkxY9.jpg',

    '/data/images/trending/33VdppGbeNxICrFUtW2WpGHvfYc.jpg',
    '/data/images/trending/75gDv38UgRtAukSxNXcjatyQmEa.jpg',
    '/data/images/trending/A2YlIrzypvhS3vTFMcDkG3xLvac.jpg',
    '/data/images/trending/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg',
    '/data/images/trending/c01Y4suApJ1Wic2xLmaq1QYcfoZ.jpg',
    '/data/images/trending/db32LaOibwEliAmSL2jjDF6oDdj.jpg',
    '/data/images/trending/f4aul3FyD3jv3v4bul1IrkWZvzq.jpg',
    '/data/images/trending/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg',
    '/data/images/trending/uoplwswBDy7gsOyrbGuKyPFoPCs.jpg',
    '/data/images/trending/y95lQLnuNKdPAzw9F9Ab8kJ80c3.jpg',

    '/data/images/office.jpg',
    '/data/images/me.jpg',
    '/data/images/movie-banner.svg',
    '/data/images/warning-icon.svg',

    //// added json
    '/data/json/discover.json',
    '/data/json/genres.json',
    '/data/json/latest.json',
    '/data/json/trending.json',

    // added scripts
    //// added jquery
    '/scripts/js/jquery/jquery-3.5.1.min.js',

    //// added materialize
    '/scripts/js/materialize/materialize.min.js',

    //// added my own scripts
    '/scripts/js/main.js',
    '/scripts/js/movielist.js',
    '/scripts/js/navbar.js',
    '/scripts/js/sidenav.js',
    '/scripts/js/movie-item.js',

    '/scripts/js/genreBadges/genres.js',
    '/scripts/js/ratings/rating.js',

    '/scripts/js/controller/AboutMe.js',
    '/scripts/js/controller/Data.js',
    '/scripts/js/controller/MainUIController.js',
    '/scripts/js/controller/MovieDetail.js',
    '/scripts/js/controller/MovieDiscover.js',
    '/scripts/js/controller/MovieLatest.js',
    '/scripts/js/controller/MovieTrending.js',
    
    // added style
    //// materialize
    '/style/css/materialize/materialize.min.css',
    '/style/css/materialize/material-icons.css',

    //// my own style
    '/style/css/main.css',

    // fonts
    '/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    '/fonts/Quicksand-Regular.otf'
];
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(cachedUrls))
    );
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response){
                if(response){
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(function(cacheName){
                if(cacheName != CACHE_NAME) return caches.delete(cacheName);
            })
        ))
    );
});