const random = require('../helpers/random');
const request = require('request');
const express = require('express');
const router  = express.Router();

//global.playersReady = {};
let playersReady = {};

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
      //POST to api endpoint to create in memory object
      request({
        url: `/api/goofspiel/${playersReady.goofspiel.url}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        json: playersReady.goofspiel,
      }, (err, res, body) => {
        if (err)
          console.log(err);

        if (res && (res.statusCode === 200 || res.statusCode === 201)) {
          console.log(body);
        }
      });

      //add playersReady to gamesession and redirect to /game/goofspiel/:url
      res.redirect(`/game/goofspiel/${playersReady.goofspiel.url}`)
      playersReady = {};
    }
  });

  return router;
};
