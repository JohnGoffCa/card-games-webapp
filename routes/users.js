'use strict';

const express = require('express');
const router  = express.Router();
// Use cookie-parser to create a simple login mockup
var cookieParser = require('cookie-parser');
router.use(cookieParser());

module.exports = (knex) => {
  //verify login
  router.post('/login', (req, res) => {
    knex
      .select('username')
      .from('users')
      .where({
        username: req.body.username,
        //can add password authentication here
      })
      .then(results => {
        if(results.length > 0) {
          res.cookie('username', req.body.username);
          res.redirect('/');
        } else {
          res.redirect('/login');
        }
      }).catch(err => {
        console.error("Error: ", err);
      })
  });
  //render users archives games on profile page
  router.get('/profile/:user/json', (req, res) => {
    console.log(req.params.user)
    knex
      .select(
        'gameinfo_id', 
        'player1.username AS player1_username', 
        'player2.username AS player2_username',
        'p1_finalscore',
        'p2_finalscore',
        'gamename'
      )
      .from('gamesessions')
      .leftJoin('gamesinfo', 'gamesessions.gameinfo_id', 'gamesinfo.id')
      .leftJoin('users AS player1', 'gamesessions.player1_id', 'player1.id')
      .leftJoin('users AS player2', 'gamesessions.player2_id', 'player2.id')
      .where({player1_id: req.params.user})
      .orWhere({player2_id: req.params.user})
      .orderBy('gamesessions.id')
      .then((data) => {
        console.log(data)
        res.send(data);
      })
   })
  return router;

}
