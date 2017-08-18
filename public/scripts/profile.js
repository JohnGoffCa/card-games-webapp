function createArchiveElement(archive){
	return `
	        <tr>
	        <th>Game</th>
	        <th>Player 1</th>
	        <th>Player 2</th>
	        <th>Player 1 Score</th>
	        <th>Player 2 Score</th>
	      </tr>
	      <tr>
	        <td>${archive.gameinfo_id}</td>
	        <td>${archive.player1_username}</td>
	        <td>${archive.player2_username}</td>
	        <td>${archive.p1_finalscore}</td>
	        <td>${archive.p2_finalscore}</td>
	      </tr>`
}

const renderArchive = (data) => {
	const games = data.map(createArchiveElement)
	const html = games.reverse().join('')
	$('#archives').html(html)
}

const loadArchive = () => {
	$.get(`/profile/${ App.userId }/json`, function(data){
		renderArchive(data)
	})
}

$(function(){
  loadArchive()
})