/******************************************
 Working with Json data's property
    // res.send always send JSON data  
*/

const pet = {
    name: 'Hal'
}

pet.toJSON = function () {

    console.log(this); // "name":"hal"
    return {};
}
console.log(JSON.stringify(pet));
console.log(pet);  // {}