const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Fake data generation: Consumption data (as an example)
let consumptionData = [
  { date: "2024-12-25", consumption_liters: getRandomInt(100, 500) },
  { date: "2024-12-26", consumption_liters: getRandomInt(100, 500) },
  { date: "2024-12-27", consumption_liters: getRandomInt(100, 500) },
  { date: "2024-12-29", consumption_liters: getRandomInt(100, 500) },
  { date: "2024-12-30", consumption_liters: getRandomInt(100, 500) },
  { date: "2025-1-1", consumption_liters: getRandomInt(100, 500) },
  { date: "2025-1-2", consumption_liters: getRandomInt(100, 500) },
  { date: "2025-1-3", consumption_liters: getRandomInt(100, 500) },
  { date: "2025-1-4", consumption_liters: getRandomInt(100, 500) },
];

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("/api", (req, res) => {
  res.send("Akıllı Sayaç Platformu Backend Çalışıyor!");
});

app.get("/api/consumption", (req, res) => {
  // Returns the user's water consumption data
  res.json({ status: "success", data: consumptionData });
});

app.get("/api/alert", (req, res) => {
  // Simple check for abnormal consumption analysis
  const alerts = consumptionData
    .filter((data) => data.consumption_liters > 400)
    .map((data) => ({ date: data.date, message: "Anormal yüksek tüketim!" }));
  res.json({ status: "success", alerts: alerts });
});

app.post("/api/add", (req, res) => {
  // Adds new consumption data
  const newData = req.body;
  if (newData.date && newData.consumption_liters) {
    consumptionData.push(newData);
    res.json({ status: "success", message: "Veri eklendi!" });
  } else {
    res.status(400).json({ status: "error", message: "Eksik veri!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
