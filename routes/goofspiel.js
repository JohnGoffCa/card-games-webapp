const initGoofData = require('../helpers/initGoofDatabase');
const express = require('express');
const router  = express.Router();

global.goofObj = {};

module.exports = (knex) => {
  router.get('/:id', (req, res) => {
    res.send(global.goofObj[req.params.id]);
  });

  router.post('/:id', (req, res) => {
    initGoofData(global.goofObj[req.params.id], req.body.player1, req.body.player2);
    res.send(201);
  });

  router.post('/:id/nextturn', (req, res) => {
    const currObj = global.goofObj[req.params.id];
    if (currObj) {
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
