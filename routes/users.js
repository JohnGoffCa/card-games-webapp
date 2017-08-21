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
      .select('username', 'id')
      .from('users')
      .where({
        username: req.body.username,
        //can add password authentication here
      })
      .then(results => {
        console.log(results)
        if(results.length > 0) {
          res.cookie('username', req.body.username);
          res.cookie('user_id', results[0].id);
          res.redirect('/');
        } else {
          res.redirect('/login');
        }
      }).catch(err => {
        console.error("Error: ", err);
      })
  });

  router.get('/profile/:user', (req, res) => {
    // Search username or id on db
    knex.select('username').from('users').where({ id: req.params.user }).then((result) => {
      let templateVars = {
        username: req.cookies.username,
        profileUsername: result[0].username,
        userId: req.params.user,
      };
      res.render('profile', templateVars);
    });
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
        res.send(data);
      })
   })

  return router;

}
