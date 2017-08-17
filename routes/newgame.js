const express = require('express');
const router  = express.Router();
const random = require('../helpers/random');

//const playersReady = {};
global.playersReady = {};

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
      console.log("player1 is ready", playersReady);
      // let searching = setInterval(() => {
        
      // }, 1000)
    } else if (playersReady.goofspiel.player1 === req.cookies.username) {
        console.log("you are already player1")
        return;
    } else {
      playersReady.goofspiel.player2 = req.cookies.username;
      console.log("who is player2?", playersReady);
      //add playersReady to gamesession and redirect to /game/goofspiel/:url
      //POST to api endpoint to create in memory object
      res.redirect(`/api/goofspiel/${playersReady.goofspiel.url}`)
      playersReady = {};
    }
  });

  return router;
};