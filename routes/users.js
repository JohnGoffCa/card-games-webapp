'use strict';

const express = require('express');
const router  = express.Router();
// Use cookie-parser to create a simple login mockup
var cookieParser = require('cookie-parser');
router.use(cookieParser());

module.exports = (knex) => {

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
  return router;

}
