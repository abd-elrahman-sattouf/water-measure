const http = require('http');
const url = require('url');

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

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  if (method === 'GET' && pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Akıllı Sayaç Platformu Backend Çalışıyor!');
  } else if (method === 'GET' && pathname === '/api/consumption') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: "success", data: consumptionData }));
  } else if (method === 'GET' && pathname === '/api/alert') {
    const alerts = consumptionData
      .filter((data) => data.consumption_liters > 400)
      .map((data) => ({ date: data.date, message: "Anormal yüksek tüketim!" }));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: "success", alerts: alerts }));
  } else if (method === 'POST' && pathname === '/api/add') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newData = JSON.parse(body);
      if (newData.date && newData.consumption_liters) {
        consumptionData.push(newData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "success", message: "Veri eklendi!" }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "error", message: "Eksik veri!" }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});