/* 
Challenge: Create task router

    1. Create new file the create/exports new router
    2. Move all the task routes over
    3. Load in an use that router with express app
    4. Test your work
*/

const Task = require('../models/tasks');
const auth = require('../middleware/auth');

const express = require('express');
const taskRouter = new express.Router();



/************************************************
Challenge: Setup the task creation endpoint

    1. Create a separate file for the task model (load it into index.js)
    2. Create the task creation endpoint (handle success and error)
    3. Test the endpoint from insomnia with good and bad data
*/

/************************************************
Challenge: Refactor task routes to use await/async

    1. Refactor task routes to use await/async
    2. Test all routes in insomnia

taskRouter.post('/users', (req, res) => {

const task = new Task(req.body);

task.save().then(() => {

    return res.status(201).send(task);
}).catch((error) => {
    return res.status(400).send(error);

});
});
*/
taskRouter.post('/tasks', auth, async (req, res) => {

    // const task = new Task(req.body);

    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        return res.status(201).send(task);

    } catch (error) {
        return res.status(400).send(error);

    }
});

/************************************************
Challenge: Setup the task reading endpoint

    1. Create an endpoint for fetching all tasks
    2. Create an endpoint for fetching a task by its id
    3. Setup new requests in insomnia and test your work
    
Challenge: Refactor GET/tasks
   
    1. Add authentication
    2. Return tasks only for the authenticated user
    3. Test your work! 

    taskRouter.get('/tasks', async (req, res) => {
        try {
            const tasks = await Task.find();
            if (!tasks) {
                return res.status(404).send('There is no Tasks');
            }
            
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(500).send(error);
        }
    });
*/

/* 
Challenge: Setup support for skip

   1. Setup "skip" option
      - Parse query value to integer
    2. Fire off some requests to test it's working
      - Fetch the 1st page of 2 and then 3rd page of 2
      - Fetch the 1st page of 3 and then 3rd page of 3
*/
// GET /tasks?completed=true
// GET /task?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc (:asc)
taskRouter.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');

        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;

    }
    if (req.query.completed) {
        match.completed = req.query.completed === 'true';

    }

    try {
        // const tasks = await Task.find({ owner: req.user._id });

        // if (!tasks) {
        //     return res.status(404).send('There is no Tasks');
        // }
        // return res.status(200).send(tasks);

        // await req.user.populate('tasks');

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: !req.query.limit ? 0 : parseInt(req.query.limit),
                skip: !req.query.skip ? 0 : parseInt(req.query.skip),
                // sort: {
                //     // createdAt: 1  // descending: -1 | ascending: 1
                //     completed: 1
                // }
                sort
            }
        });



        return res.status(200).send(req.user.tasks);


    } catch (error) {
        return res.status(500).send(error);
    }
});

/* 
taskRouter.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not Found');

        }

        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).send(error);

    }
});
*/

taskRouter.get('/tasks/:id', auth, async (req, res) => {
    try {

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            return res.status(404).send('Task not Found');

        }

        return res.status(200).send(task);
    } catch (error) {
        return res.status(500).send(error);

    }
});


/* 
Challenge: Allow for task updates

1. Setup the route handler
2. Send error if unknown updates
3. Attempt to update the task
    - Handle task not found
    - Handle validation errors
    - Handle success
4. Test your work!
*/


/* 
Challenge: Change how tasks are updated

    1. Find the task
    2. Alter the task properties
    3. Save the task
    4. Test your work by updating a task from insomnia
*/

taskRouter.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        /* For using mongoose 'save' middleware
         const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
             new: true,
             isValidOperation: true
         });
        */

        // const task = await Task.findById(req.params.id);

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send('Task not found!');
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save()

        return res.status(200).send(task);
    } catch (error) {
        return res.status(400).send(error);

    }

});


/* 
Challenge: Allow for removal tasks

    1. Setup the endpoint handler
    2. Attempt to delete the task by id
        - Handle success
        - Handle task not found
        - Handle error
    3. Test your work

Challenge: Refactor DELETE/tasks/:id
    1. Add authentication 
    2. Find the task by _id/owner (findOneAndDelete)
    3. Test your work!

taskRouter.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);


        if (!task) {
            return res.status(404).send('Task not found!');
        }

        return res.status(200).send(task);

    } catch (error) {
        return res.status(400).send(error);

    }
});
*/

taskRouter.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });


        if (!task) {
            return res.status(404).send('Task not found!');
        }

        return res.status(200).send(task);

    } catch (error) {
        return res.status(400).send(error);

    }
});

module.exports = taskRouter;