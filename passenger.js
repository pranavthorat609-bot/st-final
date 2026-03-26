
const busListDiv = document.getElementById("busList");

// 🔄 Listen for live bus updates
database.ref("buses").on("value", (snapshot) => {

    // Clear previous UI
    busListDiv.innerHTML = "";

    // If no buses
    if (!snapshot.exists()) {
        busListDiv.innerHTML = "<p>No active buses</p>";
        return;
    }

    snapshot.forEach((childSnapshot) => {

        const bus = childSnapshot.val();
        const busId = childSnapshot.key;

        // 🧠 Check if bus is inactive (older than 4 minutes)
        const currentTime = Date.now();
        const fourMinutes = 4 * 60 * 1000;

        if (currentTime - bus.lastUpdated > fourMinutes) {
            database.ref("buses/" + busId).remove();
            return;
        }

        // 📦 Create bus card
        const busDiv = document.createElement("div");
        busDiv.classList.add("bus-card");

        busDiv.innerHTML = `
            <div class="bus-number">Bus: ${bus.busNo}</div>
            <div class="bus-route">${bus.route}</div>
        `;

        // 🖱 Click → open map page
        busDiv.addEventListener("click", () => {
            window.location.href = `map.html?busId=${busId}`;
        });

        // Add to UI
        busListDiv.appendChild(busDiv);

    });

});


// 🔁 EXTRA CLEANUP (runs every 30 seconds)
setInterval(() => {

    database.ref("buses").once("value", (snapshot) => {

        snapshot.forEach((childSnapshot) => {

            const bus = childSnapshot.val();
            const busId = childSnapshot.key;

            const currentTime = Date.now();
            const fourMinutes = 4 * 60 * 1000;

            if (currentTime - bus.lastUpdated > fourMinutes) {

                console.log("Removing inactive bus:", busId);

                database.ref("buses/" + busId).remove();
            }

        });

    });

}, 30000);

