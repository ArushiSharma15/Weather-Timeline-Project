


const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p");
const dataandtimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");
const bgVideo = document.getElementById("bg-video");   
form.addEventListener("submit", searchForLocation);

let target = "Mumbai";

const fetchResults = async (targetlocation) => {
  let url = `https://api.weatherapi.com/v1/current.json?key=b8d775012883436c89172454260502&q=${targetlocation}&aqi=no`;

  const res = await fetch(url);
  const data = await res.json();

  let locationName = data.location.name;
  let time = data.location.localtime;
  let temp = data.current.temp_c;
  let condition = data.current.condition.text;

  updateDetails(temp, locationName, time, condition);
};

function updateDetails(temp, locationName, time, condition) {
  temperatureField.innerText = temp + "°C";
  locationField.innerText = locationName;
  dataandtimeField.innerText = time;
  conditionField.innerText = condition;

  const video = document.getElementById("bg-video");
  const source = video.querySelector("source");

  let weather = condition.toLowerCase();

  if (weather.includes("rain") || weather.includes("drizzle")) {
      source.src = "rain.mp4";
  } 
  else if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) {
      source.src = "mist.mp4";
  } 
  else if (weather.includes("cloud")) {
      source.src = "cloudy.mp4";
  } 
  else if (weather.includes("clear") || weather.includes("sunny")) {
      source.src = "clear.mp4";
  } 
  else if (weatherCondition.includes("Overcast")) {
    bgVideo.src = "overcast.mp4";
}
  else {
      source.src = "clear.mp4";
  }

  video.load();
}

  
function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchResults(target);
}


fetchResults(target);
