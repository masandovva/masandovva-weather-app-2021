function formatDate(timestamp) {
  //calculate the date real time
  let date = new Date(timestamp);
  let numDay = date.getDate();
  let year = date.getFullYear();
  let months = [
    " January",
    " February",
    " March",
    " April",
    " May",
    " June",
    " July",
    " August",
    " September",
    " October",
    " November",
    " December",
  ];
  let mes = months[date.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day},${mes} ${numDay}, ${year}`;
}

function lastUpdated(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function dayDisplayed(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `              
                <div class="col-sm">
                  <img
                    class="days"
                    src= "icons/${forecastDay.weather[0].icon}.gif";
                    alt=""
                  />
                  <div class="weather-forecast-date">${dayDisplayed(
                    forecastDay.dt
                  )}</div>
                  <div class="weather-forecast-temperatures">
                    <strong
                      class="weather-forecast-temperature-max"
                      id="max-weather-celsius"
                      >${Math.round(forecastDay.temp.max)}<sup>°</sup></strong
                    >
                    |
                    <strong
                      class="weather-forecast-temperature-min"
                      id="min-weather-celsius"
                    >
                      ${Math.round(forecastDay.temp.min)}<sup>°</sup></strong
                    >
                </div>
            </div> `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "0d40b598540d71d8dcaf321e85237ab2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityInformation(response) {
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  // let cityElement = document.querySelector("#city"); is another option.
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#last-updated").innerHTML = lastUpdated(
    response.data.dt * 1000
  );
  iconElement.setAttribute("src", `icons/${response.data.weather[0].icon}.gif`);

  getForecast(response.data.coord);
}

//WEEK 5

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "0d40b598540d71d8dcaf321e85237ab2";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = "metric";
  let apiUrl = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityInformation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "0d40b598540d71d8dcaf321e85237ab2";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = "metric";
  let apiUrl = `${apiEndPoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityInformation);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//global functions is accesible from inside functions . functions can create variables but the variables that are functions are being created only available inside of a function but this specific variables ARE GLOBAL so we can acces to the variables from the inside .
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Hawaii");
