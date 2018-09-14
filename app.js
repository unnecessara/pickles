const express = require('express');
//const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

const {getHomePage, addPickle, getRandomPickle, editPicklePage} = require('./routes/routes');

const port = 5000;

// Create connection to database
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'sara',
    password: 'sara',
    port: 8889,
    database: 'pickles'
});

// Connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder


// Routes
app.get('/', getHomePage);
app.post('/', addPickle);
app.get('/random', getRandomPickle);
app.get('/:id', editPicklePage);
app.post('/:id', addPickle);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
