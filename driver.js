// js/driver.js

let watchId = null;
let currentBusRef = null;
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
document.getElementById("startTracking").addEventListener("click", () => {

    const busNo = document.getElementById("busNo").value;
    const route = document.getElementById("route").value;

    if (!busNo || !route) {
        alert("Please enter Bus Number and select Route");
        return;
    }

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }
 statusDot.classList.remove("status-offline");
statusDot.classList.add("status-online");

statusText.innerText = "Online";
    // Create unique bus entry (multiple buses supported)
    currentBusRef = database.ref("buses").push();

    watchId = navigator.geolocation.watchPosition(
        (position) => {

            const busData = {
                busNo: busNo,
                route: route,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                lastUpdated: Date.now()
            };

            currentBusRef.set(busData);

            document.getElementById("status").innerText =
                "Tracking live location...";
        },
        () => {
            alert("Location permission denied");
        },
        {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 10000
        }
    );

    document.getElementById("startTracking").style.display = "none";
    document.getElementById("stopTracking").style.display = "inline";
});

document.getElementById("stopTracking").addEventListener("click", () => {
 statusDot.classList.remove("status-online");
statusDot.classList.add("status-offline");

statusText.innerText = "Offline";

    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }

    if (currentBusRef) {
        currentBusRef.remove();
    }

    document.getElementById("status").innerText = "Tracking stopped";

    document.getElementById("startTracking").style.display = "inline";
    document.getElementById("stopTracking").style.display = "none";

});

