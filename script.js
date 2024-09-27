function getWeather() {
  const apikey = "9a130f278af5b58521d91604f87f8a5b";
  const City = document.getElementById("city").value;

  if (!City) {
    alert("please enter a city name");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apikey}`;
  const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=${apikey}`;
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data, please try again.");
    });

  fetch(forcastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching hourly forecast data:", error);
      alert("Error fetching hourly forecast data. Please try again.");
    });
}

function displayWeather(data) {
  const tempDivinfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivinfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHtml = `<p>${temperature}°`;
    const weatherHtml = `<p>${cityName}</p> 
        <p>${description}</p>`;

    tempDivinfo.innerHTML = temperatureHtml;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(hourelyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  const next24Hours = hourelyData.slice(0, 8);

  next24Hours.forEach((item) => {
    const dataTime = new Date(item.dt * 1000);
    const hour = dataTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    const hourelyItem = `
            <div class = "hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt = "hourly weather icon ">
                <span>${temperature}℃</span>
            </div>
            `;
    hourlyForecastDiv.innerHTML += hourelyItem;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
