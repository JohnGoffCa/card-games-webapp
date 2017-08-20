const init = require('../helpers/initGameDatabase');
const blackjack = require('../helpers/blackjack');
const express = require('express');
const router  = express.Router();

global.goofObj = {};
global.jackObj = {};

module.exports = () => {
  ////////////////////////////////////
  /** Start of Goofspiel API routes */
  ////////////////////////////////////
  router.get('/goofspiel/:id', (req, res) => {
    res.send(global.goofObj[req.params.id]);
  });

  router.post('/goofspiel/:id', (req, res) => {
    init.goofData(global.goofObj[req.params.id], req.body.player1, req.body.player2);
    res.sendStatus(201);
  });

  router.post('/goofspiel/:id/nextturn', (req, res) => {
    const currObj = global.goofObj[req.params.id];
    if (currObj) {
      if (req.body.username === currObj.player1) {
        currObj.p1LastPlayed = req.body.played;
        currObj.p1Sent = true;
        let index = currObj.p1Hand.indexOf(parseInt(req.body.played, 10));
        currObj.p1Hand.splice(index, 1);
      } else if (req.body.username === currObj.player2) {
        currObj.p2LastPlayed = req.body.played;
        currObj.p2Sent = true;
        let index = currObj.p2Hand.indexOf(parseInt(req.body.played, 10));
        currObj.p2Hand.splice(index, 1);
      }

      if (currObj.p2Sent && currObj.p1Sent) {
        if (currObj.p1LastPlayed > currObj.p2LastPlayed) {
          currObj.p1Won.push(currObj.prizes.shift());
        } else if (currObj.p1LastPlayed < currObj.p2LastPlayed) {
          currObj.p2Won.push(currObj.prizes.shift());
        } else {
          currObj.prizes.shift();
        }
        currObj.p1Sent = false;
        currObj.p2Sent = false;

        if (currObj.prizes.length === 0) {
          console.log('gameover!');
          res.send('gameover!');
        }
      }

      res.sendStatus(201);
    } else {
      res.status(403).send('no game by that id yet exists');
    }
  });

  /** End of Goofspiel API routes */

  ////////////////////////////////////
  /** Start of Blackjack API routes */
  ////////////////////////////////////

  router.get('/blackjack/:id', (req, res) => {
    res.send(global.jackObj[req.params.id]);
  });

  router.post('/blackjack/:id', (req, res) => {
    init.jackData(global.jackObj[req.params.id], req.body.player1, req.body.player2);
    res.sendStatus(201);
  });

  router.post('/blackjack/:id/nextturn', (req, res) => {
    const currObj = global.jackObj[req.params.id];
    if (currObj) {
      if (req.body.username === currObj.player1) {

      } else if (req.body.username === currObj.player2) {

      }

      if (currObj.p2Sent && currObj.p1Sent) {

        currObj.p1Sent = false;
        currObj.p2Sent = false;

      }

      res.sendStatus(201);
    } else {
      res.status(403).send('no game by that id yet exists');
    }
  });

  /** End of Blackjack API routes */

  return router;
};
