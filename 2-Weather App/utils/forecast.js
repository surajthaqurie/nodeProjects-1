const request = require('postman-request');

const weatherAccess_key = 'b878cfc3d51a56681565866acd4fde4f';

/* 

Goal: Create a reusable function for getting the forecast
    1. Setup the "forecast" function in utils/forecast.js
    2. Require the function in app.js and call it as shown below
    3. The forecast function should have three potential calls to callback:
        - Low level error, pass string for error
        - Coordinate error, pass string for error
        - Success, pass forecast string for data (same format as from before)

*/

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// });


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${weatherAccess_key}&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            // console.log('Unable to connect to weather server!');
            callback('Unable to connect to weather server!', undefined);

        } else if (body.error) {
            // console.log('Unable to find Location!');

            callback('Unable to find Location!', undefined);
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain. And It feels like ' + body.current.feelslike + ' degrees out!!');
        }
    });
}


module.exports = forecast;