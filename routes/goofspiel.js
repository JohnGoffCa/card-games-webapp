const initGoofData = require('../helpers/initGoofDatabase');
const express = require('express');
const router  = express.Router();

global.goofObj = {};
global.usersGamesObj = {
  
}

module.exports = (knex) => {
  router.post('/:id/save', (req, res) => {
    console.log(req.body, '$$$$$$$$$$$$$ games')
    knex('gamesessions')
    .insert({player1_id: req.body.player1, 
      player2_id: req.body.player2, 
      p1_finalscore: req.body.p1Score,
      p2_finalscore: req.body.p2Score,
      gameinfo_id: 1
    }).then((result)=>{
        res.status(204).end();
    })
  })

  router.get('/:id', (req, res) => {
    res.send(global.goofObj[req.params.id]);
  });

  router.post('/:id', (req, res) => {
    const id = req.params.id
    initGoofData(global.goofObj[req.params.id], req.body.player1, req.body.player2);
    usersGamesObj[`p${player}Games`] &&
    typeof usersGamesObj[`p${player}Games`] === 'array' &&
    usersGamesObj[`p${player}Games`].includes(id) ? null : usersGamesObj[`p${player}Games`].append(id);
    res.sendStatus(201);
  });

  router.post('/:id/nextturn', (req, res) => {
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


  return router;
};
