async function fetchWeather(lat, lon, address) {
  const loadingBar = document.getElementById("loadingBar");
  const weatherBox = document.getElementById("weatherBox");
  const errorBox = document.getElementById("errorBox");

  loadingBar.style.display = "block";
  weatherBox.style.display = "none";
  errorBox.style.display = "none";

  try {
    let url = "/weather?";
    if (lat && lon) {
      url += `lat=${lat}&lon=${lon}`;
    } else if (address) {
      url += `address=${encodeURIComponent(address)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("feelsLike").textContent = data.main.feels_like;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("description").textContent =
      data.weather[0].description;

    weatherBox.style.display = "block";
  } catch (error) {
    document.getElementById("errorMessage").textContent = error.message;
    errorBox.style.display = "block";
  } finally {
    loadingBar.style.display = "none";
  }
}

function getWeatherByLocation() {
  const address = document.getElementById("locationInput").value;
  if (address) {
    fetchWeather(null, null, address);
  }
}

function getWeatherByGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        document.getElementById("errorMessage").textContent =
          "Unable to get location: " + error.message;
        document.getElementById("errorBox").style.display = "block";
      }
    );
  } else {
    alert("Geolocation is not supported by your browser");
  }
}
