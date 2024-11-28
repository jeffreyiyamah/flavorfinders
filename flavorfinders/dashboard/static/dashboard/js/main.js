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
  
  function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll(".content-section");
    sections.forEach((section) => {
        section.classList.add("d-none"); // Hide section
        section.classList.remove("content-section-active"); // Remove active class
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId + "Section");
    if (activeSection) {
        activeSection.classList.remove("d-none"); // Make it visible
        activeSection.classList.add("content-section-active"); // Add active styling
    }
}


async function fetchRestaurants() {
  const apiKey = "wFyfphdUEnlygaeBxPyVr4xKChtdLgQG"; // TomTom API key
  const lat = 40.7295;  // Correct Latitude for NYC
  const lon = -73.9965; // Correct Longitude for NYC  
  const radius = 5000; // Search radius in meters

  const response = await fetch(
    `https://api.tomtom.com/search/2/categorySearch/restaurant.json?key=${apiKey}&lat=${lat}&lon=${lon}&radius=${radius}`
  );
  const data = await response.json();
  return data.results; // Return the restaurant data
}


async function addMarkersToMap() {
  const restaurants = await fetchRestaurants();

  restaurants.forEach((restaurant) => {
    console.log(restaurant.position); // Debug: Log the position of each restaurant
    if (restaurant.position && restaurant.position.lon && restaurant.position.lat) {
      new mapboxgl.Marker()
        .setLngLat([restaurant.position.lon, restaurant.position.lat]) // Set marker coordinates
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <h3>${restaurant.poi.name || "Unnamed Restaurant"}</h3>
            <p>${restaurant.address.freeformAddress || "No address available"}</p>
          `)
        )
        .addTo(map); // Add marker to the map
    } else {
      console.warn("Invalid position data for restaurant:", restaurant);
    }
  });
}


// addMarkersToMap();



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
// Ensure this code runs after the map has been initialized



const marker = new mapboxgl.Marker()
    .setLngLat([-73.9965, 40.7295])
    .addTo(map);


