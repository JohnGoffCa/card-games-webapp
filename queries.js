let knex = require('knex')({
  client: 'postgresql'
	connection: {
	  host     : process.env.DB_HOST,
	  user     : process.env.DB_USER,
	  password : process.env.DB_PASS,
	  database : process.env.DB_NAME,
	  port     : process.env.DB_PORT,
	  ssl      : process.env.DB_SSL
	}
});

knex('users').where({
	username: 
})
.select('id')


function findUser(username) {
	knex('users').where({
    username: username
	})
	.select('id')
}
