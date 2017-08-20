let gameData = {};
const url = window.location.pathname.slice(-6);
const interval = 300;

function recieveDataFromServer(timer) {
  $.ajax({
    url: `/api/blackjack/${url}`,
    type: 'GET',
    success: (data) => {
      gameData = data;
      if (!$.isEmptyObject(gameData)) {
        renderPlayerCards(gameData);
        renderOpponentCards(gameData);
        renderDealerCards(gameData, false);
        renderScore(gameData);
      }
    },
    complete: (data) => {
      timer = setTimeout(recieveDataFromServer, interval);
      if (!$.isEmptyObject(data.responseJSON) && (!data.responseJSON.p1In && !data.responseJSON.p2In)) {
        clearTimeout(timer);
      }
    },
  });
}

function createCardElem(id) {
  const $card = $(`
    <div><img src="/images/${('000'+id).slice(-3)}.png" class="playing-card"></div>
  `);
  return $card;
}

function renderPlayerCards(data) {
  const p1CardArea = $('.player1-cards');
  p1CardArea.html('');
  if (gameData.player1 === window.Cookies.get('username')) {
    data.p1Hand.forEach((card) => {
      p1CardArea.append(createCardElem(card));
    });
  } else if (gameData.player2 === window.Cookies.get('username')) {
    data.p2Hand.forEach((card) => {
      p1CardArea.append(createCardElem(card));
    });
  }
  p1CardArea.append('<div id="player-score"></div>');
}

function renderOpponentCards(data) {
  const p2CardArea = $('.player2-cards');
  p2CardArea.html('');
  if (gameData.player1 === window.Cookies.get('username')) {
    data.p2Hand.forEach((card) => {
      p2CardArea.append(createCardElem(card));
    });
  } else if (gameData.player2 === window.Cookies.get('username')) {
    data.p1Hand.forEach((card) => {
      p2CardArea.append(createCardElem(card));
    });
  }
  p2CardArea.append('<div id="opponent-score"></div>');
}

function renderDealerCards(data, show) {
  const dealerArea = $('.dealer-cards');
  dealerArea.html('');
  if (show) {
    dealerArea.append(createCardElem(data.dealerHand[0]));
  } else {
    dealerArea.append(createCardElem(000));
  }
  data.dealerHand.splice(0, 1).forEach((card) => {
    dealerArea.append(createCardElem(card));
  });
  dealerArea.append('<div id="dealer-score"></div>');
}

function renderScore(data) {
  if (gameData.player1 === window.Cookies.get('username')) {
    $('#player-score').html('');
    $('#player-score').append(gameData.p1HandValue);
    $('#opponent-score').html('');
    $('#opponent-score').append(gameData.p2HandValue);
  } else if (gameData.player2 === window.Cookies.get('username')) {
    $('#player-score').html('');
    $('#player-score').append(gameData.p2HandValue);
    $('#opponent-score').html('');
    $('#opponent-score').append(gameData.p1HandValue);
  }
}

$(document).ready(function () {
  let timer = setTimeout(function () {
    recieveDataFromServer(timer);
  }, interval);

  // CLICK HANDLERS //
  $('#hit-button').on('click', () => {
    if (gameData.player1 === window.Cookies.get('username') && gameData.p1In) {
      $.ajax({
        type: 'POST',
        url: `/api/blackjack/${url}/hit`,
        contentType: 'application/json',
        data: JSON.stringify({
          username: window.Cookies.get('username'),
        }),
      });
    } else if (gameData.player2 === window.Cookies.get('username') && gameData.p2In) {
      $.ajax({
        type: 'POST',
        url: `/api/blackjack/${url}/hit`,
        contentType: 'application/json',
        data: JSON.stringify({
          username: window.Cookies.get('username'),
        }),
      });
    }
    else {
      alert('Please wait for your opponent!');
    }
  });

  $('#stand-button').on('click', () => {
    if (gameData.player1 === window.Cookies.get('username') && gameData.p1In) {
      $.ajax({
        type: 'POST',
        url: `/api/blackjack/${url}/stand`,
        contentType: 'application/json',
        data: JSON.stringify({
          username: window.Cookies.get('username'),
        }),
      });
    } else if (gameData.player2 === window.Cookies.get('username') && gameData.p2In) {
      $.ajax({
        type: 'POST',
        url: `/api/blackjack/${url}/stand`,
        contentType: 'application/json',
        data: JSON.stringify({
          username: window.Cookies.get('username'),
        }),
      });
    }
    else {
      alert('Please wait for your opponent!');
    }
  });
  // END OF CLICK HANDLERS //
});
