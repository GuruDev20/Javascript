const apiKey=config.API_KEY;
const searchBtn=document.querySelector(".search_btn");
const cityInput=document.querySelector("#city");
const tempDisplay=document.querySelector(".temp");
const cityDisplay=document.querySelector(".temp_city");
const humidityDisplay=document.querySelector(".humidity");
const weatherCondDisplay=document.querySelector(".weather_cond");
const tempIcon=document.querySelector(".temp_icon");
const humidityIcon=document.querySelector(".humidity_icon");
const weatherIcon=document.querySelector(".weather_icon");

searchBtn.addEventListener("click",()=>{
    const city=cityInput.value.trim();
    if(city){
        fetchWeather(city);
    } 
    else{
        alert("Please enter a city name.");
    }
});

async function fetchWeather(city){
    try {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if(!response.ok){
            throw new Error("City not found or API error");
        }
        const data=await response.json();
        console.log(data);
        updateWeatherUI(data);
    } 
    catch (error) {
        alert(error.message);
    }
}

function updateWeatherUI(data) {
    const {name,main,weather}=data;
    tempDisplay.textContent=`${main.temp}°C`;
    cityDisplay.textContent=name;
    humidityDisplay.textContent=`${main.humidity}%`;
    weatherCondDisplay.textContent=weather[0].main;
    updateIcons(weather[0].main);
}

function updateIcons(condition) {
    const weatherIcons={
        Clear: "<i class='fas fa-sun' style='color: #FFD700;'></i>",
        Clouds: "<i class='fas fa-cloud' style='color: #B0C4DE;'></i>",
        Rain: "<i class='fas fa-cloud-showers-heavy' style='color: #4682B4;'></i>",
        Snow: "<i class='fas fa-snowflake' style='color: #00BFFF;'></i>",
        Thunderstorm: "<i class='fas fa-bolt' style='color: #FFA500;'></i>",
        Drizzle: "<i class='fas fa-cloud-rain' style='color: #87CEEB;'></i>",
        Mist: "<i class='fas fa-smog' style='color: #778899;'></i>",
    };
    
    tempIcon.innerHTML = weatherIcons[condition] || "<i class='fas fa-question-circle'></i>";
    weatherIcon.innerHTML = weatherIcons[condition] || "<i class='fas fa-question-circle'></i>";
    humidityIcon.innerHTML = "<i class='fas fa-tint' style='color: #1E90FF;'></i>";
}
