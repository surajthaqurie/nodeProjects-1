// callback 
const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error!', undefined);

        callback(undefined, [1, 4, 7]);
    }, 2000);
}

doWorkCallback((error, result) => {

    if (error) {
        return console.log(error);
    }

    console.log(result);
});

// Promise 

//
//                                     fulfilled
//
//                                     /          
//                                  
// Promise (created) -- pending   -->
//                              
//                                    \
//
//                                    rejected       
//

const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([1, 4, 7]);
        reject('This is my error!');
        resolve([1, 2, 3]); // This is ignored
        reject('This is my error 2!'); // This is also ignored
    }, 2000);
});


doWorkPromise.then((result) => {
    console.log('Success!', result);

}).catch((error) => {
    console.log('Error!', error);
});