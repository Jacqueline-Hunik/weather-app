function formatDate(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];

  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let sentence = `${day} ${hour}:${minutes}`;
  return sentence;
}

function getForecast(coordinates) {
  let apiKey = "6d0e6f24b78bc6a485767b30b562c967";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  // call display forecast
  axios.get(apiURL).then(displayForecast);
}

function showTemp(response) {
  //variable initializations
  let weatherIcon = document.querySelector("#weather-icon");
  let city = response.data.name;
  let temp = response.data.main.temp;
  let h1 = document.querySelector(".city-name");
  let currentTemp = document.querySelector("#currentTemp");
  let humidity = response.data.main.humidity;
  let humid = document.querySelector(".humidity");
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector(".wind");
  let clouds = response.data.weather[0].description;
  let description = document.querySelector(".condition");

  temp = Math.round(temp);
  h1.innerHTML = city;
  currentTemp.innerHTML = `${temp}℃`;
  humid.innerHTML = ` ${humidity}`;
  windSpeed.innerHTML = `${Math.round(wind)}`;
  description.innerHTML = clouds;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function getWeatherInfo(city) {
  let apiKey = "6d0e6f24b78bc6a485767b30b562c967";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiCall).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityName = document.querySelector("#text-input");
  getWeatherInfo(cityName.value);
}

function formatDay(time) {
  let date = new Date(time * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2" id="forecast-day">
    <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=" weather icon"
        class="weather-forecast-icon"
      />
      <div class="weather-forecast-temp">
        <span class="weather-forecast-max-temp">${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-min-temp">${Math.round(
          forecastDay.temp.min
        )}° </span>
    </div>
  </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let dateElement = document.querySelector(".date");
dateElement.innerHTML = formatDate(new Date());

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSubmit);

getWeatherInfo("Calgary");
