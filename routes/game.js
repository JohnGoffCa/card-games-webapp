const express = require('express');

const router  = express.Router();

module.exports = () => {
  router.get('/goofspiel/:id', (req, res) => {
    // Search game id on db
    let templateVars = {
      username: req.cookies.username
    };
    res.render('goofspiel', templateVars);
  });

  router.get('/blackjack/:id', (req, res) => {
    // Search game id on db
    let templateVars = {
      username: req.cookies.username
    };
    res.render('blackjack', templateVars);
  });

  return router;
}
