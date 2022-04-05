const add = (a, b) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(a + b);

        }, 2000);
    });
}

/******************************************************
Promise Inside Promise

add(1, 2).then((sum) => {
    console.log(sum);

    // new Promise
    add(sum, 5).then((sum2) => { 

        console.log(sum2);

    }).catch((error) => {

        console.log(error);

    });
}).catch((error) => {
    console.log(error);
});
*/

/******************************************************
Promise Chaining
*/
add(1, 1).then((sum) => {
    console.log(sum);

    // Returns a promise from then callback function .then()
    return add(sum, 4);

}).then((sum2) => {
    console.log(sum2);

}).catch((error) => {
    console.log(error);
});


require('../src/db/mongoose');
const User = require('../src/models/user');

// 6247e17cc51ca2322a6a1183


User.findByIdAndUpdate('6247e17cc51ca2322a6a1183', { age: 1 }).then((user) => {
    console.log(user);

    return User.countDocuments({ age: 1 });

}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});