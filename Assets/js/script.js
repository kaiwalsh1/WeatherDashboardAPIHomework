fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=6bf7b9fa10fadad09f55e16f80acbd89', {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
})
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
});
