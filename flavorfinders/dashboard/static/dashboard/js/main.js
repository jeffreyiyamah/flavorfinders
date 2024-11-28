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
  const lat = 37.7749;       // Latitude for SF
  const lon = -122.4194;      // Longitude for SF
  const radius = 150000;       // Search radius in meters

  const url = `https://api.tomtom.com/search/2/categorySearch/restaurant.json?key=${apiKey}&lat=${lat}&lon=${lon}&radius=${radius}`;

  try {
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Validate that 'results' exists and is an array
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid data format: 'results' field is missing or not an array.");
    }

    return data.results;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return []; // Return an empty array to prevent further errors
  }
}

async function addDynamicMarkers() {
  const restaurants = await fetchRestaurants();

  if (restaurants.length === 0) {
    console.warn("No restaurants data available to add markers.");
    return;
  }

  restaurants.forEach((restaurant) => {
    console.log("Adding marker for:", restaurant);

    if (
      restaurant.position &&
      typeof restaurant.position.lon === 'number' &&
      typeof restaurant.position.lat === 'number' &&
      restaurant.poi &&
      restaurant.poi.name &&
      restaurant.address &&
      restaurant.address.freeformAddress
    ) {
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <h3>${restaurant.poi.name}</h3>
          <p>${restaurant.address.freeformAddress}</p>
        `);

      new mapboxgl.Marker()
        .setLngLat([restaurant.position.lon, restaurant.position.lat])
        .setPopup(popup)
        .addTo(map);
    } else {
      console.warn("Incomplete data for restaurant:", restaurant);
    }
  });
}


mapboxgl.accessToken = 'pk.eyJ1IjoiamVmZnJleWl5YW1haCIsImEiOiJjbGlveTZjaHkwaWN5M2NwYXpvajJkaTg1In0.koMqCA4ePB63Mbx1umzdlA';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-122.4194, 37.7749],
  zoom: 13
});



map.on('load', () => {
  addDynamicMarkers();
});