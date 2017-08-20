module.exports = {
  cardValue: (card) => {
    let cardAsString = ('000' + card).slice(-2);
    if (cardAsString === '01') {
      return 11;
    } else if (cardAsString == '11' || cardAsString == '12' || cardAsString == '13') {
      return 10;
    } else {
      return parseInt(cardAsString, 10);
    }
  },
  handValue: (hand) => {
    handValue = 0;
    numAces = 0;

    hand.forEach((card) => {
      handValue += cardValue(card);
      if (cardValue(card) === 11) {
        numAces += 1;
      }
    });

    while (numAces > 0) {
      if (handValue > 21) {
        handValue -= 10;
        numAces -= 1;
      } else {
        break;
      }
    }

    if (handValue < 21) {
      return [handValue.toString(), handValue];
    } else if (handValue === 21) {
      return ['Blackjack!', handValue];
    } else {
      return ['Bust!', handValue];
    }
  },
};
