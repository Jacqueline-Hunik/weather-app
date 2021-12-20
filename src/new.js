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
  let sentence = `${day}, ${hour}:${minutes}`;
  return sentence;
}

function showTemp(response) {
  console.log(response);
  let city = response.data.name;
  let temp = response.data.main.temp;
  temp = Math.round(temp);
  let h1 = document.querySelector(".city-name");
  h1.innerHTML = city;
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${temp}℃`;
  //humidity
  let humidity = response.data.main.humidity;
  let humid = document.querySelector(".humidity");
  humid.innerHTML = ` ${humidity}`;
  //wind speed
  let wind = response.data.wind.speed;
  wind = Math.round(wind * 3.6);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `${wind}`;

  //cloud cover
  let clouds = response.data.clouds.all;
  let cloudCover = document.querySelector(".condition");
  if (clouds >= 75) {
    cloudCover.innerHTML = "Cloudy";
  } else {
    cloudCover.innerHTML = "Clear";
  }
}

function getWeatherInfo(event) {
  event.preventDefault();
  let cityName = document.querySelector("#text-input");
  cityName = cityName.value;
  let apiKey = "6d0e6f24b78bc6a485767b30b562c967";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  axios.get(apiCall).then(showTemp);
}

function getPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "6d0e6f24b78bc6a485767b30b562c967";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiCall).then(showTemp);
}

function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let h3 = document.querySelector(".date");
h3.innerHTML = formatDate(new Date());

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", getWeatherInfo);

let currentButton = document.querySelector("#current-weather-button");
currentButton.addEventListener("click", getGeolocation);
