const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
});


/*************************************************
Challenge: Add a password field to User

    1. Setup the field as a required string
    2. Ensure the lenth is greater than 6
    3. Trim the password
    4. Ensure that password doesn't contain "password"
    5. Test your work!
*/
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');

            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(' Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {  // custom validation
            if (value < 0) {
                throw new Error('Age must be positive number');
            }
        }
    }
});

/************************************************
 @ Create

// User variable is the constructor function for that model so we use 'new' keyword
const me = new User({
    name: '  Andrew  ',
    email: 'MYEMAIL@MEAD.IO  ',
    password: 'Andrew12',
    age: 27
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log('Error!', error);
});
*/

/************************************************
Challenge: Add validation and sanitization to task

    1. Trim the description and make it required
    2. Make completed optional and default it to false
    3. Test your work with and without errors
*/

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

/************************************************
Challenge: Create a model for tasks

    1. Define the model with description and completed fields
    2. Create a new instance of the model
    3. Save the model to the database
    4. Test your work!
*/

/************************************************
 @ Create
 */
const task = new Task({
    description: '  Eat lunch',
    completed: false
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error)
});
