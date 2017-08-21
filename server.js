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
const apiRoutes = require('./routes/api');
const newgameRoutes = require('./routes/newgame');
const gameRoutes = require('./routes/game');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
//app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json())

app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Mount all resource routes
app.use('/', usersRoutes(knex));
app.use('/api', apiRoutes(knex));
app.use('/newgame', newgameRoutes());
app.use('/game', gameRoutes());

// Use cookie-parser to create a simple login mockup
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// GET requests to render pages
app.get('/', (req, res) => {
  if (req.cookies['username']) {
    let templateVars = {
      userId: req.cookies.user_id,
      username: req.cookies.username
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
  let templateVars = {
    userId: req.cookies.user_id,
    username: req.cookies.username
  };
  res.render('goofspiel', templateVars);
});

// Allow user to logout and clear cookie from server (should move to userroute)
app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("user_id");
  res.redirect("/");
 });

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
