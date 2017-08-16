const express = require('express');
const router  = express.Router();
const shuffle = require('../helpers/shuffle');

const goofObj = {};

module.exports = (knex) => {
  router.get('/:id', (req, res) => {
    res.send(goofObj[req.params.id]);
  });
  
  router.post('/:id', (req, res) => {
    goofObj[req.params.id] = {
      p1Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      p2Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      prizes: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
      turn: 0,
    };
  });

  return router;
};
