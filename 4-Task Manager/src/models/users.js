const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Task = require('../models/tasks');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
},
    // Working with Timestamps
    {

        timestamps: true
    });

/**************************************************
 SetUp Virtual Property
- A virtual property is not actual data store in the database.
- It's a relationship between two entities.
*/

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});


/************************************************* 
 * Adding custom method for instance and individual document
*/

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });

    await user.save()

    return token;

}

userSchema.methods.getPublicProfile = function () {
    const user = this;

    const userObject = user.toObject();

    // delete operator to delete object stuffs 
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

/*  Working with Json data's property
// res.send always send JSON data  
*/
// .toJSON matches exactly
userSchema.methods.toJSON = function () {
    const user = this;

    const userObject = user.toObject();

    // delete operator to delete object stuffs 
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}


/************************************************* 
 * Adding custom method before modeling the schema

    @statics : Object of currently defined statics on this schema.
*/

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

/************************************************* 
 * Adding a middleware before modeling the schema

@pre : doing some thing before users are 'save'
@post : doing some thing after users are 'save'
 */
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();

});

// Delete user tasks when user is removed

userSchema.pre('remove', async function (next) {
    const user = this;

    await Task.deleteMany({ owner: user._id });

    next();
});



const User = mongoose.model('User', userSchema);


module.exports = User;