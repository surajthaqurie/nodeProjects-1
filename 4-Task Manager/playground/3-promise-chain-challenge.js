/* 
Challenge: Mess around with promise chaining

    1. Create promise-chain-challenge.js
    2. Load in mongoose and task model
    3. Remove a given task by id
    4. Get and print the total number of incomplete tasks
    5. Test your work!
*/

require('../src/db/mongoose');
const Task = require('../src/models/task');

//6247d5f3a5d373c5b9ba1371

Task.findByIdAndRemove('6247d5f3a5d373c5b9ba1371').then((task) => {
    console.log(task);

    return Task.countDocuments({ completed: false });
}).then((result) => {
    console.log(result);

}).catch((error) => {
    console.log(error);

});