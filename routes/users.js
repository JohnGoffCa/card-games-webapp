'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/login', (req, res) => {
    knex
      .select('username')
      .from('users')
      .then(results => {
        results.forEach(result => {
          if (req.body.username === result) {
            res.redirect('/');
          } else {
            res.redirect('/login');
          }
        })
      })
  });
  return router;

}
