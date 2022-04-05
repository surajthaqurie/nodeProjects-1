const {
    calculateTip,
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    add
} = require('../playground/10-test');


/************************************
 Synchronous Testing
*/
test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3);

    // if (total !== 13) {
    //     throw new Error('Total tip should be 13. Got ' + total);
    // }

    expect(total).toBe(13);

});

test('Should calculate total with default tip', () => {
    const total = calculateTip(10);

    expect(total).toBe(12.5)
});

test('Should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius(32);

    expect(temp).toBe(0);
});

test('Should convert 0 C to 32 F', () => {
    const temp = celsiusToFahrenheit(0);

    expect(temp).toBe(32);
});


/************************************
 Asynchronous Testing
 
 done parameter
 - see that and it won't consider this test case a success or
   a failure until done is called done().

async/await function
*/

test('Async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1);
        done();
    }, 2000);

});


test('Should add two numbers promise based', (done) => {

    add(2, 3).then((sum) => {
        expect(sum).toBe(5);

        done();
    });

});

test('Should add two numbers async/await', async () => {
    const sum = await add(10, 22);

    expect(sum).toBe(32);
});

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks