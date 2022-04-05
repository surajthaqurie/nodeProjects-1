/******************************************************** 
Storing data with JSON and Reading JSON data as Object
@ JSON.stringify(): convert objected data into JSON data
@ JSON.parse(): convert JSON data into objected data
@ fs.writeFileSync('1-json.json', bookJSON);
@ fs.writeFileSync('1-json.json', bookJSON); : it returns binary data
@ toString(): convert binary buffer data into string
*/

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }
// // JSON.stringify(): convert js objected data into JSON data
// const bookJSON = JSON.stringify(book);
// console.log(bookJSON);
// // console.log(bookJSON.author);  // ERROR: not an object

// // JSON.parse(): convert JSON data into js objected data
// const parseData = JSON.parse(bookJSON);
// console.log(parseData);
// console.log(parseData.author);


const fs = require('fs');

// fs.writeFileSync('1-json.json', bookJSON);

const dataBuffer = fs.readFileSync('1-json.json'); 
// console.log(dataBuffer); // it returns binary data

const dataJSON = dataBuffer.toString();
// console.log(dataJSON); // it returns JSON data

const data = JSON.parse(dataJSON);
console.log(data); // it returns Object data
console.log(data.title); // it returns Object data

