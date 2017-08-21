let gameData = {};
const url = window.location.pathname.slice(-6);
const interval = 300;

function recieveDataFromServer(timer) {
  $.ajax({
    url: `/api/blackjack/${url}`,
    type: 'GET',
    success: function (data) {
      gameData = data;
      if (!$.isEmptyObject(gameData)) {
        renderPlayerCards(gameData);
        renderOpponentCards(gameData);
        renderDealerCards(gameData, false);
        renderScore(gameData);
      }
    },
    complete: function (data) {
      timer = setTimeout(function () {
        recieveDataFromServer(timer);
      }, interval);
      if (!$.isEmptyObject(data.responseJSON) && (!data.responseJSON.p1In && !data.responseJSON.p2In)) {
        clearTimeout(timer);
        hideButtons();
        dealerPlay(data.responseJSON);
      }
    },
  });
  if (gameData.player1 === window.Cookies.get('user_id') && !gameData.p1In) {
    hideButtons();
  } else if (gameData.player2 === window.Cookies.get('user_id') && !gameData.p2In) {
    hideButtons();
  }
}

function hideButtons() {
  if (!$('#hit-button').hasClass('hidden')) {
    $('#hit-button').addClass('hidden');
  }
  if (!$('#stand-button').hasClass('hidden')) {
    $('#stand-button').addClass('hidden');
  }
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
  if (gameData.player1 === window.Cookies.get('user_id')) {
    data.p1Hand.forEach(function (card) {
      p1CardArea.append(createCardElem(card));
    });
  } else if (gameData.player2 === window.Cookies.get('user_id')) {
    data.p2Hand.forEach(function (card) {
      p1CardArea.append(createCardElem(card));
    });
  }
  p1CardArea.append('<div id="player-score"></div>');
}

function renderOpponentCards(data) {
  const p2CardArea = $('.player2-cards');
  p2CardArea.html('');
  if (gameData.player1 === window.Cookies.get('user_id')) {
    data.p2Hand.forEach(function (card) {
      p2CardArea.append(createCardElem(card));
    });
  } else if (gameData.player2 === window.Cookies.get('user_id')) {
    data.p1Hand.forEach(function (card) {
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
  data.dealerHand.slice(1).forEach(function (card) {
    dealerArea.append(createCardElem(card));
  });
  dealerArea.append('<div id="dealer-score"></div>');
}

function dealerPlay() {
  $.ajax({
    url: `/api/blackjack/${url}/finish`,
    type: 'GET',
    success: function (data) {
      gameData = data;
      renderDealerCards(data, true);
      $('#dealer-score').append(data.dealerHandValue);
      renderVictory();
    },
  });
}

function showNotification(contentObj) {
  const msg = contentObj.msg;
  const type = contentObj.type;

  const newNotification = `<li class="notification">${msg} <a href="/newgame">Play again!</a></li>`

  let notifications = $('#notifications').html('').append(newNotification);
}

function saveGameResults(winnerId){
  $.ajax({
    type: 'POST',
    url: `/api/blackjack/${url}/save`,
    data: {
      p1Score: gameData.p1HandValue,
      p2Score: gameData.p2HandValue,
      player1: gameData.player1,
      player2: gameData.player2,
      winner: winnerId,
    }
  });
};

function renderVictory() {
  if (gameData.player1 === window.Cookies.get('user_id')) {
    if (calculateWinner(gameData.p1HandValue, gameData.p2HandValue, gameData.dealerHandValue)) {
      saveGameResults(gameData.player1);
      showNotification({ msg: 'You Won!' });
    } else {
      showNotification({ msg: 'You Lost!' });
    }
  } else if (gameData.player2 === window.Cookies.get('user_id')) {
    if (calculateWinner(gameData.p2HandValue, gameData.p1HandValue, gameData.dealerHandValue)) {
      saveGameResults(gameData.player2);
      showNotification({ msg: 'You Won!' });
    } else {
      showNotification({ msg: 'You Lost!' });
    }
  }
}

// returns true if player won, false if not
function calculateWinner(playerVal, opponentVal, dealerVal) {
  if (playerVal > 21) {
    return false;
  }
  if (opponentVal > 21 && dealerVal > 21) {
    return true;
  } else if (opponentVal > 21) {
    if (playerVal > dealerVal) {
      return true;
    }
  } else if (dealerVal > 21) {
    if (playerVal > opponentVal) {
      return true;
    }
  } else {
    if (playerVal > dealerVal && playerVal > opponentVal) {
      return true;
    }
  }
}

function renderScore(data) {
  if (gameData.player1 === window.Cookies.get('user_id')) {
    $('#player-score').html('');
    $('#player-score').append(data.p1HandValue);
    $('#opponent-score').html('');
    $('#opponent-score').append(data.p2HandValue);
  } else if (gameData.player2 === window.Cookies.get('user_id')) {
    $('#player-score').html('');
    $('#player-score').append(data.p2HandValue);
    $('#opponent-score').html('');
    $('#opponent-score').append(data.p1HandValue);
  }
}

$(document).ready(function () {
  let timer = setTimeout(function () {
    recieveDataFromServer(timer);
  }, interval);

  // CLICK HANDLERS //
  $('#hit-button').on('click', function () {
    if (gameData.player1 === window.Cookies.get('user_id') && gameData.p1In) {
      $.ajax({
        type: 'POST',
        url: `/api/blackjack/${url}/hit`,
        contentType: 'application/json',
        data: JSON.stringify({
          username: window.Cookies.get('user_id'),
        }),
      });
    } else if (gameData.player2 === window.Cookies.get('user_id') && gameData.p2In) {
      $.ajax({
        type: 'POST',
        url: `/api/blackjack/${url}/hit`,
        contentType: 'application/json',
        data: JSON.stringify({
          username: window.Cookies.get('user_id'),
        }),
      });
    } else {
      alert('Please wait for your opponent!');
    }
  });

  $('#stand-button').on('click', function () {
    if (gameData.player1 === window.Cookies.get('user_id') && gameData.p1In) {
      $.ajax({
        type: 'POST',
        url: `/api/blackjack/${url}/stand`,
        contentType: 'application/json',
        data: JSON.stringify({
          username: window.Cookies.get('user_id'),
        }),
      });
    } else if (gameData.player2 === window.Cookies.get('user_id') && gameData.p2In) {
      $.ajax({
        type: 'POST',
        url: `/api/blackjack/${url}/stand`,
        contentType: 'application/json',
        data: JSON.stringify({
          username: window.Cookies.get('user_id'),
        }),
      });
    } else {
      alert('Please wait for your opponent!');
    }
  });
  // END OF CLICK HANDLERS //
});
