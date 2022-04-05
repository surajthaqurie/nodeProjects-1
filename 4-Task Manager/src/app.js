const express = require("express");

require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());

app.use(taskRouter);
app.use(userRouter);

/*
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT);
}); 
*/

// Exporting for test

module.exports = app;
