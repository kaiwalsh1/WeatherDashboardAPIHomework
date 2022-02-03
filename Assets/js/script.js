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

// saves array to local storage
function addToLocalStorage(cityName) {
    saveList.push(cityName);
    console.log(saveList);
    localStorage.setItem('recentSearches', JSON.stringify(saveList));
}
// gets array from local storage, or sets to an empty array if nothing found
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

// function saveList.on('click', {

// })

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
            $('#location').text(data.name).addClass("<h3>");
            $('#temp').text("Temp: " + data.main.temp + "°F");
            $('#wind').text("Wind: " + data.wind.speed + "MPH");
            $('#humid').text("Humidity: " + data.main.humidity + "%");
            getApi2();
            // $('#uv').text("UV Index: " + data.daily.uvi);
            // // $('#iconDay').attr('src', "http://openweathermap.org/img/w/" + data.daily.weather.icon + ".png");
            // let urlCodeDay = "http://openweathermap.org/img/w/" + data.daily[0].weather[0].icon + ".png"
            // $('#iconDay').append(urlCodeDay);.attr("src", urlCodeDay);
            // image
            // let imageEl = $("<img>");
            // let urlCode = "http://openweathermap.org/img/w/" + data.daily.weather.icon + ".png";
            // console.log(urlCode);
            // imageEl.attr("src", urlCode);

            // let unixtime = data.daily[0].dt;
            // let formatTime = moment.unix(unixtime).format("MM/DD/YYYY");
            // $('#location').text(formatTime).addClass('h5 card-title');
        })
}


function getApi2() {
    queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}&exclude=hourly,minutely`;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let uvResponse = data.daily[0].uvi;
            $('#uv').text("UV Index: ");
            
            if (uvResponse < 3) {
                $('#uvBtn').addClass('btn-success');
            } else if (uvResponse < 7) {
                $('#uvBtn').addClass('btn-warning');
            } else {
                $('#uvBtn').addClass('btn-danger');
            } 
            
            $('#uvBtn').text(data.daily[0].uvi).append(uvResponse.value);
            console.log(uvResponse);
            

            

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