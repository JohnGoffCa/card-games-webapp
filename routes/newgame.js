const express = require('express');
const router  = express.Router();
const random = require('../helpers/random');

const playersReady = {};

module.exports = () => {
  
  router.get('/', (req, res) => {
    res.render('newgame');
  });

  router.post('/', (req, res) => {
    if (!playersReady.goofspiel) {
      playersReady.goofspiel = {
        player1: req.cookies.username,
        player2: null,
        url: random(),
        ready: false,
      };
    } else {
      playersReady.goofspiel.player2 = req.cookies.username;

      //add playersReady to gamesession and redirect to /game/goofspiel/:url
      //POST to api endpoint to create in memory object
    }
  });

  return router;
};
