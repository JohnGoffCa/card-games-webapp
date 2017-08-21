
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gamesinfo').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('gamesinfo').insert({id: 1, gamename: 'Goofspiel'}),
        knex('gamesinfo').insert({id: 2, gamename: 'Blackjack'}),
      ]);
    });
};
