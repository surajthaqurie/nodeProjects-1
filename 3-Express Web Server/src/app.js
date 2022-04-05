const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

/*
@ __dirname: it provide the path of directory where file lives in
@ __filename: it provide the path of the file itself.

console.log(__dirname); // /home/thakuri/Documents/.courses/6-node/1-nodeCourse/3-web-server/src
console.log(__filename); // /home/thakuri/Documents/.courses/6-node/1-nodeCourse/3-web-server/src/app.js
*/

/* 
@ Path: Node core module
console.log(__dirname); // /home/thakuri/Documents/.courses/6-node/1-nodeCourse/3-web-server/src
console.log(path.join(__dirname, '../public')); // /home/thakuri/Documents/.courses/6-node/1-nodeCourse/3-web-server/public
 */
const app = express();


//*************Define paths for Express config ****************/
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


//*************Setup handlebars engine and views location ****************/
app.set('views', viewsPath);
//      key and value : imp: by default template always in "views" folder
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);


//*************Setup static directory to serve ****************/
app.use(express.static(path.join(__dirname, '../public')));

// app.com
// app.com/help
// app.com/about

/* 
app.get('', (req, res) => {
     // res.send('Hello Express');
    res.send('<h1>Weather</h1>');  // Send HTML
// });

app.get('/help', (req, res) => {
    // res.send({
    //     name: 'Andrew',
    //     age: 27
    // });  // Send JSON

    res.send([{
        name: 'Andrew'
    }, {
        name: 'Sarah'
    }]); // Send Array JSON
});

 */
/* 
Challenge: Setup two new routes

    1. Setup an about route and render a page title
    2. Setup a weather route and render a page title
    3. Test your work by visiting both in the browser
*/

/* 
Challenge: Update routes
    1. Setup about route to render a title with HTML
    2. Setup a weather route to send back JSON
        - Object with forecast and location string
    3. Test Your work by visiting both in the browser
*/

/* 
Challenge: Create two more HTML files

    1. Create a html page for about with "About" title
    2. Create a html page for help with "Help" title
    3. Remove the old route handler for both
    4. Visit both in the browser to test your work
*/

/* 
app.get('/about', (req, res) => {
    // res.send('About Page');
    res.send('<h1>About Page</h1>');
});
*/


/***************************************** 
 @ Routes Accessing handlebars page
*/
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Mead'
    });
});


/* 
Challenge: Create a template for help page

    1. Setup a help template to render message to the screen
    2. Setup the help route and render the template with an example
    3. Visit the route in the browser and see your help message print
*/
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    });
});


/* 
Challenge: Create a partial for the footer

    1. Setup the template for the footer partial "Created by Some Name"
    2. Render the partial at the bottom of all three pages
    3. Test your work by visiting all three page
*/


/* 
Challenge: Create a render a 404 page with handlebars

    1. Setup the template to render the header and footer
    2. Setup the template to render an error message in a paragraph
    3. Render the template for both 404 routes
        - Page not found.
        - Help article not found
    4. Test your work. Visit  /what and help/units
*/

/***************************************** 
Query String
*/

/* 
Challenge: Update weather endpoint to accept address

    1. No address? Send back an error message
    2. Address? Send back the static JSON
        - Add address property onto JSON which returns the provide address
        - Help article not found
    3. Test /weather and weather?address=philadelphia
*/

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        });
    }
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'philadelphia',
    //     address: req.query.address
    // });

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });

});

/* 
Challenge: Wire up /weather

    1. Require geocode/forecast into app.js
    2. Use the address to geocode
    3. Use the coordinates to get forecast
    4. Send back the real forecast and location
*/

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});


app.get('/help/*', (req, res) => {
    // res.send('Help article not found');
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    });
});

// 404 page
app.get('*', (req, res) => {
    // res.send('404 page');
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}!`)
});