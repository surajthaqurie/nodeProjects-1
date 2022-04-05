
require('../src/db/mongoose');
const Task = require('../src/models/tasks');
const User = require('../src/models/users');


const main = async () => {
    // const task = await Task.findById('6249298e9c03ecab0025617c');
    // await task.populate('owner');
    // console.log(task.owner);

    // for virtual filed in schema [eg: model/users]
    const user = await User.findById('624929779c03ecab00256177');
    await user.populate('tasks');
    console.log(user.tasks);
}

main();