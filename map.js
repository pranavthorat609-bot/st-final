let map = null;
let marker = null;

const params = new URLSearchParams(window.location.search);
const busId = params.get("busId");

database.ref("buses/" + busId).on("value", (snapshot) => {

    const bus = snapshot.val();

    if (!bus) {
        alert("Bus not active");
        window.location.href = "passenger.html";
        return;
    }

    document.getElementById("busInfo").innerText =
        bus.busNo + " | " + bus.route;

    if (!map) {

        map = L.map("map").setView([bus.latitude, bus.longitude], 13);

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: "© OpenStreetMap contributors" }
        ).addTo(map);

        marker = L.marker([bus.latitude, bus.longitude]).addTo(map);

    } else {

        marker.setLatLng([bus.latitude, bus.longitude]);
        map.setView([bus.latitude, bus.longitude]);

    }

});
