const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const weatherAccess_key = 'b878cfc3d51a56681565866acd4fde4f';
const mapBoxAccess_key = 'pk.eyJ1Ijoic3VyYWp0aGFxdXJpZSIsImEiOiJjbDFkcjJsOWIwNnN0M2pwODEzOW5qMHVjIn0.qlH9Xa2KV4Z4orYCS2GvbQ';

const url = `http://api.weatherstack.com/current?access_key=${weatherAccess_key}&query=37.8267,-122.4233&units=f`;

request({ url: url, json: true }, (error, response, body) => {

    // console.log(error);
    if (error) {
        console.log('Unable to connect to weather server!');
    } else if (body.error) {
        console.log('Unable to find Location!');
    }
    else {
        // console.log(response);
        // console.log(body.current);

        /* 
        Goal: Print a small forecast to the user
        
            1. Print: "It is currently 58.55 degrees out. There is a 0% chance of rain."
            2. Test your work!
        */
        console.log(body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain.');

        /* 
        Goal: Print a small forecast to the user
     
         1. Print: "It is currently 9 degrees out. It feels like 5 degrees out."
         2. Test your work!
     */
        console.log(body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out');
    }

});


/******************************************************
@ Geocoding
@ Address -> Lat/Long -> Weather
*/

/* 
Goal: Print the lat/long for Los Angeles

    1. Fire off a new request to the URL explored in browser
    2. Have the request module parse it as JSON
    3. Print both the latitude and longitude to the terminal
    4. Test your work!
Goal: Handle error for geocoding request

    1. Setup an error handler for low-level errors
    2. Test by disabling network request and running the app
    3. Setup error handling for no matching results
    4. Test by altering the search term and running the app
*/

const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${mapBoxAccess_key}&limit=1`;

request({ url: geocodeURL, json: true }, (error, response, body) => {

    if (error) {
        console.log('Unable to connect to location services!');

    } else if (body.features.length === 0) {
        console.log('Unable to find location. Try another search!');
    }
    else {

        const longitude = body.features[0].center[0];
        const latitude = body.features[0].center[1];
        console.log(latitude, longitude);
    }

});

/*******************************************************
@ Callback function
*/
// console.log(process.argv);
const address = process.argv[2];

if (!address) {
    console.log('Please provide an address');
} else {

    // Default parameter
    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return console.log(error);
        }

        // console.log('Error', error);
        // console.log('Data', data);

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error);
            }
            // console.log('Error', error);
            // console.log('Data', data);

            console.log(location);
            console.log(forecastData);
        });
    });

}
/*
Goal: Create a reusable function for getting the forecast
    1. Setup the "forecast" function in utils/forecast.js
    2. Require the function in app.js and call it as shown below
    3. The forecast function should have three potential calls to callback:
        - Low level error, pass string for error
        - Coordinate error, pass string for error
        - Success, pass forecast string for data (same format as from before)
*/

// forecast(37.8267, -122.4233, (error, data) => {
//     console.log('Error', error);
//     console.log('Data', data);
// });


/* 
Goal: Accept location via command line argument

    1. Access the command line argument without yargs
    2. Use the string value as the input for geocode
    3. Only geocode if a location was provided
    4. Test your work with a couple locations
*/

/* 
Goal: Use both destructing and property shorthand in weather app

    1. Use destructing in app.js forecast.js and geocode.js
    2. Use property shorthand in forecast.js and geocode.js
    3. Test your work and ensure app still works
*/