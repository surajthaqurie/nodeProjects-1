
/************************************** 
 Express middleware
 
- next() to allow the associated root handler to run, otherwise it always loading

// Without middleware: new request -> run route handler

 // With middleware:    new request -> do something -> run route handler
*/

app.use((req, res, next) => {
    // console.log(req.method, req.path);

    // next();
    if (req.method === 'GET') {
        res.send('GET request are disable');
    } else {
        next();
    }
});


/* 
Challenge: Setup middleware for maintenance code

    1. Register a new middleware function
    2. Send back a maintenance message with a 503 status code
    3. Try your request from the server and confirm status/message shows
*/

app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Check back soon');
});