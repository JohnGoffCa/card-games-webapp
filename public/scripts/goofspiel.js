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
        renderPlayerCards(gameData);
        renderOpponentCards(gameData);
        renderPrizeCard(gameData);
        renderScore(gameData);
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

function renderPlayerCards(data) {
  const p1CardArea = $('.player1-cards');
  p1CardArea.html('');
  if (gameData.player1 === window.Cookies.get('username')) {
    data.p1Hand.forEach((card) => {
      p1CardArea.append(createP1CardElem(card));
    });
  } else if (gameData.player2 === window.Cookies.get('username')) {
    data.p2Hand.forEach((card) => {
      p1CardArea.append(createP1CardElem(card));
    });
  }
}

function renderOpponentCards(data) {
  const p2CardArea = $('.player2-cards');
  p2CardArea.html('');
  if (gameData.player1 === window.Cookies.get('username')) {
    data.p2Hand.forEach((card) => {
      p2CardArea.append(createP2CardElem(card));
    });
  } else if (gameData.player2 === window.Cookies.get('username')) {
    data.p1Hand.forEach((card) => {
      p2CardArea.append(createP2CardElem(card));
    });
  }
}

function renderPrizeCard(data) {
  const prizeArea = $('.prize-cards');
  prizeArea.html('');
  prizeArea.append($('<div id="deck"><img src="/images/000.png" class="playing-card"></div>'));
  prizeArea.append($(`<div id="prize"><img src="/images/1${('0' + data.prizes[0]).slice(-2)}.png" class="playing-card"></div>`));
}

function renderScore(data) {
  if (gameData.player1 === window.Cookies.get('username')) {
    $('#score').html('');
    $('#score').append(gameData.p1Won.reduce((a, b) => a + b, 0));
  } else if (gameData.player2 === window.Cookies.get('username')) {
    $('#score').html('');
    $('#score').append(gameData.p2Won.reduce((a, b) => a + b, 0));
  }
}

$(document).ready(() => {
  setTimeout(recieveDataFromServer, interval);

  // CLICK HANDLERS //
  $('.player1-cards').on('click', 'div', (e) => {
    sent = e.target.closest('div').id;
    $('#send-button').removeClass('hidden');
  });

  $('#send-button').on('click', () => {
    if (gameData.player1 === window.Cookies.get('username') && !gameData.p1Sent) {
      $(`#${sent}`).addClass('hidden');
      $('#send-button').addClass('hidden');

      $.ajax({
        type: 'POST',
        url: `/api/goofspiel/${url}/nextturn`,
        contentType: 'application/json',
        data: JSON.stringify({
          played: sent,
          username: window.Cookies.get('username'),
        }),
        complete: () => console.log('p1 ajax sent'),
      });
    }
    else if (gameData.player2 === window.Cookies.get('username') && !gameData.p2Sent) {
      $(`#${sent}`).addClass('hidden');
      $('#send-button').addClass('hidden');
      $.ajax({
        type: 'POST',
        url: `/api/goofspiel/${url}/nextturn`,
        contentType: 'application/json',
        data: JSON.stringify({
          played: sent,
          username: window.Cookies.get('username'),
        }),
        complete: () => console.log('p2 ajax sent'),
      });
    }
    else {
      alert('Please wait for your opponent!');
    }
  });
});
