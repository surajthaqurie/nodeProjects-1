/******************************************************
@ async: 
- async function always return a promise.

@ await:
- The await operator can only be used in async functions

The whole point of async await is to make it easier to work with asynchronous promise based code.


const doWork = async () => {
    // throw new Error('Some went wrong!');
    return 'Andrew';
}

doWork().then((result) => {
    console.log('result', result);
}).catch((err) => {
    console.log('error', err);
});

// console.log(doWork()); returns promise based value
*/



/******************************************************
 Promise Example
 */
const add = (a, b) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative');
            }
            resolve(a + b);

        }, 2000);
    });
}

// Async-Await
const doWorkAsync = async () => {
    const sum = await add(1, 99);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, 3);

    return sum3;
}

doWorkAsync().then((result) => {
    console.log('result', result);
}).catch((err) => {
    console.log('error', err);
});



require('../src/db/mongoose');
const User = require("../src/models/user");

const updateAgeAndCount = async (id, age) => {

    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });

    return count;
}

updateAgeAndCount('6247e186c51ca2322a6a1185', 2).then((count) => {
    console.log(count);
}).catch((err) => {
    console.log(err);
})