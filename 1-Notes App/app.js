/******************************************************** 
Importing Node.js Core Modules
*/

const fs = require('fs');

fs.writeFileSync('notes.txt', 'My name is thakuri Suraj.');

// /* 
// Challenge: Append a message to notes.txt

//     1. Use appendFileSync to append to the file
//     2. Run the script
//     3. Check your work by opening the file and viewing the append text 
// */

// fs.appendFileSync('notes.txt', ' I live in Kathmandu Nepal');


/******************************************************** 
Importing Your Own Modules
*/
const add = require('./utils');

const sum = add(2, -2);
console.log(sum);

/* 
Challenge: Define and use a function in a new file

    1. Create a new file called notes.js
    2. Create getNotes function that returns "Your notes..."
    3. Export getNotes function
    4. From app.js, load in and call the function printing message to console
*/

const { getNotes } = require('./notes');
const yourNotes = getNotes();
console.log(yourNotes);

/******************************************************** 
Importing NPM Modules
*/

const validator = require('validator');

console.log(validator.isEmail('andrew@example.com'));
console.log(validator.isURL('https://mead.io'));

/* 
Challenge: Use the Chalk library in your project

    1. Install version 2.4.1 of chalk
    2. Load chalk into app.js
    3. Use it to print the string "Success!" to the console in green
    4. Test your work

Bonus: Use docs to mess around with other styles. Make text bold and inversed.
*/

const chalk = require('chalk');

console.log(chalk.green('Success!'));

console.log(chalk.yellow.bold.inverse('Error!'));


/******************************************************** 
Getting input from Command line
@ argv: argument vector is just an array that contains all of the argument provided
@ First argument is path to the node executable on your machine
@ Second argument is the path to our app file
@ Third is the value actually we provided
*/

// console.log(process.argv);

// console.log(process.argv[2]);    

const yargs = require('yargs');
const notes = require('./notes');

// const command = process.argv[2];

// if (command === 'add') {
//     console.log('Adding note!')
// } else if (command === 'remove') {
//     console.log('Removing note!')
// }

// Customize yargs version
yargs.version('1.1.0');


/* 
Challenge: Add Add an option to yargs

    1. Setup a body option for the add command
    2. Configure a description, make it required, and for it to be a string
    3. Log the body value in the handler function
    4. Test your work
*/


// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        // console.log('Adding a new note!', argv);
        // console.log('Title: ' + argv.title);
        // console.log('Body: ' + argv.body);

        notes.addNote(argv.title, argv.body);

    }
});

/* 
Challenge: Setup command option and function

    1. Setup the remove command to take a required "--title" option
    2. Create and export a removeNote function from note.js
    3. Call removeNote in remove command handler
    4. Have removeNote log the title of the note to be removed
    5. Test your work using: node app.js remove --title="some title"
*/

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },

    },
    handler(argv) {
        // console.log('Removing the note!');
        notes.removeNote(argv.title);
    }
});

/* 
Challenge: Add two new commands

    1. Setup command to support "list" command (print placeholder message for now)
    2. Setup command to support "read" command (print placeholder message for now)
    3. Test your work by running both commands and ensure correct output
    4. Test your work
*/

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },

    },
    handler(argv) {
        // console.log('Reading a note!');
        notes.readNote(argv.title);
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        // console.log('Listing out all notes!');
        notes.listNotes();
    }
});


// console.log(yargs.argv);
yargs.parse();

