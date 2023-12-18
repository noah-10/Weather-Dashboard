// var requestUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={16818c644b4e657d8ccc3aa7a2c735e0}"

// var geoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=1&appid=16818c644b4e657d8ccc3aa7a2c735e0`

var submitBtn = $("#submit");

var userCity = "";

var userState = "";

var cityLat = null;
var cityLon = null;

var cityName = $("#display-name")



submitBtn.on("click", function(event){
    event.preventDefault()
    var cityInput = $("#floatingInput-city").val();
    var stateInput = $("#floatingInput-state").val();
    userCity = cityInput
    userState = stateInput
    getCoordinates()

})


function getWeather(){
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=16818c644b4e657d8ccc3aa7a2c735e0`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        // $("#display-name").text(data.city.name);
    })
}




function getCoordinates(){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=1&appid=66806939c1861a2ad06cc249d1a3a086`)
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        cityLat = data[0].lat;
        cityLon = data[0].lon;
        console.log(data);
        getWeather()
    })
    
}
