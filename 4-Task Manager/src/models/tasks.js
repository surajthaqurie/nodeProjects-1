
const mongoose = require('mongoose');

/************************************************
Challenge: Add validation and sanitization to task

    1. Trim the description and make it required
    2. Make completed optional and default it to false
    3. Test your work with and without errors

Challenge: Refactor task model to add stamps
     1. Explicitly create schema
     2. Setup timestamps
     3. Create tasks from insomnia to test work
*/

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User', // module name
    }
}, {
    timestamps: true
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;