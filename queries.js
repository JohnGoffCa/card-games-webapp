require('dotenv').config();

let knex = require('knex')({
  client: 'postgresql',
	connection: {
	  host     : process.env.DB_HOST,
	  user     : process.env.DB_USER,
	  password : process.env.DB_PASS,
	  database : process.env.DB_NAME,
	  port     : process.env.DB_PORT,
	  ssl      : process.env.DB_SSL
	}
});

function findUser(username) {
	return knex('users').where({
    username: username
	})
	.select('id')
	.then((results)=>{
		if(results.length > 0) {
			results.forEach((result)=>{
	      console.log(result.id)
			})
			return results;
		} else {
			console.log("Not found");
		}

	}).catch((err) => {
		console.log(err);
	})
	.finally(function () {
    return knex.destroy();
  })
}
findUser('Bob')
//ask about using promises to get data
// function insert(obj) {
// 	return knex('').insert(...);
// }

// findUser('Bob').then((results) => {
// 	var obj = {..}
// 	return insert(obj);
// }).then(() => {

function addPlayersToGame(player1_id, player2_id, url, complete){
	return knex('gamesessions').insert({player1_id: player1_id, player2_id: player2_id, url: url, complete: false})
	       .then((result) => {
	       	console.log('success')
	       })
}

addPlayersToGame(1, 2, 'xyz')