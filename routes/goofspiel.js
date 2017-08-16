const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get('/', (req, res) => {
    res.send('goofspiel');
  });

  return router;
};
