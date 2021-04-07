function showCityInformation(response) {
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

// Function Bonus Feature
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
  // temperature = Number(temperature); // is like in Python convert string into int or float number :)
  // temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
  // temperature = Number(temperature); // is like in Python convert string into int or float number :)
  // temperatureElement.innerHTML = Math.round((temperature - 32) * (5 / 9));
}

// Feature #1
new Date();
let now = new Date();

let h1 = document.querySelector("h1");

let days = [
  "Sunday ",
  "Monday ",
  "Tuesday ",
  "Wednesday ",
  "Thursday ",
  "Friday ",
  "Saturday ",
];

let day = days[now.getDay()];
//let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let date = now.getDate();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h1.innerHTML = `${day}${date},    ${hours}:${minutes}`;

//Feature #2

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("New York");

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
// Bonus Feaature

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//function formatDate(timestamp){//calculate the date return "friday 5:00"}
