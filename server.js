// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes


const express =require('express');



// Start up an instance of app
const app=express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const  cors=require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
//send data to clint
app.get('/all',(req,res)=>res.status(200).send(projectData));
//get data from clint
const postdata=(req,res)=>{
    projectData=req.body;
    console.log('project data has updated the new data is',projectData);
    res.status(200).send(projectData);
};
app.post('/all',postdata);
// Setup Server
const port=8080;
const hostName='127.0.0.1';
const listening=()=>console.log( `server running at : http://${hostName}:${port}`);
app.listen(port , listening );


