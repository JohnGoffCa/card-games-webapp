const init = require('../helpers/initGameDatabase');
const blackjack = require('../helpers/blackjack');
const express = require('express');
const router  = express.Router();

global.goofObj = {};
global.jackObj = {};

module.exports = (knex) => {
  ////////////////////////////////////
  /** Start of Goofspiel API routes */
  ////////////////////////////////////
  router.get('/goofspiel/:id', (req, res) => {
    res.send(global.goofObj[req.params.id] || {});
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
        const index = currObj.p1Hand.indexOf(parseInt(req.body.played, 10));
        currObj.p1Hand.splice(index, 1);
      } else if (req.body.username === currObj.player2) {
        currObj.p2LastPlayed = req.body.played;
        currObj.p2Sent = true;
        const index = currObj.p2Hand.indexOf(parseInt(req.body.played, 10));
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

  router.post('/goofspiel/:id/save', (req, res) => {
    knex('gamesessions')
      .insert({ player1_id: req.body.player1,
        player2_id: req.body.player2,
        p1_finalscore: req.body.p1Score,
        p2_finalscore: req.body.p2Score,
        winner_id: req.body.winner,
        gameinfo_id: 1,
      }).then(res => {
          res.status(204).end();
      })
  })

  /** End of Goofspiel API routes */

  ////////////////////////////////////
  /** Start of Blackjack API routes */
  ////////////////////////////////////

  router.get('/blackjack/:id', (req, res) => {
    const currObj = global.jackObj[req.params.id];
    if (currObj) {
      currObj.p1HandValue = blackjack.handValue(currObj.p1Hand);
      currObj.p2HandValue = blackjack.handValue(currObj.p2Hand);
      currObj.dealerHandValue = blackjack.handValue(currObj.dealerHand);
    }
    res.send(currObj);
  });

  router.post('/blackjack/:id', (req, res) => {
    init.jackData(global.jackObj[req.params.id], req.body.player1, req.body.player2);
    res.sendStatus(201);
  });

  router.post('/blackjack/:id/hit', (req, res) => {
    const currObj = global.jackObj[req.params.id];
    if (currObj) {
      if (req.body.username === currObj.player1) {
        currObj.p1Hand.push(currObj.deck.pop());
        if (blackjack.handValue(currObj.p1Hand) >= 21) {
          currObj.p1In = false;
        }
      } else if (req.body.username === currObj.player2) {
        currObj.p2Hand.push(currObj.deck.pop());
        if (blackjack.handValue(currObj.p2Hand) >= 21) {
          currObj.p2In = false;
        }
      }

      res.sendStatus(201);
    } else {
      res.status(403).send('no game by that id yet exists');
    }
  });

  router.post('/blackjack/:id/stand', (req, res) => {
    const currObj = global.jackObj[req.params.id];
    if (currObj) {
      if (req.body.username === currObj.player1) {
        currObj.p1In = false;
      } else if (req.body.username === currObj.player2) {
        currObj.p2In = false;
      }

      res.sendStatus(201);
    } else {
      res.status(403).send('no game by that id yet exists');
    }
  });

  router.get('/blackjack/:id/finish', (req, res) => {
    const currObj = global.jackObj[req.params.id];
    blackjack.dealerFinishGame(currObj);
    res.send(currObj);
  });

  router.post('/blackjack/:id/save', (req, res) => {
    knex('gamesessions')
      .insert({ player1_id: req.body.player1,
        player2_id: req.body.player2,
        p1_finalscore: req.body.p1Score,
        p2_finalscore: req.body.p2Score,
        winner_id: req.body.winner,
        gameinfo_id: 2,
      }).then(res => {
          res.status(204).end();
      });
  });

  /** End of Blackjack API routes */

  return router;
};
