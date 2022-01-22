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
    let nameSection = $('<div>');
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
            let parentContainer = $('<div>');
            parentContainer.addClass('g-col-6 g-col-md-4');
            for (let i = 1; i < 6; i++) {
                let dayContainer = $('<div>');
                dayContainer.addClass('g-col-6 g-col-md-4');
                // 5-day forecast cards
                // let tempEl = data.daily[i].temp.day;

                // time element
                let timeElement = $('<div>');
                let unixtime = data.daily[i].dt;
                let formatTime = moment.unix(unixtime).format("MM/DD/YYYY");
                timeElement.text(formatTime).addClass('h5 card-title');
                dayContainer.append(timeElement);
                // image
                let imageEl = $("<img>");
                let urlCode = "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
                imageEl.attr("src", urlCode);
                dayContainer.append(imageEl);
                // temp
                let tempEl = $("<div>");
                tempEl = data.daily[i].temp.day;
                dayContainer.append("Temp: " + tempEl + "°F");
                // wind
                let windEl = $("<div>");
                windEl = data.daily[i].wind_speed;
                dayContainer.append("Wind: " + windEl + "MPH");
                // humid
                let humidEl = $("<div>");
                humidEl = data.daily[i].humidity;
                dayContainer.append("Humidity: " + humidEl + "%");
                parentContainer.append(dayContainer);
            }
            $('.grid').append(parentContainer);
        })
}


                // let weatherBlock = $(
                //     `<div class="card" style="width: 11rem;">
                //         <div class="card-body">
                //             <h5 class="card-title"></h5>
                //             <p class="card-text">
                //                 <img src="${urlCode}" 
                //                 <br />
                //                 <b>Hi:</b> ${Math.round(data.daily[i].temp.max)}&deg; F <br />
                //                 <b>Low:</b> ${Math.round(data.daily[i].temp.min)}&deg; F <br />
                //             </p>
                //         </div>
                //     </div>
                //     `
                // );
                // clear input form
                $('input[name="formGroupInput"')