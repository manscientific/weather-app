document.addEventListener('DOMContentLoaded', function() {
    // Get references to the HTML elements

    const cityInput = document.getElementById("city-input");

    const getweatherBtn = document.getElementById("get-weather-btn");
    
    const weatherInfo = document.getElementById("weather-info");
    
    const cityNameDisplay = document.getElementById("city-name");
    
    const temperatureDisplay = document.getElementById("temperature");
    
    const descriptionDisplay = document.getElementById("description");
    
    const errorMessage= document.getElementById("error-message");

const API_KEY = "568b6339e24eaac5f6cf27ed16049eb9";

getweatherBtn.addEventListener("click", async function() {
    const city = cityInput.value.trim();
    if (!city) return;
    // it may throw an error
    // server/database in other continent
    try{
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
    } catch (error) {
        showError();
    }

   
})

async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("City not found");
    }
    const data = await response.json();
    return data;
}
 
function displayWeatherData(data) {
    const { name, main, weather } = data;
    temperatureDisplay.textContent = `Temprature: ${main.temp} °C`;
    descriptionDisplay.textContent = `Description: ${weather[0].description}`;
    cityNameDisplay.textContent = `City: ${name}`;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    setWeatherBackground(weather[0].description);
}
function showError(){
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
}   

const backgroundGif = document.getElementById("background-gif");
if (!backgroundGif) {
    console.error("background-gif element not found in HTML!");
}

function setWeatherBackground(description) {
    let gifUrl = "";
    const desc = description.toLowerCase();

    if (desc.includes("rain")) {
        gifUrl = "200.gif";
    } else if (desc.includes("cloud")) {
        gifUrl = "200 (1).gif";
    } else if (desc.includes("clear")) {
        gifUrl = "sky-clouds.gif";
    } else if (desc.includes("snow")) {
        gifUrl = "07bfbceee981230a14ab6a5341003415.gif";
    } else if (desc.includes("storm") || desc.includes("thunder")) {
        gifUrl = "thunderstorm-thunder.gif";
    } else {
        gifUrl = "200 (2).gif"; // default
    }

    backgroundGif.style.backgroundImage = `url('${gifUrl}')`;
}


});