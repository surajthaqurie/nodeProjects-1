const request = require('supertest');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');

const app = require('../src/app');
const User = require('../src/models/users');

const { userOne, userOneId, setUpDatabase } = require('./fixtures/db');

/*  Jest lifecycle
beforeEach(() => {
    console.log('beforeEach');
});

afterEach(() => {
    console.log('afterEach');
}) 
*/
/* 
const userOneId = new mongoose.Types.ObjectId();

// consistent set of data for our tests to work for (eg. login user)
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
} */

// beforeEach(async () => {
//     await User.deleteMany();
//     await new User(userOne).save();
// });

beforeEach(setUpDatabase);


/* 
test('Should sing up a new user', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Andrew',
            email: 'andrew@example.com',
            password: '12345678'
        }).expect(201);
});
*/

// Advance Assertions
test('Should sing up a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Andrew',
            email: 'andrew@example.com',
            password: '12345678'
        }).expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assert about the response
    expect(response.body.user.name).toBe('Andrew');
    expect(response.body).toMatchObject({
        user: {
            name: 'Andrew',
            email: 'andrew@example.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('12345678');

});

/* 
Challenge: Validate new token is saved

    1. Fetch the user from the database
    2. Assert that token in response matches users second token
    3. Test your work!

    test('Should login existing user', async () => {
        await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200);
    });
*/
test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assert about the response
    expect(response.body.token).toBe(user.tokens[1].token);
});
/* 
Challenge: Test login failure

1. Create "Should not login nonexistent user"
2. Send off the request with bad credentials
3. Expect the correct status response
4. Test your work!
*/

test('Should not login nonexistent user', async () => {
    await request(app)
        .post('/user/login')
        .send({
            email: userOne.email,
            password: 'thisisnotmypass'
        }).expect(404);
});


/***************************************** 
End points with authentication
*/

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});


test('Should not get profile for unauthorized user', async () => {
    await request(app)
        .get('/users/me')
        // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401);
});

/* 
Challenge: Test delete account

    1. Create "Should delete account for user"
        - Setup auth header and expect correct status code
    2. Create "Should not delete account for unauthorized user"
        - Expect correct status code
    3. Test your work!
    
    test('Should delete account for user', async () => {
        await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    });

Challenge: Validate user is removed

    1. Fetch the user from the database
    2. Assert null response (use assertion from signup test)
    3. Test your work!
*/

test('Should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();

});

test('Should not delete account for unauthorized user', async () => {
    await request(app)
        .delete('/users/me')
        // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(401);
});

/************************************
Send file using a supertest

- Fixtures - In testing world, it is a things that allow you to set up the environment
- attach('form field','path of file')
*/


test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')  // form filed, path to the file
        .expect(200);

    const user = await User.findById(userOneId);
    // expect({}).toBe({}); // failed: toBe() uses ===
    // toEqual() looks for property of object and comparison those
    // expect.any() checks for type
    expect(user.avatar).toEqual(expect.any(Buffer));
});

/* 
Challenge: Test user update

    1. Create "Should update valid user fields"
        - Update the name of test user
        - Check the data to confirm it's changed
    2. Create "Should not update invalid user fields"
        - Update a "location" filed and expect error status code
    3. Test your work
*/

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Jess'
        })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Jess');
});

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Philadelphia'
        })
        .expect(400);
});

