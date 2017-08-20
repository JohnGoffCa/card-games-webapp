//generate the users archived games
function createArchiveElement(archive){
	return `
	      <tr>
	        <td>${archive.gamename}</td>
	        <td>${archive.player1_username}</td>
	        <td>${archive.player2_username}</td>
	        <td>${archive.p1_finalscore}</td>
	        <td>${archive.p2_finalscore}</td>
	      </tr>`
}

const renderArchive = (data) => {
	const games = data.map(createArchiveElement)
	const html = games.reverse().join('')
	$('#archives').append(html)
}

const loadArchive = () => {
	$.get(`/profile/${ App.userId }/json`, function(data){
		renderArchive(data)
	})
}

//generate the users current game links
function createGameLinksElement(url){
	return `
	<div>
	  <a href="${url}">url</a>
	</div>`
}

const renderGameUrls = (data) => {
	const urls = data.map(createGameLinksElement)
	const html = urls.reverse().join('')
	$('#game-urls').append(html)
}

const loadUserGameUrls = () => {
	$.get(`/api/goofspiel/users/${ App.userId }/games`, function(data){
		renderGameUrls(data)
	})
}

$(function(){
  loadArchive()
  loadUserGameUrls()
})