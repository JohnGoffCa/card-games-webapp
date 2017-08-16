
exports.up = function(knex, Promise) {
  return knex.schema.table('gamesessions', (table) => {
    table.string('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('gamesessions', (table) => {
    table.dropColumn('url');
  });
};
