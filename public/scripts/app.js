//$(() => {
//  $.ajax({
//    method: 'GET',
//    url: '/api/users'
//  }).done((users) => {
//    for(user of users) {
//      $('<div>').text(user.name).appendTo($('body'));
//    }
//  });;
//});

$(document).ready(() => {
  $('.match-btn').on('click', () => {
    //$.ajax({
    //  method: 'POST',
    //  url: '/api/goofspiel/1', //TODO make this something other than 1 hardcoded
    //  data: JSON.stringify({
    //    player1ID: "p1",       //TODO fix
    //    player2ID: "p2",       //TODO fix
    //  }),
    //}).done(() => {
    //  window.location = '/game/goofspiel/1';
    //});
    location.href = '/newgame';
  });
});
