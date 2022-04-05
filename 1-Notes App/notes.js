const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes.....';
}


const addNote = (title, body) => {
    const notes = loadNotes();

    // const duplicateNotes = notes.filter(note => note.title === title);
    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title;
    // });

    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote || duplicateNote === undefined) {
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);
        console.log(chalk.green.bold.inverse('New note Added!'));

    } else {
        console.log(chalk.red.bold.inverse('Note title already taken!'));

    }
}

/* 
Challenge: Wire up removeNote

    1. Load existing notes
    2. Use array filter method to remove the matching note (if any)
    3. Save the newly created array
    4. Test your work with a title that exists and a title that doesn't exist
*/
const removeNote = title => {
    const notes = loadNotes();

    const notesToKeep = notes.filter(note => note.title != title);

    /* 
    Challenge: Use chalk to provide useful logs for remove
    
        1. If a note is removed, print "Note removed!" with green background
        2. if no note is removed, print "No note found!" with a red background
    */

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.bold.inverse('Note removed!'));

    } else {
        console.log(chalk.red.bold.inverse('No note found!'));

    }
}
/* 
Goal: Wire up list command

    1. Create and export listNotes from notes.js
        - "Yours notes" using chalk
        - Print note title for each note
    2. Call listNotes from command handler
    3. Test your work!
*/

const listNotes = () => {
    const notes = loadNotes();


    console.log(chalk.inverse('Your notes'));

    notes.forEach(note => {
        console.log(note.title);
    });
}


/* 
Goal: Wire up read command

    1. Setup --title option for read command
    2. Create readNote in notes.js
        - Search for note by title
        - Find note and print title (styled) and body (plain)
        - No note found? Print error in red.
    3. Have the command handler call the function
    4. Test your work by running couple commands

*/
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);


    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}


const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);

    fs.writeFileSync('notes.json', dataJSON);
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};