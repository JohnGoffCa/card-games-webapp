'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/login', (req, res) => {
    knex
      .select('username')
      .from('users')
      .then(results => {
        for(var result of results) {
          console.log('rrrrr', req.body)
          if (req.body.username === result.username) {
            res.redirect('/');
            return;
          }
        }

        res.redirect('/login');
      }).catch(err => {
        console.error("Error: ", err);
      })
  });
  return router;

}
