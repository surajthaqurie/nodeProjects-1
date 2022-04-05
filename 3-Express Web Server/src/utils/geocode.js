
const request = require('postman-request');

const mapBoxAccess_key = 'pk.eyJ1Ijoic3VyYWp0aGFxdXJpZSIsImEiOiJjbDFkcjJsOWIwNnN0M2pwODEzOW5qMHVjIn0.qlH9Xa2KV4Z4orYCS2GvbQ';

const geocode = (address, callback) => {

    // encodeURIComponent : ? becomes %3F
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBoxAccess_key}&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            // console.log('Unable to connect to location services!');

            callback('Unable to connect to location services!', undefined);

        } else if (body.features.length === 0) {

            //   console.log('Unable to find location. Try another search!');
            callback('Unable to find location. Try another search!', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;