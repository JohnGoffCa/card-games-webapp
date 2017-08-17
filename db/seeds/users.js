exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({username: 'Alice', password: 'test', email: 'alice@users.com'}),
        knex('users').insert({username: 'Bob', password: 'test', email: 'bob@users.com'}),
        knex('users').insert({username: 'Charlie', password: 'test', email: 'charlie@users.com'})
      ]);
    });
};
