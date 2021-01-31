
/*
//A weather dashboard with form inputs
  * search box for a city
//show current and future conditions for that city and that city is added to the search history

*current weather conditions for that city
--show the city name,
--the date, 
--an icon representation of weather conditions, 
--the temperature,
--the humidity,
--the wind speed
--UV index
  * for the UV index
    --presented with a color that indicates whether 
    --the conditions are favorable, moderate, or severe
*future weather conditions for that city
--show a 5-day forecast that displays 
--the date, 
--an icon representation of weather conditions,
--the temperature,
--and the humidity
* click on a city in the search history
* again presented with 
--current 
--and future conditions for that city
*/

/*


*/
var searchButton = document.getElementById('search-button');
var cityName = document.getElementById('city-name');
var currentCity = document.getElementById('current-city');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('wind-speed');
var uvIndex = document.getElementById('uv-index');


//api.openweathermap.org/data/2.5/forecast?q=philadelphia&appid=f630e3736b85bb0ac18e2d1af9cbedca
//var fiveDayForecast ='https://api.openweathermap.org/data/2.5/forecast?q=' + name +'&appid=' + key


var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q='
var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='
var uvIndexDataUrl = 'http://api.openweathermap.org/data/2.5/uvi?'
var key = '&appid=f630e3736b85bb0ac18e2d1af9cbedca'


function getCurrentWeather() {

  var name = cityName.value
  var currentWeather = weatherUrl + name + key;

  console.log('currentWeather', currentWeather)

  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherdata) {


      currentCity.textContent = weatherdata.name

      temperature.textContent = "Temperature :" + weatherdata.main.temp
      humidity.textContent = "Humidity : " + weatherdata.main.humidity
      windSpeed.textContent = "Wind Speed : " + weatherdata.wind.speed

      var latValue = weatherdata.coord.lat
      var lonValue = weatherdata.coord.lon
      var uvdata = uvIndexDataUrl + 'lat=' + latValue + '&lon=' + lonValue + key

      fetch(uvdata)
        .then(function (response) {
          return response.json();
        })
        .then(function (uvdata) {
          console.log(uvdata.value)
          uvIndex.textContent = "UV-Index : " + uvdata.value
        })

    });
}
searchButton.addEventListener('click', getCurrentWeather);




//get 5 day forcast for the selected city in followin order
//calculate to show 5 days from current day
//date
//cloud icon
//Temperature in Fahrenheit
//Humidity
/*
//date
console.log("date-->", data.list[0].dt)

//temperature convert to Fahrenheit
console.log("temp-->", data.list[0].main.temp)

//Humidity
console.log("humidity-->", data.list[0].main.humidity)

//Wind Speed
console.log("wind-->", data.list[0].wind.speed)

//Uv Index
console.log("uv index lat-->", data.city.coord.lat)
console.log("uv index lon-->", data.city.coord.lon) */


