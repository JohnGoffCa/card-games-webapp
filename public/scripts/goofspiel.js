let sent = 0;
let gameData = {};
const url = window.location.pathname.slice(-6);
const interval = 3000;

function recieveDataFromServer() {
  $.ajax({
    url: `/api/goofspiel/${url}`,
    type: 'GET',
    success: (data) => {
      gameData = data;
      if (!$.isEmptyObject(gameData)) {
        renderP1Cards(gameData);
        renderP2Cards(gameData);
      } 
    },
    complete: (data) => {
      setTimeout(recieveDataFromServer, interval);
    },
  });
}

function createP1CardElem(id) {
  const $card = $(`
    <div id="${id}"><img src="/images/${('000'+id).slice(-3)}.png" class="playing-card"></div>
  `);
  return $card;
}

function createP2CardElem(id) {
  const $card = $(`
    <div id="p2_${id}"><img src="/images/000.png" class="playing-card"></div>
  `);
  return $card;
}

function renderP1Cards(data) {
  const p1CardArea = $('.player1-cards');
  p1CardArea.html('');
  data.p1Hand.forEach((card) => {
    p1CardArea.append(createP1CardElem(card));
  });
}

function renderP2Cards(data) {
  const p2CardArea = $('.player2-cards');
  p2CardArea.html('');
  data.p2Hand.forEach((card) => {
    p2CardArea.append(createP2CardElem(card));
  });
}

$(document).ready(() => {
  setTimeout(recieveDataFromServer, interval);

  // CLICK HANDLERS //
  $('.player1-cards').on('click', 'div', (e) => {
    sent = e.target.closest('div').id;
    $('#send-button').removeClass('hidden');
  });

  $('#send-button').on('click', () => {
    if ((gameData.player1 === window.Cookies.get('username') && !gameData.p1Sent) || (gameData.player2 === window.Cookies.get('username') && !gameData.p2Sent)) {
      $(`#${sent}`).addClass('hidden');
      $('#send-button').addClass('hidden');
      $.ajax({
        type: 'POST',
        url: `/api/goofspiel/${url}/nextturn`,
        
      });
      if (gameData.player1 === Cookies.get('username')) {
        let index = gameData.p1Hand.indexOf(sent);
        gameData.p1Hand.splice(index, 1);
      } else if (gameData.player2 === Cookies.get('username')) {
        let index = gameData.p2Hand.indexOf(sent);
        gameData.p2Hand.splice(index, 1);
      }
    }
  });
});
