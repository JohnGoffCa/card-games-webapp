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
      res.render('newgame');
    } else {
      res.redirect('/login');
    }
  });

  router.post('/goofspiel', (req, res) => {
    if (!playersReady.goofspiel) {
      playersReady.goofspiel = {
        player1: req.cookies.username,
        player2: null,
        url: random(),
      };

      console.log("player1 is ready", playersReady);
      
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`);

    } else if (playersReady.goofspiel.player1 === req.cookies.username) {
      console.log("you are already player1")
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`);
      return;

    } else {
      playersReady.goofspiel.player2 = req.cookies.username;
      console.log("who is player2?", playersReady);
      //connect to api endpoint to create in memory object
      initGoofData(playersReady.goofspiel.url, playersReady.goofspiel.player1, playersReady.goofspiel.player2);

      //add playersReady to gamesession and redirect to /game/goofspiel/:url
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`)
      playersReady = {};
    }
  });

  return router;
};
