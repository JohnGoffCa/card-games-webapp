function cardValue(card) {
  let cardAsString = ('000' + card).slice(-2);
  if (cardAsString === '01') {
    return 11;
  } else if (cardAsString == '11' || cardAsString == '12' || cardAsString == '13') {
    return 10;
  } else {
    return parseInt(cardAsString, 10);
  }
}

function handValue(hand) {
  handVal = 0;
  numAces = 0;

  hand.forEach((card) => {
    let cardVal = cardValue(card);
    handVal += cardVal;
    if (cardVal === 11) {
      numAces += 1;
    }
  });

  while (numAces > 0) {
    if (handVal > 21) {
      handVal -= 10;
      numAces -= 1;
    } else {
      break;
    }
  }

  return handVal;
}

function dealerFinishGame (gameData) {
  while (gameData.dealerHandValue < 17) {
    gameData.dealerHand.push(gameData.deck.pop());
    gameData.dealerHandValue = handValue(gameData.dealerHand);
  }
}

module.exports = {
  cardValue,
  handValue,
  dealerFinishGame,
};
