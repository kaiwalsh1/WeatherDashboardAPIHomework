let APIKey = "40825ab2e821701381c3fd368776884e";
let city;
let lat, lon;
let temp, wind_speed, icon, humidity, uvi;
let weatherDashboard = $('#weatherDashboard');
let queryURL;
let responseText = $('#response-text');
let searchHistoryContainer = $('#searchHistoryContainer');
let searchBtn = $('#button');
let day = [];
let recentSearch = $('#recentSearch');
console.log(recentSearch);


// Button
$('button').click(function (e) {
    city = $('#formGroupInput').val();
    // recentSearch.addClass('form-control');
    var nameSection = $('<div>');
    nameSection.addClass('form-control my-1');
    nameSection.text(city);
    // search history
    recentSearch.append(nameSection);
    getApi();
})

function getApi() {
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            lat = data.coord.lat;
            lon = data.coord.lon;
            $('#location').text(data.name);
            $('#location').addClass('strong');
            $('#temp').text(data.main.temp);
            $('#wind').text(data.wind.speed);
            $('#humid').text(data.main.humidity);

            getApi2();
        })
}


function getApi2() {
    queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}&exclude=hourly,minutely`;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data, 'new');
            $('#uv').text(data.daily[0].uvi);
            for (let i = 1; i < 6; i++) {
                let parentContainer = $('<div>');
                parentContainer.addClass('g-col-6 g-col-md-4');
                let timeElement = $('<div>');
                let unixtime = data.daily[i].dt;
                let formatTime = moment.unix(unixtime).format("MM/DD/YYYY");
                timeElement.text(formatTime);
                parentContainer.append(timeElement);
                let imageEl = $("<img>");
                let urlCode = "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
                imageEl.attr("src", urlCode);
                parentContainer.append(imageEl);
                $('.grid').append(parentContainer);
                let tempEl = $("<div>");
                tempEl = data.daily[i].temp.day;
                parentContainer.append("Temp: " + tempEl + "°F");
                let windEl = $("<div>");
                windEl = data.daily[i].wind_speed;
                parentContainer.append("Wind: " + windEl + "MPH");
                let humidEl = $("<div>");
                humidEl = data.daily[i].humidity;
                parentContainer.append("Humidity: " + humidEl + "%");
            }
        })
}
