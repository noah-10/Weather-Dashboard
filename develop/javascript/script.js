var displayCity = $("#display-name");

var todayTemp = $("#today-temp");
var todayWind = $("#today-wind");
var todayHumid = $("#today-humidity");

var displayTomorrowDate = $("#tomorrow-date")
var tomorrowTemp = $("#tomorrow-temp");
var tomorrowWind = $("#tomorrow-wind");
var tomorrowHumid = $("#tomorrow-humidity");

var displayThirdDate = $("#thirdDay-date")
var thirdDayTemp = $("#thirdDay-temp");
var thirdDayWind = $("#thirdDay-wind");
var thirdDayHumid = $("#thirdDay-humidity");

var displayFourthDate = $("#fourth-date")
var fourthDayTemp = $("#fourthDay-temp");
var fourthDayWind = $("#fourthDay-wind");
var fourthDayHumid = $("#fourthDay-humidity");

var displayFifthDate = $("#fifth-date")
var fifthDayTemp = $("#fifthDay-temp");
var fifthDayWind = $("#fifthDay-wind");
var fifthDayHumid = $("#fifthDay-humidity");

var displaySixthDate = $("#sixth-date")
var sixthDayTemp = $("#sixth-temp");
var sixthDayWind = $("#sixth-wind");
var sixthDayHumid = $("#sixth-humidity");


var submitBtn = $("#submit");

var userCity = "";

var userState = "";

var cityLat = null;
var cityLon = null;

var todayDate = dayjs().format("YYYY-MM-DD");
var tomorrowDate = dayjs().add(1, "day").format("YYYY-MM-DD");
var thirdDayDate = dayjs().add(2, "day").format("YYYY-MM-DD");
var fourthDayDate = dayjs().add(3, "day").format("YYYY-MM-DD");
var fifthDayDate = dayjs().add(4, "day").format("YYYY-MM-DD");
var sixthDayDate = dayjs().add(5, "day").format("YYYY-MM-DD");



var forecast = {
    today: {
        temperature: null,
        wind: null,
        humidity: null
    },

    tomorrow:{
        temperature: null,
        wind: null,
        humidity: null
    },

    thirdDay:{
        temperature: null,
        wind: null,
        humidity: null
    },

    fourthDay:{
        temperature: null,
        wind: null,
        humidity: null
    },

    fifthDay:{
        temperature: null,
        wind: null,
        humidity: null
    },

    sixthDay:{
        temperature: null,
        wind: null,
        humidity: null
    }
};

submitBtn.on("click", function(event){
    event.preventDefault()
    var cityInput = $("#floatingInput-city").val();
    var stateInput = $("#floatingInput-state").val();
    userCity = cityInput
    userState = stateInput
    getCoordinates()

})


function getWeather(){
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=16818c644b4e657d8ccc3aa7a2c735e0`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        var lengths = {
            todayLength : null,
            tomorrowLength : null,
            thirdDayLength : null,
            fourthDayLength : null,
            fifthDayLength : null,
            sixthDayLength : null,
        }
        
        for(var i = 0; i < data.list.length; i++){
            var allData = data.list[i];
            // console.log(allData);
            dataDate = allData.dt_txt.split(" ")[0];

            if(dataDate === todayDate){
                console.log(allData);
                lengths.todayLength += 1;
                forecast.today.humidity += allData.main.humidity;
                forecast.today.wind += allData.wind.speed;
                forecast.today.temperature += allData.main.temp;
            }
            else if(dataDate === tomorrowDate){
                console.log(allData);
                lengths.tomorrowLength += 1;
                forecast.tomorrow.humidity += allData.main.humidity;
                forecast.tomorrow.wind += allData.wind.speed;
                forecast.tomorrow.temperature += allData.main.temp;
            }
            else if(dataDate === thirdDayDate){
                console.log(allData);
                lengths.thirdDayLength += 1;
                forecast.thirdDay.humidity += allData.main.humidity;
                forecast.thirdDay.wind += allData.wind.speed;
                forecast.thirdDay.temperature += allData.main.temp;
            }
            else if(dataDate === fourthDayDate){
                console.log(allData);
                lengths.fourthDayLength += 1;
                forecast.fourthDay.humidity += allData.main.humidity;
                forecast.fourthDay.wind += allData.wind.speed;
                forecast.fourthDay.temperature += allData.main.temp;
            }
            else if(dataDate === fifthDayDate){
                console.log(allData);
                lengths.fifthDayLength += 1;
                forecast.fifthDay.humidity += allData.main.humidity;
                forecast.fifthDay.wind += allData.wind.speed;
                forecast.fifthDay.temperature += allData.main.temp;
            }
            else if(dataDate === sixthDayDate){
                console.log(allData);
                lengths.sixthDayLength += 1;
                forecast.sixthDay.humidity += allData.main.humidity;
                forecast.sixthDay.wind += allData.wind.speed;
                forecast.sixthDay.temperature += allData.main.temp;
            }
        }
        getAverage(lengths);
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
        getWeather();
    })
    
}


function getAverage(lengths){

    forecast.today.humidity = Math.round(forecast.today.humidity / lengths.todayLength);
    forecast.today.wind = Math.round(forecast.today.wind / lengths.todayLength);
    forecast.today.temperature = Math.round(forecast.today.temperature / lengths.todayLength);

    forecast.tomorrow.humidity = Math.round(forecast.tomorrow.humidity / lengths.tomorrowLength);
    forecast.tomorrow.wind = Math.round(forecast.tomorrow.wind / lengths.tomorrowLength);
    forecast.tomorrow.temperature = Math.round(forecast.tomorrow.temperature / lengths.tomorrowLength);

    forecast.thirdDay.humidity = Math.round(forecast.thirdDay.humidity / lengths.thirdDayLength);
    forecast.thirdDay.wind = Math.round(forecast.thirdDay.wind / lengths.thirdDayLength);
    forecast.thirdDay.temperature = Math.round(forecast.thirdDay.temperature / lengths.thirdDayLength);

    forecast.fourthDay.humidity = Math.round(forecast.fourthDay.humidity / lengths.fourthDayLength);
    forecast.fourthDay.wind = Math.round(forecast.fourthDay.wind /= lengths.fourthDayLength);
    forecast.fourthDay.temperature = Math.round(forecast.fourthDay.temperature /= lengths.fourthDayLength);

    forecast.fifthDay.humidity = Math.round(forecast.fifthDay.humidity / lengths.fifthDayLength);
    forecast.fifthDay.wind = Math.round(forecast.fifthDay.wind /= lengths.fifthDayLength);
    forecast.fifthDay.temperature = Math.round(forecast.fifthDay.temperature / lengths.fifthDayLength);

    forecast.sixthDay.humidity = Math.round(forecast.sixthDay.humidity / lengths.sixthDayLength);
    forecast.sixthDay.wind = Math.round(forecast.sixthDay.wind /= lengths.sixthDayLength);
    forecast.sixthDay.temperature = Math.round(forecast.sixthDay.temperature /= lengths.sixthDayLength);

    displayWeather();

}

function displayWeather(){

    userCity = userCity.charAt(0).toUpperCase() + userCity.slice(1);
    displayCity.text(userCity + " " + dayjs().format("MMM/DD/YYYY"));

    todayTemp.text("Temp: " + forecast.today.temperature + "°F");
    todayWind.text("Wind: " +forecast.today.wind + " MPH");    
    todayHumid.text("Humidity: " +forecast.today.humidity + "%");

    displayTomorrowDate.text(dayjs().add(1, "day").format("MMM/DD/YYYY"));
    tomorrowTemp.text("Temp: " + forecast.tomorrow.temperature + "°F");
    tomorrowWind.text("Wind: " + forecast.tomorrow.wind + " MPH");
    tomorrowHumid.text("Humidity: " + forecast.tomorrow.humidity + "%");

    displayThirdDate.text(dayjs().add(2, "day").format("MMM/DD/YYYY"));
    thirdDayTemp.text("Temp: " + forecast.thirdDay.temperature + "°F");
    thirdDayWind.text("Wind: " + forecast.thirdDay.wind + " MPH");
    thirdDayHumid.text("Humidity: " + forecast.thirdDay.humidity + "%");

    displayFourthDate.text(dayjs().add(3, "day").format("MMM/DD/YYYY"));
    fourthDayTemp.text("Temp: " + forecast.fourthDay.temperature + "°F");
    fourthDayWind.text("Wind: " + forecast.fourthDay.wind + " MPH");
    fourthDayHumid.text("Humidity: " + forecast.fourthDay.humidity + "%");

    displayFifthDate.text(dayjs().add(4, "day").format("MMM/DD/YYYY"));
    fifthDayTemp.text("Temp: " + forecast.fifthDay.temperature + "°F");
    fifthDayWind.text("Wind: " + forecast.fifthDay.wind + " MPH");
    fifthDayHumid.text("Humidity: " + forecast.fifthDay.humidity + "%");

    displaySixthDate.text(dayjs().add(5, "day").format("MMM/DD/YYYY"));
    sixthDayTemp.text("Temp: " + forecast.sixthDay.temperature + "°F");
    sixthDayWind.text("Wind: " + forecast.sixthDay.wind + " MPH");
    sixthDayHumid.text("Humidity: " + forecast.sixthDay.humidity + "%");


}