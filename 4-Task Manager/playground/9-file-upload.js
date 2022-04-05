const express = require("express");

const app = express();


const multer = require('multer');

const upload = multer({
    // dest: 'images',  
    limits: {
        fileSize: 1000000 //number in bytes
    },
    fileFilter(req, file, cb) {

        // if (!file.originalname.endsWith('.pdf')) {

        if (!file.originalname.match(/\.(doc|docx)$/)) { // match matches regular expression

            return cb(new Error('Please upload a Word document'));
        }
        cb(undefined, true);

        // cb(undefined, false);
    }
});


// const errorMiddleware = (req, res, next) => {
//     throw new Error('From my middleware');
// }

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
    // Handle Express Errors function
}, (error, req, res, next) => {   // this function is design to handle errors

    res.status(400).send({
        error: error.message
    });

});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT);
});

