const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

// const {
//     sendWelcomeEmail,
//     sendCancellationEmail
// } = require('../helpers/emailSender');

const userRouter = new express.Router();

const User = require('../models/users');
const auth = require('../middleware/auth');


/*
 userRouter.post('/users', (req, res) => {

    const user = new User(req.body);

    user.save().then(() => {

        return res.status(201).send(user);
    }).catch((error) => {
        return res.status(400).send(error);

    });
});
*/

/* 
Challenge: Have signup send back auth token

    1. Generate a token for the saved user
    2. Send back both the token and the user
    3. Create a new user from insomnia and confirm the token is there
*/
userRouter.post('/users', async (req, res) => {

    const user = new User(req.body);
    try {
        await user.save();
        // sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken();

        return res.status(201).send({ user, token });
        // return res.status(201).send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

userRouter.get('/users', auth, async (req, res) => {

    try {
        const users = await User.find({});
        return res.status(200).send(users);

    } catch (error) {
        return res.status(500).send(error);

    }

});

userRouter.get('/users/me', auth, async (req, res) => {

    return res.send(req.user);

});

/* 
userRouter.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found!');

        }
        return res.status(200).send(user);

    } catch (error) {
        return res.status(500).send(error);

    }
}); 
*/

/* 
userRouter.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        // For using mongoose 'save' middleware
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,      // returns updated user
        //     runValidators: true  // runs db validator 
        // });
        //

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send('User not found!');
        }

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        return res.status(200).send(user);
    } catch (error) {

        return res.status(400).send(error);

    }

});
*/

/* 
Challenge: Refactor the update profile route

1. Update the URL to /users/me
2. Add the authentication middleware into the mix
3. Use the existing user document instead of fetching via param id
4. Test your work in Insomnia

*/

userRouter.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        // For using mongoose 'save' middleware
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,      // returns updated user
        //     runValidators: true  // runs db validator 
        // });
        //

        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();

        return res.status(200).send(req.user);
    } catch (error) {

        return res.status(400).send(error);

    }

});

/* 
userRouter.delete('/users/:id', async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send('User not found!');
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error);

    }
});
*/

userRouter.delete('/users/me', auth, async (req, res) => {
    try {

        /*
         const user = await User.findByIdAndDelete(req.user._id);
         if (!user) {
             return res.status(404).send('User not found!');
         }
         */

        await req.user.remove();
        // sendCancellationEmail(req.user.email,req.user.name);
        return res.status(200).send(req.user);

    } catch (error) {
        return res.status(500).send(error);

    }
});

userRouter.post('/users/login', async (req, res) => {

    try {

        // findByCredentials: custom options(method) in user model
        const user = await User.findByCredentials(req.body.email, req.body.password);

        if (!user) {
            return res.status(404).send('User not found!');

        }
        const token = await user.generateAuthToken();

        // return res.status(200).send({ user: user.getPublicProfile(), token });
        return res.status(200).send({ user, token });

    } catch (error) {
        return res.status(400).send(error);

    }

});


userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.status(200).send();

    } catch (error) {
        return res.status(500).send(error);

    }
});

/* 
Challenge: Create a way to logout of all sessions

    1. Setup Post /users/logoutAll
    2. Create the route handler to wipe the tokens array
        - Send 200 or 500
    3. Test your work
*/

userRouter.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.status(200).send();

    } catch (error) {
        return res.status(500).send(error);

    }
});

/* 
Challenge: Setup endpoint for avatar upload
     
    1. Add POST /users/me/avatar to user router
    2. Setup multer to store uploads in an avatars directory
    3. Choose name "avatar" for the key when registering the middleware
    4. Send back a 200 response from route handler
    5. Test your work. Create new Task App request and upload image

Challenge: Add Validation to avatar upload route

    1. Limit the upload size to 1mb
    2. Only allow jpg, jpeg, png
    3. Test your work!
        - Upload larger files (should fail)
        - Upload non-image (should fail)

*/

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }

        return cb(undefined, true);
    }
});

/* 
Challenge: Clean up error handling

    1. Setup an error handler function
    2. Send back 400 with error message
    3. Test your work
*/

userRouter.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {


    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

    req.user.avatar = buffer;

    await req.user.save();
    res.status(200).send();
},
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    });

/* 
Challenge: Setup route to delete avatar
    1. Setup DELETE /users/me/avatar
    2. Add authentication
    3. Set the field to undefined and save the user sending back a 200
    4. Test your work by creating new request for Task app in insomnia
*/

userRouter.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = '';

        await req.user.save();

        res.status(200).send()
    } catch (error) {
        return res.status(500).send(error);
    }

});


userRouter.get('/users/:id/avatar', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {

            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);

    } catch (error) {
        return res.status(404).send(error);

    }
});

module.exports = userRouter;