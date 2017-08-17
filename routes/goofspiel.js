const express = require('express');
const router  = express.Router();
const shuffle = require('../helpers/shuffle');

const goofObj = {};

module.exports = (knex) => {
  router.get('/:id', (req, res) => {
    res.send(goofObj[req.params.id]);
  });

  router.post('/:id', (req, res) => {
    goofObj[req.params.id] = {
      //player1: req.body.username,
      // access global variable for now
      player1: playersReady.goofspiel.player1,
      p1Won: [],
      //player2: req.body.username,
      //same as above
      player2: playersReady.goofspiel.player2,
      p2Won: [],
      p1Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      p2Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      prizes: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
      turn: 0,
    };
    res.send(201);
  });

  router.post('/:id/nextturn', (req, res) => {
    const currObj = goofObj[req.params.id];
    if (currObj) {
      if (currObj.turn === 0)
        currObj.turn = 1;
      else
        currObj.turn = 0;

      if (req.body.username === currObj.player1)
        currObj.p1LastPlayed = req.body.played;
      else
        currObj.p2LastPlayed = req.body.played;

      if (currObj.p2LastPlayed && currObj.p1LastPlayed) {
        if (currObj.p1LastPlayed > currObj.p2LastPlayed) {
          currObj.p1Won.push(currObj.prizes.shift());
        } else if (currObj.p1LastPlayed < currObj.p2LastPlayed) {
          currObj.p2Won.push(currObj.prizes.shift());
        } else {
          currObj.prizes.shift();
        }
      }

      res.send(201);
    } else {
      res.status(403).send('no game by that id yet exists');
    }
  });

  return router;
};

// on the front end i get an entire object when i do ajax post
// so i just have to read this.p1Hand
