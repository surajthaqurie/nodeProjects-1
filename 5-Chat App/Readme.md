### Real-Time Web Application with Socket.io (Chat App)

**Web Sockets**

- Allow for full-duplex communication
- A separate protocol from HTTP
- Persistent connection between client and server

#### Socket.io

- io.on('connection'): Open the connection in server and it has 'socket' object as parameter that contains information about new connection

- io(): initialize the connection in client.

- socket.emit(): To communicate, send event and data from server to client and vice versa to a particular (single) connection.

- io.emit(): This going to emit the event to every single connection that's currently available.

- socket.broadcast.emit(): When we broadcast an event, we send it to everybody except the current client.

- socket.on(): Receive the event and data from server to client and vice versa

- socket.on('disconnect'): Listen when client is disconnected.

- socket.join():

  - only use on the server, this is going specific room that we pass to it the name of the room we're trying to join

- io.to().emit(): It emits an event to everyone in a specific room without send it to people in other rooms.

- socket.broadcast.to().emit(): Sending an event to everyone except for the specific client, but it's limiting it to a specific chat room

---

**Sharing Location**

- Geolocation API

`navigator.geolocation.getCurrentPosition((position)=>{}`

```
server (emit) -> client (receive) - eventName
client (emit) -> server (receive) - eventName

Acknowledgment:
server (emit) -> client (receive) --acknowledgment --> server
client (emit -> server (receive) --acknowledgment --> server
```
