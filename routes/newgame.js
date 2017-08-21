const random = require('../helpers/random');
const initGoofData = require('../helpers/initGoofDatabase');
const request = require('request');
const express = require('express');
const router  = express.Router();

//global.playersReady = {};
let playersReady = {};

module.exports = () => {

  router.get('/', (req, res) => {
    if (req.cookies['username']) {
      let templateVars = {
        username: req.cookies.username
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

      console.log("player1 is ready", playersReady);
      
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`);

    } else if (playersReady.goofspiel.player1 === req.cookies.user_id) {
      console.log("you are already player1")
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`);
      return;

    } else {
      playersReady.goofspiel.player2 = req.cookies.user_id;
      playersReady.goofspiel.player2Username = req.cookies.username;
      console.log("who is player2?", playersReady);
      //connect to api endpoint to create in memory object
      initGoofData(playersReady.goofspiel.url, playersReady.goofspiel.player1, playersReady.goofspiel.player2, playersReady.goofspiel.player1Username, playersReady.goofspiel.player2Username);

      //add playersReady to gamesession and redirect to /game/goofspiel/:url
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`)
      playersReady = {};
    }
  });

  return router;
};
