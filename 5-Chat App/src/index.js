/* 
Challenge: Create an Express web server

    1. Initialize npm and install Express
    2. Setup a new Express server
        - Server up the public directory
        - Listen on port 3000
    3. Create index.html and render "Chat App" to the screen
    4. Test your Work! Start the server and view page in the browser
*/

const path = require('path');
const http = require('http');
const express = require('express');

const socketio = require('socket.io');
const Filter = require('bad-words');

const { generateMessage, generateLocationMessage } = require('./utils/messages');
const {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
} = require('./utils/users');
const app = express();

// Support for web socket 
// Creating the node server, it can use both express and socket IO
// Created server outside of the express library
const server = http.createServer(app);


// Creating a new instance of socket io to configure web sockets to work with our server
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

/**********Count Demo****************** 
let count = 0;

// socket is an object that contains information about new connection
io.on('connection', (socket) => {
    console.log('New web socket connection');

    // send an event to the particular client. 'countUpdate' name of event, count: data
    socket.emit('countUpdate', count);
 
    // listing to client event
    socket.on('increment', () => {
        count++;
        // send the data on 'countUpdate' event to single client
        // socket.emit('countUpdate', count);

        // send the data on 'countUpdate' event to all connected client
        io.emit('countUpdate', count);
    });

});
*/

/* 
Challenge: Send a Welcome message to new user

    1. Have server emit "message" when new client connects
        - Send "Welcome!" as the event data
    2. Have client listen for "message" event and print to console
    3. Test your work!

*/

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    //     socket.emit('message', generateMessage('Welcome!'));
    //     socket.broadcast.emit('message', generateMessage('A new user has joined!'));

    // socket.join() only use on the server, this is going join individual rooms
    // Socket.join() allows us to join any given chat room
    // And we pass to it the name of the room we're trying to join
    socket.on('join', (options, callback) => {

        const { error, user } = addUser({ id: socket.id, ...options });

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('Admin', 'Welcome!'));
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`));


        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUserInRoom(user.room)
        });

        callback();


        // socket.emit, socket.broadcast.emit, io.emit
        // io.to.emit, socket.broadcast.emit

    });

    /* 
    Challenge: Send message to correct room

        1. Use getUser inside "sendMessage" event handler to get user data
        2. Emit the message to their current room
        3. Test your work!
        4. Repeat for "sendLocation"

    Challenge: Render username for text message

        1. Setup the server to send username to client
        2. Edit every call to "generateMessage" to include username
            - Use "Admin" for sts messages like connect/welcome/disconnect
        3. Update client to render username in template
        4. Test your work!
    */

    // Acknowledgment
    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);

        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        // io.emit('message', generateMessage(message));
        io.to(user.room).emit('message', generateMessage(user.username, message));

        // Server send acknowledgment back to server it could also choose to provide some data
        // callback('Delivered!');

        callback();
    });

    socket.on('sendLocation', (coords, callback) => {

        const user = getUser(socket.id);

        // io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {

            // io.emit('message', generateMessage('A user has left!'));
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));

            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUserInRoom(user.room)
            });

        }
    });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is up on ${PORT}!`);
});


/* 
Challenge: Setup scripts in package.json

1. Create a "start" script to start the app using node
2. Install nodemon and a development dependency
3. Create a "dev" script to start the app using nodemon
4. Run both scripts to test your work!
*/

