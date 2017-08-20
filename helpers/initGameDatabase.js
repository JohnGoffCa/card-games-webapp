const shuffle = require('../helpers/shuffle');

const deck = [
  001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 011, 012, 013,
  101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
  201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213,
  301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313,
];

module.exports = {
  goofData: (id, p1, p2) => {
    global.goofObj[id] = {
      // player1: req.body.player1,
      // comes from the json sent from newgame, uses body parser to make it available
      player1: p1,
      p1Won: [],
      p1Sent: false,
      //player2: req.body.player2,
      //same as above
      player2: p2,
      p2Won: [],
      p2Sent: false,
      p1Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      p2Hand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      prizes: shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    };
  },
  jackData: (id, p1, p2) => {
    global.jackObj[id] = {
      // player1: req.body.player1,
      // comes from the json sent from newgame, uses body parser to make it available
      player1: p1,
      p1In: true,
      p1Hand: [],
      p1HandValue: 0,
      //player2: req.body.player2,
      //same as above
      player2: p2,
      p2In: true,
      p2Hand: [],
      p2HandValue: 0,
      dealerHand: [],
      dealerHandValue: 0,
      deck: shuffle(deck),
    };
    // deal first 2 cards to everybody
    for (let i = 0; i < 2; i++) {
      global.jackObj[id].p1Hand.push(global.jackObj[id].deck.pop());
      global.jackObj[id].p2Hand.push(global.jackObj[id].deck.pop());
      global.jackObj[id].dealerHand.push(global.jackObj[id].deck.pop());
    }
  },
};
