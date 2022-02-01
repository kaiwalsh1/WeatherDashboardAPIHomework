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
let saveList = [];

function addToLocalStorage(cityName) {
    saveList.push(cityName);
    console.log(saveList);
    localStorage.setItem('recentSearches', JSON.stringify(saveList));
}

function addToRecentSearches(){
    saveList = JSON.parse(localStorage.getItem("recentSearches")) || [];
    for (let i = 0; i < saveList.length; i++) {
        console.log(saveList[i]);
        let nameSection = $('<div>');
        nameSection.addClass('form-control my-1');
        nameSection.text(saveList[i]);
        // search history
        recentSearch.append(nameSection)
    }
}
addToRecentSearches();

// Button
$('button').click(function (e) {
    city = $('#formGroupInput').val();
    let nameSection = $('<div>');
    nameSection.addClass('form-control my-1');
    nameSection.text(city);
    // search history
    recentSearch.append(nameSection);
    addToLocalStorage(city);
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
            $('#temp').text("Temp: " + data.main.temp);
            $('#wind').text("Wind: " + data.wind.speed);
            $('#humid').text("Humidity: " + data.main.humidity);
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
            // time element
                let timeElement = $('<div>');
                let unixtime = data.daily[i].dt;
                let formatTime = moment.unix(unixtime).format("MM/DD/YYYY");
                timeElement.text(formatTime).addClass('h5 card-title');
            // image
                let imageEl = $("<img>");
                let urlCode = "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
                imageEl.attr("src", urlCode);
            // temp
                let tempEl = $("<div>");
                tempEl = data.daily[i].temp.day;
            // wind
                let windEl = $("<div>");
                windEl = data.daily[i].wind_speed;
            // humid
                let humidEl = $("<div>");
                humidEl = data.daily[i].humidity;
            // 5-day forecast cards
                let forecastCol = $('<div>').addClass('col-sm-3');
                let forecastCard = $('<div>').addClass('card text-white bg-primary');
                let forecastCardBody = $('<div>').addClass('card-body p-2');
                
                forecastCardBody.append(timeElement, imageEl)
                forecastCardBody.append("Temp: " + tempEl + "°F").addClass('card-text');
                forecastCardBody.append("Wind: " + windEl + "MPH").addClass('card-text');
                forecastCardBody.append("Humidity: " + humidEl + "%").addClass('card-text');

                forecastCard.append(forecastCardBody);
                forecastCol.append(forecastCard);
                $('#colForecast').append(forecastCol);
            }

        })
}