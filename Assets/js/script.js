let APIKey = "40825ab2e821701381c3fd368776884e";
let city;
let lat, lon;
let temp, wind_speed, icon, humidity, uvi;
let weatherDashboard = $('#weatherDashboard');
let queryURL;
let responseText = document.getElementById('response-text');

$('button').click(function (e) {
    city = $('#formGroupExampleInput').val();
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
            console.log(data.coord);
            lat = data.coord.lat;
            lon = data.coord.lon;
            $('#location').text(data.name);
            getApi2()
        })
}


function getApi2() {
    queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data, 'new');
            temp = data.current.temp;
            wind_speed = data.current.wind_speed;
            icon = data.current.weather[0].icon;
            humidity = data.current.humidity;
            uvi = data.current.uvi;
            console.log(temp, wind_speed, icon, humidity, uvi);
        })
}
