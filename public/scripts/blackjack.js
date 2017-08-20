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
        //renderScore(gameData);
      }
    },
    complete: (data) => {
      timer = setTimeout(recieveDataFromServer, interval);
      if (!$.isEmptyObject(data.responseJSON) && (data.responseJSON.p1In && data.responseJSON.p2In)) {
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
}

$(document).ready(function () {
  let timer = setTimeout(function () {
    recieveDataFromServer(timer);
  }, interval);
});
