/* 
Challenge: Use async/await

    1. Create deleteTaskAndCount as an async function
        - Accept id of task to remove
    2. Use await to delete task and count up incomplete tasks
    3. return the count
    4. Call the function and attach then/catch to log results
    5. Test your work
*/


require('../src/db/mongoose');
const Task = require('../src/models/task');

const deleteTaskAndCount = async id => {
    await Task.findByIdAndRemove(id);
    const count = Task.countDocuments({ completed: false });

    return count;
}

deleteTaskAndCount('6247f965a50e13adc7246bdb').then((count) => {
    console.log(count);
}).catch((err) => {
    console.log(err);
})