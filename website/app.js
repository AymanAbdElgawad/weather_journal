
/* Global Variables */
console.log("Starting weather app...");
console.log("Initialization  the Global Variables...");

// Personal API Key for OpenWeatherMap API
const apiKey = '007f4ddbecacb96384a56840672bb2ec';
//   OpenWeatherMap API URL
const APIurl = 'https://api.openweathermap.org/data/2.5/weather?';
// input elment city  data
const cityDataElement = document.getElementById('cityData');
// server url router all
const server = 'http://127.0.0.1:8080/all';
// For temperature units its "imperial" (Fahrenheit) by default ,the user can chaenge it to "metric" (celsius) or "standard" (kelvin).
var units = 'imperial';
// type of city data is zip by default user can chaeng it to city name or city id
var cityby = 'zip';
// Create a new date instance dynamically with JS
var date = new Date().toDateString();
var time = new Date().toLocaleTimeString();

/* Helper functions */
console.log("Declaration the functions...");

//helper arrow functions to build completed Url to API 
const citydata = (citydata) => `${cityby}=${citydata.trim().replace(/\s+/g, '%20')}`;
const openweathermapUrl = (citydata) => {
  console.log("building full API Url... ");
  return `${APIurl}${citydata}&appid=${apiKey}&units=${units}`;

};



// helper arrow function using fetch, chain Promises  make a GET request to get data from api :
const getDataFromoOpenWeatherMap = url => fetch(url)
  .then(response => {
     console.log('Respons  :', response);
     console.log('checking respons status..');
    console.log("status  :", response.status, response.statusText);

   console.log("get json data from respons...")
    return response.json();
  })
  .then(json => {
    console.log('Json data :', json);
         return new Promise((resolve, reject) => {
    if (json.cod == 200) {
     let projectData = setingDataInProjectOpject(json);
    console.log('project data', projectData);
      resolve(projectData)
    }
    else {
      reject(json)
    }
  });
  }).catch(err=>{console.log("error", err.message);
return new Promise((resolve, reject) => {
  reject(err)
})
});


// helper async function using fetch (async , await) make a POST request to send data to server :
async function sendDataToServer(url = '', data = {}) {
  console.log('sending data to server:');
  console.log('setting option...');
  let options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data)
  }
  console.log('sending...');
  const response = await fetch(url, options);
  console.log("status  :", response.status, response.statusText);
  console.log("get json data from respons...")
  const objectData = await response.json();
  console.log("respons:", objectData);
  console.log("you can get the data from this URL:", url);
  return objectData;
}

// arrow function return oject projectData
const setingDataInProjectOpject = data => {
  console.log('Geting slictions data from json data and user input... ',
    'Seting data in new opject(projectData) ... ');
  return {
    city: data.name,
    country: data.sys.country,
    date,
    feeling: document.getElementById('feelings').value,
    visibility: data.visibility,
    weather: data.weather[0],
    temperature: {
      temp: data.main.temp,
      unit: units == 'imperial' ? 'Fahrenheit' : (units == 'metric' ? 'Celsius' : 'Kelvin')
    }
  };
};


// function to viwe error message in GUI 
function viweError(error) {
  console.log('viwe error message :', error.message);
  document.getElementById('error').innerText = `Error : ${error.message} !`;
  document.getElementById('error').style.opacity = "1";
  setTimeout(() => {
    document.getElementById('error').style.opacity = "0";
  }, 3000);
}

// function to viwe weather data in GUI
function viweData(data) {
  console.log('viwe weather data..');
  document.getElementById('city_name').innerHTML=`${data.city} ${data.country}`;
  document.getElementById('feeling').innerHTML=data.feeling;
  document.getElementById('visibility').firstElementChild.innerHTML=data.visibility/1000;
  document.getElementById('temp').firstElementChild.innerHTML=Math.round( data.temperature.temp);
  document.getElementById('tempUnits').innerHTML=data.temperature.unit[0];
  document.getElementById('main').innerHTML=data.weather.main;
  document.getElementById('description').innerHTML=data.weather.description;
  document.getElementById('icon').src=`http://openweathermap.org/img/w/${data.weather.icon}.png`;
  
} 


/* main functions */
//callback fuction with chain Promises to generate data 
function generate() {
  console.clear();
  console.log('start generate function...');
  let API = openweathermapUrl(citydata(cityDataElement.value));
  console.log("Sending request to the OpenWeatherMap API ...");
  getDataFromoOpenWeatherMap(API)
    .then(date => sendDataToServer(server, date))
    .then(viweData)
    .catch(viweError)
    .finally((f)=>{console.log('End generate function')});

}
//get data using user position function  (latitude And longitude) 
function generateByPosition (){ new Promise((resolve, reject) => {
  console.clear();
  console.log('get data using user position function :');
  console.log('chacking if Geolocation supported by user browser...')
      if(navigator.geolocation){
        console.log('asking user to access position..');
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position :",position);
      
  let API = openweathermapUrl( `lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
  console.log("Sending request to the OpenWeatherMap API ...");
      resolve(API);
  },
     (err) => { 
        reject(err);
     })
   } 
    else {reject({message:"Geolocation is not supported by your browser"});}})
    .then( getDataFromoOpenWeatherMap)
    .then(date => sendDataToServer(server, date))
    .then(viweData)
   .catch(viweError);
  }
// by cett function the user can send request using city name or city id and of cours city ZIP
function chaengModeCity(event) {
  cityby = event.target.value;
  if (cityby == 'q') {
    cityDataElement.type = 'text';
    cityDataElement.placeholder = "enter city name here";
  }
  else {
    cityDataElement.type = 'number';
    cityDataElement.placeholder = `enter city ${cityby} here`;
  }
  console.log('geocode mode changed :',cityby);
}

//function to change temperature mode (f,C,K)
function chaengModeTemperture(event) {
  units = event.target.value; console.log('temperature mode changed :',units); }


 //function to show time and date
function showTimeAndDate() {
  
    date = new Date().toDateString();
    time = new Date().toLocaleTimeString();
    document.getElementById("Date").innerText = date;
    document.getElementById("Time").innerText = time;
  
  
}

/* setup eventlisteners */
console.log('setup eventlisteners...');

document.getElementById('generate').addEventListener('click', generate);

document.getElementById('position').addEventListener('click', generateByPosition);

document.getElementById('cityCode').addEventListener('change',chaengModeCity);

document.getElementById('temperature').addEventListener('change',chaengModeTemperture)

//set interval function to show time and date
console.log('set interval to show time ...');
setInterval(showTimeAndDate, 1000);

console.log('setup complited:')
