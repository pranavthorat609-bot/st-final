const busListDiv = document.getElementById("busList");

database.ref("buses").on("value", (snapshot) => {

    busListDiv.innerHTML = "";

    snapshot.forEach((childSnapshot) => {

        const bus = childSnapshot.val();
        const busId = childSnapshot.key;

        const busDiv = document.createElement("div");

        busDiv.classList.add("bus-card");

        busDiv.innerHTML = `
        <div class="bus-number">Bus: ${bus.busNo}</div>
        <div class="bus-route">${bus.route}</div>
        `;

        busDiv.addEventListener("click", () => {

            window.location.href =
                `map.html?busId=${busId}`;

        });

        busListDiv.appendChild(busDiv);
    });
});
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

