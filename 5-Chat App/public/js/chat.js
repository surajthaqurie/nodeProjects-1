/**********Count Demo****************** 
// io(); //  initialize the connection in client

// The return value from the IO function that needs to be stored in a variable
// This is going to allow us to send events and receive events from both the server and the client
const socket = io();


// Receive the event that server is sending us.
// 'countUpdate': event name must be matches exactly as server send
// count: server data
socket.on('countUpdate', (count) => {
    console.log('The count has been updated! ', count);
});

document.querySelector('#increment').addEventListener('click', () => {
    // console.log('clicked');

    // sending event to server
    socket.emit('increment');
});
*/

const socket = io();


// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
const $sidebar = document.querySelector('#sidebar');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

// Auto Scrolling
const autoscroll = () => {

    // New message element
    const $newMessage = $messages.lastElementChild;

    // Height of the new message
    const newMessageStyle = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyle.marginBottom);

    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    // Visible Height
    const visibleHeight = $messages.offsetHeight;

    // Height of messages container
    const containerHeight = $messages.scrollHeight;

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight;
    }
};

socket.on('message', (message) => {
    // console.log(message);

    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    $messages.insertAdjacentHTML('beforeend', html);

    autoscroll();
});


/* 
Challenge: Create a separate event for location sharing messages

    1. Have server emit "locationMessage" with the URL
    2. Have the client listen for "locationMessage" and print the URL to console
    3. Test your work by sharing a location!

Challenge: Render new template for location message

    1. Duplicate the message template
        - Change the id to something else
    2. Add a link inside the paragraph with the link text "My current location"
        - URL for link should be the maps URL (dynamic) 
    3. Select the template  from javascript
    4. Render the template with URL and append to message list
    5. Test your work!

Challenge: Add timestamps for location messages

    1. Create generateLocationMessage and export 
        - {url: '', createdAt}
    2. Use generatedLocationMessage when server emits locationMessage
    3. Update template to render time before the url
    4. Compile the template with the URL and the formatted time
    5. Test your work!
*/

socket.on('locationMessage', (message) => {
    // console.log(message);
    const html = Mustache.render(locationTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    });

    $messages.insertAdjacentHTML('beforeend', html);

    autoscroll();

});


socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    });

    $sidebar.innerHTML = html;
});

/* 
Challenge: Allow to send message

    1. Create a form with input and button
        - Similar to the weather form
    2 Setup event listener for form submissions
        - Emit "sendMessage" with input string as message data
    3. Have server listen for sendMessage
        - Send message to all connected clients
    4. Test your work!
*/


$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // disable button
    $messageFormButton.setAttribute('disabled', 'disabled');

    // const message = document.querySelector('input').value;
    const message = e.target.elements.message.value;
    /**********************************
     Acknowledgment 
        
     // server (emit) -> client (receive) --acknowledgment --> server
     // client (emit -> server (receive) --acknowledgment --> server
     */


    // client send Acknowledgment to server 
    socket.emit('sendMessage', message, (error) => {

        // enable button input refresh
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (error) {
            return console.log(error);
        }

        console.log('Message delivered!');

    });
});


$locationButton.addEventListener('click', () => {

    $locationButton.setAttribute('disabled', 'disabled');

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    /* 
    Challenge: Share coordinates with other users

        1. Have client emit "sendLocation" with an object as the data
            - Object should contain latitude and longitude properties
        2. Server should listen for "sendLocation"
            - When fired, send a "message" to all connected clients "Location: log, lat"
        3. Test your work!
    */
    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $locationButton.removeAttribute('disabled');

            console.log('Location Shared!');
        });

    });

});
/* 
Challenge: Setup acknowledgment

    1. Setup the client acknowledgment
    2. Setup the server to send back the acknowledgment
    3. Have the client print "Location Shared!" when acknowledged
    4. Test your work!

Challenge: Disable the same location button while location being sent

    1. Set up selector at the top of the file
    2. Disable the button just before getting the current position
    3. Enable the button in the acknowledgment callback
    4. Test your work!
*/


socket.emit('join', { username, room }, (error) => {

    if (error) {
        alert(error);
        location.href = '/'
    }
});