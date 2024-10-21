const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Replace this with your OpenWeather API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('searchFrom').addEventListener('submit', Event => {
const city = document.getElementById('cityInput').ariaValueMax.trim();

fetchWeather(city).then(data => {
    if (data) {
        displayWeather(data);
        addToFavorites(city)
    }
});
});  

function fetchWeather(city){
const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

return fetch(url)
.then(response => response.json())
.then(data =>{
    if(data.code === 200) {
        clearError();
        return data;
    } else{
        throw new Error(data.message);
    }
})
.catch(error=> {
    displayError('city not found. please enter a valid city name.');
    console.error('Error fetching weather data:', error);
});
}