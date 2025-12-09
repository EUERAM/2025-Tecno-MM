// Real world locations with exact coordinates
const locations = [
  {
    id: 1,
    name: "Eiffel Tower, Paris",
    lat: 48.8584,
    lng: 2.2945,
    description:
      "Iconic iron monument in Paris, France. Built in 1889 for the World's Fair.",
    country: "France",
  },
  {
    id: 2,
    name: "Statue of Liberty, New York",
    lat: 40.6892,
    lng: -74.0445,
    description:
      "Colossal neoclassical sculpture in New York Harbor. A symbol of freedom.",
    country: "USA",
  },
  {
    id: 3,
    name: "Great Wall of China",
    lat: 40.4319,
    lng: 116.5704,
    description:
      "Ancient fortification stretching across northern China. UNESCO World Heritage Site.",
    country: "China",
  },
  {
    id: 4,
    name: "Christ the Redeemer, Rio de Janeiro",
    lat: -22.9519,
    lng: -43.2105,
    description:
      "Massive Art Deco statue overlooking Rio de Janeiro. One of the Seven Wonders.",
    country: "Brazil",
  },
  {
    id: 5,
    name: "Taj Mahal, Agra",
    lat: 27.1751,
    lng: 78.0421,
    description:
      "Magnificent white marble mausoleum in India. A symbol of eternal love.",
    country: "India",
  },
];

let map;
let markers = [];

// Initialize the map
function initMap() {
  // Create map centered on world view
  map = L.map("mapContainer").setView([20, 0], 2);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
  }).addTo(map);

  // Add markers for each location
  locations.forEach((location) => {
    const marker = L.circleMarker([location.lat, location.lng], {
      radius: 8,
      fillColor: getColorForLocation(location.id),
      color: "#333",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    }).addTo(map);

    marker.bindPopup(
      `<strong>${location.name}</strong><br>${location.description}`
    );

    marker.on("click", () => {
      selectLocation(location.id);
    });

    markers.push({ marker, location });
  });
}

// Get color based on location id
function getColorForLocation(id) {
  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A8E6CF", "#9B59B6"];
  return colors[id - 1];
}

// Render locations list
function renderLocationsList() {
  const targetsList = document.getElementById("targetsList");
  targetsList.innerHTML = locations
    .map(
      (location) => `
    <div class="target-info" onclick="selectLocation(${
      location.id
    })" style="border-left-color: ${getColorForLocation(location.id)}">
      <h3>📍 ${location.name}</h3>
      <p>${location.description}</p>
      <div class="target-coords">
        <strong>${location.country}</strong><br>
        Coordinates: ${location.lat.toFixed(4)}°, ${location.lng.toFixed(4)}°
      </div>
    </div>
  `
    )
    .join("");
}

// Select location and highlight it
function selectLocation(id) {
  const location = locations.find((l) => l.id === id);
  if (!location) return;

  // Zoom to location
  map.setView([location.lat, location.lng], 10);

  // Highlight marker
  markers.forEach(({ marker, location: loc }) => {
    if (loc.id === id) {
      marker.setRadius(12);
      marker.setStyle({ weight: 3 });
      marker.openPopup();
    } else {
      marker.setRadius(8);
      marker.setStyle({ weight: 2 });
      marker.closePopup();
    }
  });

  // Scroll to location in list
  const element = document.querySelector(`[onclick="selectLocation(${id})"]`);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  renderLocationsList();
});
