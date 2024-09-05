window.onload = function() {
    // Initialize the map
    var map = L.map('map').setView([40.7128, -74.0060], 13); // New York City coordinates

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker
    L.marker([40.7128, -74.0060]).addTo(map)
        .bindPopup('Helixify Office')
        .openPopup();
};
