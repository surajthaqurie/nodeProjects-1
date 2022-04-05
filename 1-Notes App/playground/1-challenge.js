/* 
Challenge: Work with JSON and the file system

    1. Load and parse the JSON data
    2. Change the name and age property using your info
    3. Stringify the changed object and overwrite the original data
    4. Test your wok by viewing data in the JSON file
*/

const fs = require('fs');

const dataBuffer = fs.readFileSync('1-challenge.json');
const dataJSON = dataBuffer.toString();

// console.log(dataJSON);

const user = JSON.parse(dataJSON);

user.name = 'Suraj';
user.age = '26';

// console.log(user);

const changedJSON = JSON.stringify(user);
fs.writeFileSync('1-challenge.json', changedJSON);
