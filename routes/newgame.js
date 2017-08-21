const random = require('../helpers/random');
const init = require('../helpers/initGameDatabase');
const express = require('express');
const router  = express.Router();

let playersReady = {};

module.exports = () => {

  router.get('/', (req, res) => {
    if (req.cookies['username']) {
      let templateVars = {
        userId: req.cookies.user_id,
        username: req.cookies.username,
      };
      res.render('newgame', templateVars);
    } else {
      res.redirect('/login');
    }
  });

  router.post('/goofspiel', (req, res) => {
    if (!playersReady.goofspiel) {
      playersReady.goofspiel = {
        player1: req.cookies.user_id,
        player1Username: req.cookies.username,
        player2: null,
        player2Username: null,
        url: random(),
      };

      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`);

    } else if (playersReady.goofspiel.player1 === req.cookies.user_id) {
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`);
    } else {
      playersReady.goofspiel.player2 = req.cookies.user_id;
      playersReady.goofspiel.player2Username = req.cookies.username;
      //connect to api endpoint to create in memory object
      init.goofData(playersReady.goofspiel.url, playersReady.goofspiel.player1, playersReady.goofspiel.player2, playersReady.goofspiel.player1Username, playersReady.goofspiel.player2Username);

      //add playersReady to gamesession and redirect to /game/goofspiel/:url
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`)
      playersReady.goofspiel = null;
    }
  });

  router.post('/blackjack', (req, res) => {
    if (!playersReady.blackjack) {
      playersReady.blackjack = {
        player1: req.cookies.user_id,
        player2: null,
        url: random(),
      };

      res.redirect(`/game/blackjack/${playersReady.blackjack.url}`);

    } else if (playersReady.blackjack.player1 === req.cookies.username) {
      res.redirect(`/game/blackjack/${playersReady.blackjack.url}`);
      return;

    } else {
      playersReady.blackjack.player2 = req.cookies.user_id;
      //connect to api endpoint to create in memory object
      init.jackData(playersReady.blackjack.url, playersReady.blackjack.player1, playersReady.blackjack.player2);

      //add playersReady to gamesession and redirect to /game/blackjack/:url
      res.redirect(`/game/blackjack/${playersReady.blackjack.url}`)
      playersReady.blackjack = null;
    }
  });

  return router;
};
