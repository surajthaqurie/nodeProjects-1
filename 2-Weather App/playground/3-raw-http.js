/********************************************** 
@ HTTP Request Without a Library
*/


const http = require('http');
const url = `http://api.weatherstack.com/current?access_key=b878cfc3d51a56681565866acd4fde4f&query=40,-75,&units=f`;

const request = http.request(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        // console.log(chunk.toString());

        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', (err) => {
    console.log('An Error', err);
});

request.end();