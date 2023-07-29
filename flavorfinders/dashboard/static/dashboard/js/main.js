// main.js

// Include the jQuery library
const script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// Wait for jQuery to load and then execute your jQuery code
script.onload = function() {
    // Your jQuery code goes here
    $(document).ready(function() {
      $('#profileTab').click(function() {
        toggleTab('right');
      });
  
      $('#preferencesTab').click(function() {
        toggleTab('preferences');
      });
    });
  
    function toggleTab(tabName) {
      if (tabName === 'right') {
        $('.preferences').hide();
        $('.right').show();
      } else if (tabName === 'preferences') {
        $('.right').hide();
        $('.preferences').show();
      }
    }
  };

//Adding the Map and its style to the map
mapboxgl.accessToken = 'pk.eyJ1IjoiamVmZnJleWl5YW1haCIsImEiOiJjbGlveTZjaHkwaWN5M2NwYXpvajJkaTg1In0.koMqCA4ePB63Mbx1umzdlA';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-73.9965, 40.7295],
    zoom: 13
});

// Add the control to the map.
    map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

map.addControl(search);
//On click 