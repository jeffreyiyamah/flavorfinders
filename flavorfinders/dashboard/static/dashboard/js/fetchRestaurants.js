const fetch = require("node-fetch"); // Import the fetch library

async function fetchRestaurants() {
  const apiKey = "wFyfphdUEnlygaeBxPyVr4xKChtdLgQG"; // Replace with your TomTom API key
  const lat = 32.5770; // Latitude for ZIP Code 76063
  const lon = -97.1181; // Longitude for ZIP Code 76063
  const radius = 5000; // Search radius in meters (5 km)

  try {
    const response = await fetch(
      `https://api.tomtom.com/search/2/categorySearch/restaurant.json?key=${apiKey}&lat=${lat}&lon=${lon}&radius=${radius}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Restaurants found:", data.results); // Output restaurants to the terminal
  } catch (error) {
    console.error("Error fetching restaurants:", error.message);
  }
}

fetchRestaurants(); // Run the function
