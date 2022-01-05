let APIKey = "40825ab2e821701381c3fd368776884e";
let city;
let lat, lon;
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL);


