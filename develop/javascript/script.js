// creating variables for elements
var displayCity = $("#display-name");

var todayTemp = $("#today-temp");
var todayWind = $("#today-wind");
var todayHumid = $("#today-humidity");
var todaySymbol = $("#today-symbol")

var displayTomorrowDate = $("#tomorrow-date")
var tomorrowTemp = $("#tomorrow-temp");
var tomorrowWind = $("#tomorrow-wind");
var tomorrowHumid = $("#tomorrow-humidity");
var tomrorowSymbol = $("#tomorrow-symbol");

var displayThirdDate = $("#thirdDay-date")
var thirdDayTemp = $("#thirdDay-temp");
var thirdDayWind = $("#thirdDay-wind");
var thirdDayHumid = $("#thirdDay-humidity");
var thirdDaySymbol = $("#thirdDay-symbol");

var displayFourthDate = $("#fourth-date")
var fourthDayTemp = $("#fourthDay-temp");
var fourthDayWind = $("#fourthDay-wind");
var fourthDayHumid = $("#fourthDay-humidity");
var fourthDaySymbol = $("#fourthDay-symbol"); 

var displayFifthDate = $("#fifth-date")
var fifthDayTemp = $("#fifthDay-temp");
var fifthDayWind = $("#fifthDay-wind");
var fifthDayHumid = $("#fifthDay-humidity");
var fifthDaySymbol = $("#fifthDay-symbol");

var displaySixthDate = $("#sixth-date")
var sixthDayTemp = $("#sixth-temp");
var sixthDayWind = $("#sixth-wind");
var sixthDayHumid = $("#sixth-humidity");
var sixthDaySymbol = $("#sixthDay-symbol");

var submitBtn = $("#submit");

var recentSearchDiv = $("#recent-search")

var recentSearchOption = $(".recent-search-option");

// will store all of user inputs
var userCity = [];

// the intial input a user does
var cityInput = "";

// lat and long for coordinates
var cityLat = null;
var cityLon = null;

// getting dates for today and for the future five
var todayDate = dayjs().format("YYYY-MM-DD");
var tomorrowDate = dayjs().add(1, "day").format("YYYY-MM-DD");
var thirdDayDate = dayjs().add(2, "day").format("YYYY-MM-DD");
var fourthDayDate = dayjs().add(3, "day").format("YYYY-MM-DD");
var fifthDayDate = dayjs().add(4, "day").format("YYYY-MM-DD");
var sixthDayDate = dayjs().add(5, "day").format("YYYY-MM-DD");

// Will hold all of todays forecast values
var todayWeather = {
    temperature: null,
    wind: null,
    humidity: null,
    symbol: null
}

// will hold the values for the next 5 days
var forecast = {

    tomorrow:{
        temperature: null,
        wind: null,
        humidity: null, 
        symbol: null
    },

    thirdDay:{
        temperature: null,
        wind: null,
        humidity: null,
        symbol: null
    },

    fourthDay:{
        temperature: null,
        wind: null,
        humidity: null,
        symbol: null
    },

    fifthDay:{
        temperature: null,
        wind: null,
        humidity: null,
        symbol: null
    },

    sixthDay:{
        temperature: null,
        wind: null,
        humidity: null,
        symbol: null
    }
};

// Function for when user sumbits a city to search
submitBtn.on("click", function(event){
    // prevent reload
    event.preventDefault()

    // if the input is empty then nothing happens
    if($("#floatingInput-city").val() === ""){
        return;
    };

    // resets the city input each time this function is ran
    cityInput = "";

    // sets the city input value to the value of the input
    cityInput = $("#floatingInput-city").val();
    
    // pushes the input into the array of cities the user has searched
    userCity.push(cityInput);

    // call these functions
    saveWeather();
    addCityToRecentSearch();
    getCoordinates();
})

// Will save the array to local storage
function saveWeather(){
    localStorage.setItem("city", JSON.stringify(userCity));
}

// Function for adding the user input to search history
function addCityToRecentSearch(){

    // Creates a new element for the recent search history for the new user input
    var recentCity = $("<input>");
    recentCity.addClass("btn btn-secondary mb-3 p-3");
    recentCity.attr("type", "button");
    recentCity.attr("id", "new-recent");
    recentCity.val(cityInput.charAt(0).toUpperCase() + cityInput.slice(1)); 
    recentSearchDiv.prepend(recentCity);

    // if there is more then 5 elements in the search history then it will remove them to keep only 5
    var searchChildren = $("#recent-search").children()
    for(var i = 0; i < searchChildren.length; i++){
        if(i > 4){
            searchChildren[i].remove();
        };
    }    
}

// function to get forecast for today
function getTodayWeather(){
    // fetch api
   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=16818c644b4e657d8ccc3aa7a2c735e0`)
   .then(function(response){
        return response.json()
   })
   .then(function(data){
    // saves the data to the object containing all values
    todayWeather.humidity = data.main.humidity;
    todayWeather.temperature = data.main.temp;
    todayWeather.wind = data.wind.speed;

    // saves the code of the icon
    var symbol = data.weather[0].icon;

    // saves the url with the code of the symbol 
    todayWeather.symbol = `https://openweathermap.org/img/wn/${symbol}@2x.png`

    // sets the img src as the new url
    todayImg = $("#today-symbol")
    todayImg.attr("src", todayWeather.symbol);  
    
   })
}

// function to get the 5 day forecast
function getWeatherForecast(){
    // fetch api
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=16818c644b4e657d8ccc3aa7a2c735e0`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        // the lengths will be used to get the average of all data stored
        var lengths = {
            tomorrowLength : null,
            thirdDayLength : null,
            fourthDayLength : null,
            fifthDayLength : null,
            sixthDayLength : null,
        };

        // resets the forecast object so it wont add previous data with new
        forecast = {
        
            tomorrow:{
                temperature: null,
                wind: null,
                humidity: null,
                symbol: null
            },
        
            thirdDay:{
                temperature: null,
                wind: null,
                humidity: null,
                symbol: null
            },
        
            fourthDay:{
                temperature: null,
                wind: null,
                humidity: null,
                symbol: null
            },
        
            fifthDay:{
                temperature: null,
                wind: null,
                humidity: null,
                symbol: null
            },
        
            sixthDay:{
                temperature: null,
                wind: null,
                humidity: null,
                symbol: null
            }
        };
        
        // Runs through the list and will match the date with tomorrow, thirdday, etc
        for(var i = 0; i < data.list.length; i++){
            var allData = data.list[i];
            dataDate = allData.dt_txt.split(" ")[0];

            if(dataDate === tomorrowDate){
                // adds to the length if used and adds the correct data to the variable containing the values
                lengths.tomorrowLength += 1;
                forecast.tomorrow.humidity += allData.main.humidity;
                forecast.tomorrow.wind += allData.wind.speed;
                forecast.tomorrow.temperature += allData.main.temp;
                forecast.tomorrow.symbol = allData.weather[0].icon;
            }
            else if(dataDate === thirdDayDate){
                // adds to the length if used and adds the correct data to the variable containing the values
                lengths.thirdDayLength += 1;
                forecast.thirdDay.humidity += allData.main.humidity;
                forecast.thirdDay.wind += allData.wind.speed;
                forecast.thirdDay.temperature += allData.main.temp;
                forecast.thirdDay.symbol = allData.weather[0].icon;
            }
            else if(dataDate === fourthDayDate){
                // adds to the length if used and adds the correct data to the variable containing the values
                lengths.fourthDayLength += 1;
                forecast.fourthDay.humidity += allData.main.humidity;
                forecast.fourthDay.wind += allData.wind.speed;
                forecast.fourthDay.temperature += allData.main.temp;
                forecast.fourthDay.symbol = allData.weather[0].icon;
            }
            else if(dataDate === fifthDayDate){
                // adds to the length if used and adds the correct data to the variable containing the values
                lengths.fifthDayLength += 1;
                forecast.fifthDay.humidity += allData.main.humidity;
                forecast.fifthDay.wind += allData.wind.speed;
                forecast.fifthDay.temperature += allData.main.temp;
                forecast.fifthDay.symbol = allData.weather[0].icon;
            }
            else if(dataDate === sixthDayDate){
                // adds to the length if used and adds the correct data to the variable containing the values
                lengths.sixthDayLength += 1;
                forecast.sixthDay.humidity += allData.main.humidity;
                forecast.sixthDay.wind += allData.wind.speed;
                forecast.sixthDay.temperature += allData.main.temp;
                forecast.sixthDay.symbol = allData.weather[0].icon;
            }
        }
        getAverage(lengths);
    })
    
}

// function to get the lat and lon for the city the user inputed
function getCoordinates(){
    // fetch api
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=66806939c1861a2ad06cc249d1a3a086`)
    .then(function (response){
            return response.json()
        
    })
    .then(function (data){
        // if city cant be found the user will be alerted
        if(data[0] === undefined){
            window.alert("Enter new city name");
            return;
        }

        // sets the lat and long values to the variable
        cityLat = data[0].lat;
        cityLon = data[0].lon;
        
        // call these functions
        getTodayWeather();
        getWeatherForecast();
    })
    
}

// function to get the average of temp, wind and humidity for the day
function getAverage(lengths){

    // will add all values and then divided by how many values were added together and then rounded
    forecast.tomorrow.humidity = Math.round(forecast.tomorrow.humidity / lengths.tomorrowLength);
    forecast.tomorrow.wind = Math.round(forecast.tomorrow.wind / lengths.tomorrowLength);
    forecast.tomorrow.temperature = Math.round(forecast.tomorrow.temperature / lengths.tomorrowLength);

    // will add all values and then divided by how many values were added together and then rounded
    forecast.thirdDay.humidity = Math.round(forecast.thirdDay.humidity / lengths.thirdDayLength);
    forecast.thirdDay.wind = Math.round(forecast.thirdDay.wind / lengths.thirdDayLength);
    forecast.thirdDay.temperature = Math.round(forecast.thirdDay.temperature / lengths.thirdDayLength);

    // will add all values and then divided by how many values were added together and then rounded
    forecast.fourthDay.humidity = Math.round(forecast.fourthDay.humidity / lengths.fourthDayLength);
    forecast.fourthDay.wind = Math.round(forecast.fourthDay.wind /= lengths.fourthDayLength);
    forecast.fourthDay.temperature = Math.round(forecast.fourthDay.temperature /= lengths.fourthDayLength);

    // will add all values and then divided by how many values were added together and then rounded
    forecast.fifthDay.humidity = Math.round(forecast.fifthDay.humidity / lengths.fifthDayLength);
    forecast.fifthDay.wind = Math.round(forecast.fifthDay.wind /= lengths.fifthDayLength);
    forecast.fifthDay.temperature = Math.round(forecast.fifthDay.temperature / lengths.fifthDayLength);

    // will add all values and then divided by how many values were added together and then rounded
    forecast.sixthDay.humidity = Math.round(forecast.sixthDay.humidity / lengths.sixthDayLength);
    forecast.sixthDay.wind = Math.round(forecast.sixthDay.wind /= lengths.sixthDayLength);
    forecast.sixthDay.temperature = Math.round(forecast.sixthDay.temperature /= lengths.sixthDayLength);

    displayWeather();

}

// functon to display weather
function displayWeather(){

    // make sure the first letter is capitalized
    cityInput = cityInput.charAt(0).toUpperCase() + cityInput.slice(1);

    // format for how the city and date will be displayed for current day
    displayCity.text(cityInput + " " + dayjs().format("MMM/DD/YYYY"));

    // Adds the text for displaying the temp, humidity and wind
    todayTemp.text("Temp: " + todayWeather.temperature + "°F");
    todayWind.text("Wind: " +todayWeather.wind + " MPH");    
    todayHumid.text("Humidity: " +todayWeather.humidity + "%");

    // format for how the date will be formatted
    displayTomorrowDate.text(dayjs().add(1, "day").format("MMM/DD/YYYY"));

    // Adds the text for displaying the temp, humidity and wind and also adds the source for icon
    tomorrowTemp.text("Temp: " + forecast.tomorrow.temperature + "°F");
    tomorrowWind.text("Wind: " + forecast.tomorrow.wind + " MPH");
    tomorrowHumid.text("Humidity: " + forecast.tomorrow.humidity + "%");
    tomrorowSymbol.attr("src", `https://openweathermap.org/img/wn/${forecast.tomorrow.symbol}@2x.png`);

    // format for how the date will be formatted
    displayThirdDate.text(dayjs().add(2, "day").format("MMM/DD/YYYY"));

    // Adds the text for displaying the temp, humidity and wind and also adds the source for icon
    thirdDayTemp.text("Temp: " + forecast.thirdDay.temperature + "°F");
    thirdDayWind.text("Wind: " + forecast.thirdDay.wind + " MPH");
    thirdDayHumid.text("Humidity: " + forecast.thirdDay.humidity + "%");
    thirdDaySymbol.attr("src",  `https://openweathermap.org/img/wn/${forecast.thirdDay.symbol}@2x.png`);

    // format for how the date will be formatted
    displayFourthDate.text(dayjs().add(3, "day").format("MMM/DD/YYYY"));

    // Adds the text for displaying the temp, humidity and wind and also adds the source for icon
    fourthDayTemp.text("Temp: " + forecast.fourthDay.temperature + "°F");
    fourthDayWind.text("Wind: " + forecast.fourthDay.wind + " MPH");
    fourthDayHumid.text("Humidity: " + forecast.fourthDay.humidity + "%");
    fourthDaySymbol.attr("src",  `https://openweathermap.org/img/wn/${forecast.fourthDay.symbol}@2x.png`);

    // format for how the date will be formatted
    displayFifthDate.text(dayjs().add(4, "day").format("MMM/DD/YYYY"));

    // Adds the text for displaying the temp, humidity and wind and also adds the source for icon
    fifthDayTemp.text("Temp: " + forecast.fifthDay.temperature + "°F");
    fifthDayWind.text("Wind: " + forecast.fifthDay.wind + " MPH");
    fifthDayHumid.text("Humidity: " + forecast.fifthDay.humidity + "%");
    fifthDaySymbol.attr("src",  `https://openweathermap.org/img/wn/${forecast.fifthDay.symbol}@2x.png`);

    // format for how the date will be formatted
    displaySixthDate.text(dayjs().add(5, "day").format("MMM/DD/YYYY"));

    // Adds the text for displaying the temp, humidity and wind and also adds the source for icon
    sixthDayTemp.text("Temp: " + forecast.sixthDay.temperature + "°F");
    sixthDayWind.text("Wind: " + forecast.sixthDay.wind + " MPH");
    sixthDayHumid.text("Humidity: " + forecast.sixthDay.humidity + "%");
    sixthDaySymbol.attr("src",  `https://openweathermap.org/img/wn/${forecast.sixthDay.symbol}@2x.png`);

}

// function for displaying recent searches based on local storage when page is loaded
function recentSearch(){

    // checking to see if local storage is empty 
    if(userCity !== null){

        // will cycle through the local storage and create an element for each value to get displayed on recent search
        for(var i = 0; i < userCity.length; i++){
            var recentCity = $("<input>");
            recentCity.addClass("btn btn-secondary mb-3 p-3");
            recentCity.attr("type", "button");
            recentCity.attr("id", "new-recent");
            recentCity.val(userCity[i].charAt(0).toUpperCase() + userCity[i].slice(1)); 
            recentSearchDiv.prepend(recentCity);
            }
            
        }
    
    // getting length of the recent searches
    var searchChildren = $("#recent-search").children()
    searchLength = searchChildren.length; 

    // if the recent searches has over 5 elements then the latest ones will be removed
    for(var i = 0; i < searchLength; i++){
        if(i > 4){
            searchChildren[i].remove();
        };
    }

}

// if one of the default recent searches are clicked the functions to get that citys forecast will start
recentSearchOption.on("click", function(event){
    cityInput = "";
    cityInput = event.target.value;
    getCoordinates();
})

// if one of the new recent searches that are from local storage are clicked then the functions to get that citys forecast will start
$(document).on("click", "#new-recent", function(event){
    cityInput = "";
    cityInput = event.target.value;
    getCoordinates();
})

// function when page loads
function init(){
    // get the values from local storage
    var savedCity = JSON.parse(localStorage.getItem("city"));

    // if empty nothing happens
    if(savedCity === null){
        return
    }else{
        // if not the saved citys will be pushed to the array of all user inputs and the function to load the recent searches will be called
        userCity = savedCity;
        recentSearch()
    }
}

// call function when page loads
init();