// js/passenger.js

let map = null;
let marker = null;
let selectedBusId = null;

const busListDiv = document.getElementById("busList");

database.ref("buses").on("value", (snapshot) => {

    busListDiv.innerHTML = "<h3>Active Buses (Click one)</h3>";

    snapshot.forEach((childSnapshot) => {

        const bus = childSnapshot.val();
        const busId = childSnapshot.key;

        // 🔥 Auto remove after 4 minutes
        const currentTime = Date.now();
        const fourMinutes = 4 * 60 * 1000;

        if (currentTime - bus.lastUpdated > fourMinutes) {
            database.ref("buses/" + busId).remove();
            return;
        }

        // 🔥 Move marker ONLY for selected bus
        if (selectedBusId && busId === selectedBusId && map && marker) {
            marker.setLatLng([bus.latitude, bus.longitude]);
            map.setView([bus.latitude, bus.longitude]);
        }

        // Create clickable bus card
        const busDiv = document.createElement("div");
        busDiv.className = "bus-card";

        busDiv.innerHTML = `
            <strong>Bus No:</strong> ${bus.busNo}<br>
            <strong>Route:</strong> ${bus.route}
        `;

        // CLICK HANDLER
        busDiv.addEventListener("click", () => {

            selectedBusId = busId;
            document.getElementById("map").style.display = "block";

            if (!map) {
                map = L.map("map").setView([bus.latitude, bus.longitude], 13);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap contributors"
                }).addTo(map);

                marker = L.marker([bus.latitude, bus.longitude]).addTo(map);
            } else {
                marker.setLatLng([bus.latitude, bus.longitude]);
                map.setView([bus.latitude, bus.longitude]);
            }
        });

        busListDiv.appendChild(busDiv);
    });

    // 🔥 Handle selected bus removal
    if (selectedBusId && !snapshot.hasChild(selectedBusId)) {

        selectedBusId = null;

        if (marker) {
            marker.remove();
            marker = null;
        }

        if (map) {
            map.remove();
            map = null;
        }

        document.getElementById("map").style.display = "none";
        alert("Selected bus is no longer active");
    }
});