exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, username: 'Alice', password: 'test', email: 'alice@users.com'}),
        knex('users').insert({id: 2, username: 'Bob', password: 'test', email: 'bob@users.com'}),
        knex('users').insert({id: 3, username: 'Charlie', password: 'test', email: 'charlie@users.com'})
      ]);
    });
};
