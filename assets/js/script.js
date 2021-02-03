var searchButton = document.getElementById('search-button');
var cityName = document.getElementById('city-name');
var currentCity = document.getElementById('current-city');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('wind-speed');
var uvIndex = document.getElementById('uv-index');
var forecastSection = document.getElementById('forecast');
var now = dayjs();
var currentDate = (now.format("MM/DD/YYYY"));

var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q='
var onecallUrl = 'https://api.openweathermap.org/data/2.5/onecall?units=imperial&'
var uvIndexDataUrl = 'https://api.openweathermap.org/data/2.5/uvi?'
var weatherImageUrl = 'https://openweathermap.org/img/wn/'
var key = '&appid=f630e3736b85bb0ac18e2d1af9cbedca'


function getCurrentWeather() {

  var name = cityName.value
  var currentWeather = weatherUrl + name + key;

  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherdata) {

      console.log("currentweather ---> ", weatherdata)
      currentCity.textContent = weatherdata.name + " (" + currentDate + ")"
      console.log("icon--> ", weatherdata.weather[0].icon)
      console.log("icon--> ", weatherdata.weather[0].description)

      var img = document.createElement('img')
      img.setAttribute("src", weatherImageUrl + weatherdata.weather[0].icon + "@2x.png");
      img.setAttribute("alt", weatherdata.weather[0].description)
      currentCity.appendChild(img)

      temperature.textContent = "Temperature : " + weatherdata.main.temp + " °F"
      humidity.textContent = "Humidity : " + weatherdata.main.humidity + " %"
      windSpeed.textContent = "Wind Speed : " + weatherdata.wind.speed + " mph"

      var latValue = weatherdata.coord.lat
      var lonValue = weatherdata.coord.lon
      var uvdata = uvIndexDataUrl + 'lat=' + latValue + '&lon=' + lonValue + key

      fetch(uvdata)
        .then(function (response) {
          return response.json();
        })
        .then(function (uvdata) {

          uvIndex.textContent = "UV-Index : "
          var uvIndexData = uvdata.value
          var span = document.createElement('span')
          uvIndex.appendChild(span)
          span.textContent = uvIndexData

          if (uvIndexData <= 2) {
            span.setAttribute("class", "badge bg-success")
          }
          else if (uvIndexData <= 6) {
            span.setAttribute("class", "badge bg-warning")
          }
          else if (uvIndexData > 6) {
            span.setAttribute("class", "badge bg-danger")
          }

        })

      var options = "&exclude=current,minutely,hourly,alerts"
      var forecastUrl = onecallUrl + 'lat=' + latValue + '&lon=' + lonValue + options + key
      // console.log("url", forecastUrl)

      fetch(forecastUrl)
        .then(function (response) {

          return response.json();
        })
        .then(function (data) {

          for (var i = 1; i < 6; i++) {

            var unix_timestamp = data.daily[i].dt
            var date = new Date(unix_timestamp * 1000);
            var forecastDate = dayjs(date).format('MM/DD/YYYY')

            var div1 = document.createElement("col")
            forecastSection.appendChild(div1)

            var div2 = document.createElement("div")
            div2.setAttribute("class", "card card-body bg-info border-dark")
            div1.appendChild(div2);
            var h6 = document.createElement('h6')
            h6.textContent = forecastDate
            div2.appendChild(h6)

            var img2 = document.createElement('img')
            img2.setAttribute("src", weatherImageUrl + data.daily[i].weather[0].icon + "@2x.png");
            img2.setAttribute("alt", data.daily[i].weather[0].description)
            div2.appendChild(img2)


            var forecastTemp = data.daily[i].temp.day
            var ptag = document.createElement("p")
            div2.appendChild(ptag)
            ptag.textContent = "Temp:" + forecastTemp + "°F"


            var forecastHumidity = data.daily[i].humidity
            var ptag2 = document.createElement("p")
            div2.appendChild(ptag2)
            ptag2.textContent = "Humidity:" + forecastHumidity + "%"
          }

        })
    });
}
searchButton.addEventListener('click', getCurrentWeather);







