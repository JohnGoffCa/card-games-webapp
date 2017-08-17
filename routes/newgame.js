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
      //add playersReady to gamesession and redirect to /game/goofspiel/:id
    }
  });

  return router;
};
