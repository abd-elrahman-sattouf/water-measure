const apiUrl = "http://localhost:3000/api";

function fetchConsumption() {
  fetch(`${apiUrl}/consumption`)
    .then((response) => response.json())
    .then((data) => {
      const consumptionDiv = document.getElementById("consumption");
      consumptionDiv.innerHTML = "<h2>Consumption Data</h2>";
      data.data.forEach((item) => {
        consumptionDiv.innerHTML += `<p>Date: ${item.date}, Consumption: ${item.consumption_liters} liters</p>`;
      });
    })
    .catch((error) => console.error("Error fetching consumption data:", error));
}

function fetchAlerts() {
  fetch(`${apiUrl}/alert`)
    .then((response) => response.json())
    .then((data) => {
      const alertsDiv = document.getElementById("alerts");
      alertsDiv.innerHTML = "<h2>Alerts</h2>";
      if (data.alerts.length > 0) {
        data.alerts.forEach((alert) => {
          alertsDiv.innerHTML += `<p>Date: ${alert.date}, Message: ${alert.message}</p>`;
        });
      } else {
        alertsDiv.innerHTML += "<p>No alerts</p>";
      }
    })
    .catch((error) => console.error("Error fetching alerts:", error));
}

const clearAlerts = () => {
  document.getElementById("alerts").innerHTML = "";
};
const clearConsumption = () => {
  document.getElementById("consumption").innerHTML = "";
};
(function () {
  const footer = document.getElementById("footer");
  function updateDate() {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    footer.textContent = now.toLocaleDateString("en-US", options);
  }

  // Initial display
  updateDate();
})();
const container = d3.select('.container');
const waterLevel = d3.select('.water');
const levelText = d3.select('#level');
const audio = new Audio("siren-alert-96052.mp3")

let currentLevel = 50; // Initial water level (percentage)

function updateWaterLevel() {
  // Simulate random water level changes (replace with actual sensor data)
  currentLevel = Math.floor(Math.max(0, currentLevel + Math.random() * 5 - 2.5)); 

  // Update water level height 
  waterLevel.style('height', `${currentLevel}%`); 

  // Update level text
  levelText.text(`${currentLevel}%`);

  // Check for potential leak (simplified)
  if (currentLevel == 20) {
    alert('Warning! Possible water leak detected.');
    audio.play(); 
  }
}

// Initial update
updateWaterLevel();

// Update every 2 seconds (adjust as needed)
setInterval(updateWaterLevel, 2000);