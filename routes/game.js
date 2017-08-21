const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/goofspiel/:id', (req, res) => {
    // Search game id on db
    const templateVars = {
      userId: req.cookies.user_id,
      username: req.cookies.username,
    };
    res.render('goofspiel', templateVars);
  });

  router.get('/blackjack/:id', (req, res) => {
    // Search game id on db
    const templateVars = {
      userId: req.cookies.user_id,
      username: req.cookies.username,
    };
    res.render('blackjack', templateVars);
  });

  return router;
};
