const users = [];

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {

    // Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the data

    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    });

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room };
    users.push(user);

    return { user };

}


const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

addUser({
    id: 22,
    username: 'Andrew',
    room: 'South Philly'
});


addUser({
    id: 42,
    username: 'Mike',
    room: 'South Philly'
});

addUser({
    id: 32,
    username: 'Andrew',
    room: 'Center City'
});


/* 
Challenge: Create two new function for users

    1. Create getUser
        - Accept id and return user object (or undefined)
    2. Create getUserInRoom
        - Accept room name and return  array  of users (or empty array)
    3. Test your work by calling the functions!
*/

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

// const user = getUser(421);
// console.log(user);

const getUserInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room);
}

// const userList = getUserInRoom('South Philly')
// console.log(userList);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}