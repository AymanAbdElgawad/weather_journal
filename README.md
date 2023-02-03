# Weather-Journal App Project

asynchronous web app that uses Web API and user data to dynamically update the UI. 

###### by Ayman AbdElgawad
---
## Table of Contents

  

- [Project Title](#Landing-Page-Project)

- [Table of contents](#table-of-contents)

- [Instructions](#instructions)

- [Projet Files](#Projet-Files)

- [Installation](#Installation)

- [Usage](#usage)

- [Development](#development)

- [Contribute](#contribute)

- [License & Copyright](#License-&-Copyright)
---
## instructions

I've created an asynchronous web app that uses the web API and user data to dynamically update the UI. 
This app displays the weather in the city of the user's choice by zip code, ID or by city name.

[(Back to top)](#table-of-contents)

---
## Projet Files

#### node_modules folder

#### websit /

- style.css

- index.html

- app.js

- img.png

####  package.json

####  server.js

####  README.md



[(Back to top)](#table-of-contents)

---
## Installation
1. Install node js in your computer.
2. Download It as a ZIP File to your PC and UnZip the file.


[(Back to top)](#table-of-contents)


---
## Usage

1. after UnZip the file and open it on any Code Text Editor to viwe the code.
2. open your cdm and change directory 'cd' to project folder .

        cd 
3. run the server
        
        node server.js
4. open this path `http//127.0.0.1:8080` in your browser.

[(Back to top)](#table-of-contents)

---
## development


````node js Version: 8.19.3````

````express Version: 4.18.2````

````body-parser Version: 1.20.1````

````cros version: 2.8.5````

````JS Version: ES2015/ES6.````


````JS Standard: ESlint.````



The project is divided into two sides, the server side and the client side.

### 1- the Server Side
- create var named ```projectData ``` for stor the data that user send in it.
- require express(), and should create an instance of their app using express.
- configuring express to use body-parser and cros moudels.
- Initialize the main project folder and create get and post route ```/all```.
- setup lestin with feedback sohw message in the case server running sucsicfly;
### 2- the Client Side
- In the css file, I rearranged the elements to give them some aesthetic appearances.
- In the html file you have created the necessary elements to enter the necessary data as well as the elements to display the results.
- The majority of the work was done on app.js, there is a lot of things done there:


### global variables
the global variables well use in all the app
1. const variable ``apiKey`` my personal API Key for OpenWeatherMap API.


2. const variable ``APIurl`` The main part of OpenWeatherMap API URL.

3. const variable ``server`` server url router ``all``.

4. const variable ``cityDataElement`` input elment city  data.

5. variable ``units``  For temperature units its ``"imperial"`` (Fahrenheit) by default ,the user can chaenge it to ``"metric"`` (celsius) or ``"standard"`` (kelvin).

6. variable ``cityby`` type of city data is zip by default user can chaenge it to city name or city id.

7. variables ``time`` , ``date`` stor time and date in string.


### Helper Functions
I used the Helper Functions into the main functions

1. ``citydata``,``openweathermapUrl`` 2 Helper arrow functions to build completed Url to API .

2. ``getDataFromoOpenWeatherMap`` helper arrow function using fetch, chain Promises  make a GET request to get data from api .

3. ``sendDataToServer`` helper async function using fetch (async , await) make a POST request to send data to server .
  
4. ``setingDataInProjectOpject`` arrow function with 1 pramter Api data and return oject  cotuin slictions data from Api data and user input.

5. ``viweError`` function to viwe error message in GUI.

6. ``viweData`` function to viwe weather data in GUI.

### main Functions 
the main functions well be used in the eventlisteners

1. ``generate`` callback  fuction with chain Promises to generate data , eventlistener  ``click`` Generate button.

2. ``generateByPosition`` callback  fuction with chain Promises to generate data using user postion (latitude And longitude) , eventlistener  ``click`` Generate by position button.

3. ``chaengModeCity`` by cett function the user can select ``cityBy`` name or city id and of cours city ZIP, eventlistener  ``change`` City Code.
 
4. ``chaengModeTemperture`` function to change temperature mode (f,C,K),   eventlistener  ``change`` City Code.

5. ``showTimeAndDate`` function to show time and date, set interval evrey 1 sacand.

##### note : I have added console messages at all stages of the application to facilitate the process of tracking errors and to understand the code better.






[(Back to top)](#table-of-contents)




---
## Contribute
**- Udacity**

  

**- EgFwd**

  


[(Back to top)](#table-of-contents)



---
## License & Copyright
  

**© Udacity - Modified By Ayman AbdElgawad.**


[(Back to top)](#table-of-contents)