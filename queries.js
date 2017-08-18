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
module.exports = (knex) => {
	return {
		findUser: function (username) {
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
		},

		addPlayersToGame: function(player1_id, player2_id, url){
			return knex('gamesessions').insert({player1_id: player1_id, player2_id: player2_id, url: url})
			       .then((result) => {
			       	console.log('success')
			       })
		},


		findUsersGames: function (user_id){
			return knex.select('url').from('gamesessions')
			       .whereIn(user_id, function(){
			       	this.select('player1_id').from('gamesessions')
			       }).orWhereIn(user_id, function(){
			       	this.select('player2_id').from('gamesessions')
			       }).then((result) => {console.log(result)})
		},


		findUsersArchive: function(user_id){
			return knex.select('*').from('gamesessions')
			       .whereIn(user_id, function(){
			       	this.select('player1_id').from('gamesessions')
			       }).orWhereIn(user_id, function(){
			       	this.select('player2_id').from('gamesessions')
			       }).then((result) => {console.log(result)})
		},

		findUserWins: function(user_id){
			return knex('gamesessions').count('winner_id')
			       .whereIn(user_id, function(){
			       	this.select('winner_id').from('gamesessions')
			       }).then((result) => {console.log(result)})
		},
  }
}
