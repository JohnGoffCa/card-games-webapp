const shuffle = require('../helpers/shuffle');

module.exports = function initData(id, p1, p2, p1Username, p2Username) {
  global.goofObj[id] = {
    // player1: req.body.player1,
    // comes from the json sent from newgame, uses body parser to make it available
    player1: p1,
    player1Username: p1Username,
    p1Won: [],
    p1Sent: false,
    //player2: req.body.player2,
    //same as above
    player2: p2,
    player2Username: p2Username,
    p2Won: [],
    p2Sent: false,
    p1Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    p2Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    prizes: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
  };
};
