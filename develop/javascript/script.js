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

var recentSearchOption = $(".recent-search-option");

var userCity = [];

var cityInput = "";

var cityLat = null;
var cityLon = null;

var todayDate = dayjs().format("YYYY-MM-DD");
var tomorrowDate = dayjs().add(1, "day").format("YYYY-MM-DD");
var thirdDayDate = dayjs().add(2, "day").format("YYYY-MM-DD");
var fourthDayDate = dayjs().add(3, "day").format("YYYY-MM-DD");
var fifthDayDate = dayjs().add(4, "day").format("YYYY-MM-DD");
var sixthDayDate = dayjs().add(5, "day").format("YYYY-MM-DD");

var recentSearchDiv = $("#recent-search")

var todayWeather = {
    temperature: null,
    wind: null,
    humidity: null
}

var forecast = {

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
    if($("#floatingInput-city").val() === ""){
        return;
    };
    cityInput = "";
    cityInput = $("#floatingInput-city").val();
    

    getCoordinates();
})

function saveWeather(){
    localStorage.setItem("city", JSON.stringify(userCity));
}

function addCityToRecentSearch(){
    userCity.push(cityInput)

    var recentCity = $("<input>");
    recentCity.addClass("btn btn-primary mb-3 p-3");
    recentCity.attr("type", "button");
    recentCity.attr("id", "new-recent");
    recentCity.val(cityInput.charAt(0).toUpperCase() + cityInput.slice(1)); 
    recentSearchDiv.prepend(recentCity);

    var searchChildren = $("#recent-search").children()
    for(var i = 0; i < searchChildren.length; i++){
        if(i > 4){
            searchChildren[i].remove();
        };
    }
}

function getTodayWeather(){
   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=16818c644b4e657d8ccc3aa7a2c735e0`)
   .then(function(response){
        return response.json()
   })
   .then(function(data){
    console.log(data);

    
    todayWeather.humidity = data.main.humidity;
    todayWeather.temperature = data.main.temp;
    todayWeather.wind = data.wind.speed;
   })
}


function getWeatherForecast(){
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=16818c644b4e657d8ccc3aa7a2c735e0`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        var lengths = {
            tomorrowLength : null,
            thirdDayLength : null,
            fourthDayLength : null,
            fifthDayLength : null,
            sixthDayLength : null,
        };

        forecast = {
        
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
        
        for(var i = 0; i < data.list.length; i++){
            var allData = data.list[i];
            dataDate = allData.dt_txt.split(" ")[0];

            if(dataDate === tomorrowDate){
                lengths.tomorrowLength += 1;
                forecast.tomorrow.humidity += allData.main.humidity;
                forecast.tomorrow.wind += allData.wind.speed;
                forecast.tomorrow.temperature += allData.main.temp;
            }
            else if(dataDate === thirdDayDate){
                lengths.thirdDayLength += 1;
                forecast.thirdDay.humidity += allData.main.humidity;
                forecast.thirdDay.wind += allData.wind.speed;
                forecast.thirdDay.temperature += allData.main.temp;
            }
            else if(dataDate === fourthDayDate){
                lengths.fourthDayLength += 1;
                forecast.fourthDay.humidity += allData.main.humidity;
                forecast.fourthDay.wind += allData.wind.speed;
                forecast.fourthDay.temperature += allData.main.temp;
            }
            else if(dataDate === fifthDayDate){
                lengths.fifthDayLength += 1;
                forecast.fifthDay.humidity += allData.main.humidity;
                forecast.fifthDay.wind += allData.wind.speed;
                forecast.fifthDay.temperature += allData.main.temp;
            }
            else if(dataDate === sixthDayDate){
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
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=66806939c1861a2ad06cc249d1a3a086`)
    .then(function (response){
            return response.json()
        
    })
    .then(function (data){
        if(data[0] === undefined){
            window.alert("Enter new city name");
            return;
        }
        cityLat = data[0].lat;
        cityLon = data[0].lon;
        addCityToRecentSearch();
        saveWeather();
        getTodayWeather();
        getWeatherForecast();
    })
    
}


function getAverage(lengths){

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

    cityInput = cityInput.charAt(0).toUpperCase() + cityInput.slice(1);
    displayCity.text(cityInput + " " + dayjs().format("MMM/DD/YYYY"));

    todayTemp.text("Temp: " + todayWeather.temperature + "°F");
    todayWind.text("Wind: " +todayWeather.wind + " MPH");    
    todayHumid.text("Humidity: " +todayWeather.humidity + "%");

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

function recentSearch(){

    if(userCity !== null){
        for(var i = 0; i < userCity.length; i++){
            var recentCity = $("<input>");
            recentCity.addClass("btn btn-primary mb-3 p-3");
            recentCity.attr("type", "button");
            recentCity.attr("id", "new-recent");
            recentCity.val(userCity[i].charAt(0).toUpperCase() + userCity[i].slice(1)); 
            recentSearchDiv.prepend(recentCity);
            }
            
        }
    
    var searchChildren = $("#recent-search").children()
    searchLength = searchChildren.length; 

    for(var i = 0; i < searchLength; i++){
        if(i > 4){
            searchChildren[i].remove();
        };
    }

}

recentSearchOption.on("click", function(event){
    cityInput = "";
    cityInput = event.target.value;
    console.log(event.target);
    console.log(event.target.value);
    getCoordinates();
})

$(document).on("click", "#new-recent", function(event){
    cityInput = "";
    cityInput = event.target.value;
    console.log(event.target);
    console.log(event.target.value);
    getCoordinates();
})


function init(){
    var savedCity = JSON.parse(localStorage.getItem("city"));
    if(savedCity === null){
        return
    }else{
        userCity = savedCity;
        recentSearch()
    }
}

init();