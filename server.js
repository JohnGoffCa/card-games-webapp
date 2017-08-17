'use strict';

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const sass        = require('node-sass-middleware');
const app         = express();

const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');
const goofspielRoutes = require('./routes/goofspiel');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Mount all resource routes
app.use('/', usersRoutes(knex));
app.use('/api/goofspiel', goofspielRoutes(knex));

// Use cookie-parser to create a simple login mockup
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// GET requests to render pages
app.get('/', (req, res) => {
  if (req.cookies['username']) {
    let templateVars = {
      loggedin: true
    };
    res.render('index', templateVars);
  } else {
    res.redirect('/login');
  }

});

app.get("/login", (req, res) => {
  res.render('login');
});

app.get('/game/goofspiel/:id', (req, res) => {
  // Search game id on db
  res.render('goofspiel');
});

app.get('/profile/:user', (req, res) => {
  // Search username or id on db
  res.render('profile');
});

/*
// POST request to login via cookie parser
app.post('/login', (req, res) => {
  res.cookie('username', req.body.username);
    res.redirect('/');
  });

// Allow user to logout and clear cookie from server
app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
 });
*/

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
