const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.static("public"));

const API_KEY = process.env.WEATHER_API_KEY;

app.get("/weather", async (req, res) => {
  try {
    const { lat, lon, address } = req.query;
    let url;

    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else if (address) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${API_KEY}&units=metric`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// app.listen(port, () => {
//   console.log(`Server running at ${port} 🗼🗼🗼`);
// });
module.exports = app;
