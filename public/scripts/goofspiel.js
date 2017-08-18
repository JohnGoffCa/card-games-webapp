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
    },
    complete: (data) => {
      setTimeout(recieveDataFromServer, interval);
    },
  });
}

$(document).ready(() => {
  setTimeout(recieveDataFromServer, interval);

  // CLICK HANDLERS //
  $('#1').on('click', () => {
    sent = 1;
    $('#send-button').removeClass('hidden');
  });
  $('#2').on('click', () => {
    sent = 2;
    $('#send-button').removeClass('hidden');
  });
  $('#3').on('click', () => {
    sent = 3;
    $('#send-button').removeClass('hidden');
  });
  $('#4').on('click', () => {
    sent = 4;
    $('#send-button').removeClass('hidden');
  });
  $('#5').on('click', () => {
    sent = 5;
    $('#send-button').removeClass('hidden');
  });
  $('#6').on('click', () => {
    sent = 6;
    $('#send-button').removeClass('hidden');
  });
  $('#7').on('click', () => {
    sent = 7;
    $('#send-button').removeClass('hidden');
  });
  $('#8').on('click', () => {
    sent = 8;
    $('#send-button').removeClass('hidden');
  });
  $('#9').on('click', () => {
    sent = 9;
    $('#send-button').removeClass('hidden');
  });
  $('#10').on('click', () => {
    sent = 10;
    $('#send-button').removeClass('hidden');
  });
  $('#11').on('click', () => {
    sent = 11;
    $('#send-button').removeClass('hidden');
  });
  $('#12').on('click', () => {
    sent = 12;
    $('#send-button').removeClass('hidden');
  });
  $('#13').on('click', () => {
    sent = 13;
    $('#send-button').removeClass('hidden');
  });
  $('#send-button').on('click', () => {
    // if ((gameData.player1 === Cookies.get('username') && !gameData.p1Sent) || (gameData.player2 === Cookies.get('username') && !gameData.p2Sent)) {
    //   $(`#${sent}`).addClass('hidden');
    //   $('#send-button').addClass('hidden');
    //   $.ajax({
    //     type: 'POST',
    //     url: `/api/goofspiel/${url}/nextturn`
    //   });
    //   if (gameData.player1 === Cookies.get('username') {
    //     let index = gameData.p1Hand.indexOf(sent);
    //     gameData.p1Hand.splice(index, 1);
    //   } else if (gameData.player2 === Cookies.get('username') {
    //     let index = gameData.p2Hand.indexOf(sent);
    //     gameData.p2Hand.splice(index, 1);
    //   }
    // }
  });
});
