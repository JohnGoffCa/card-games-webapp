
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('name');
      table.string('username');
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('gamesinfo', (table) => {
      table.increments('id');
      table.string('gamename');
    }),
    knex.schema.createTable('gamesessions', (table) => {
      table.increments('id');
      table.integer('gameinfo_id');
      table.foreign('gameinfo_id').references('id').inTable('gamesinfo');
      table.integer('player1_id');
      table.foreign('player1_id').references('id').inTable('users');
      table.integer('player2_id');
      table.foreign('player2_id').references('id').inTable('users');
      table.integer('p1_finalscore');
      table.integer('p2_finalscore');
      table.boolean('complete');
      table.integer('winner_id');
      table.foreign('winner_id').references('id').inTable('users');
    }),
    knex.schema.createTable('gameturns', (table) => {
      table.increments('id');
      table.integer('gamesessions_id');
      table.foreign('gamesessions_id').references('id').inTable('gamesessions');
      table.integer('turn');
      table.integer('player1_id');
      table.foreign('player1_id').references('id').inTable('users');
      table.integer('player2_id');
      table.foreign('player2_id').references('id').inTable('users');
      table.integer('p1_currentscore');
      table.integer('p2_currentscore');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('gameturns'),
    knex.schema.dropTable('gamesessions'),
    knex.schema.dropTable('gamesinfo'),
    knex.schema.table('users', (table) => {
      table.dropColumn('username');
      table.dropColumn('email');
      table.dropColumn('password');
      table.string('name');
    }),
  ]);
};
