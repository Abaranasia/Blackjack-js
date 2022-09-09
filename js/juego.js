
(() => {
  'use strict'

/** We put all the code nside a module pattern to ensure no functions or cosnt/variables are available from outside */
  /**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

  const types = ['C', 'D', 'H', 'S'];
  const specials = ['A', 'J', 'Q', 'K'];

  let deck = [];

  let humanPoints = 0;
  let computerPoints = 0;

  // HTML references
  const btnNewGame = document.querySelector('#btnNewGame');
  const btnNewCard = document.querySelector('#btnNewCard');
  const btnEndGame = document.querySelector('#btnEndGame');

  const displayedPoints = document.querySelectorAll('small');

  const humanCardsDiv = document.querySelector('#human-cards');
  const computerCardsDiv = document.querySelector('#computer-cards');

  // Functions
  const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type)
      };
    };

    for (let type of types) {
      for (let special of specials) {
        deck.push(special + type)
      }
    };
    deck = _.shuffle(deck)
  };


  const getNewCard = () => {
    if (deck.length === 0) throw 'No more cards available'
    const card = deck.shift();
    return card
  };

  const calculateCardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return (isNaN(value)) ?
      (value === 'A') ? 11 : 10
      : parseInt(value)
  };

  const paintCard = (card) => {
    const cardImage = document.createElement('img');
    cardImage.src = `./assets/cartas/${card}.png`;
    cardImage.classList.add('card');
    return cardImage
  }


  // Computer turn handler
  const computerTurn = (minPoints) => {
    do {
      const card = getNewCard();

      computerPoints = computerPoints + calculateCardValue(card);
      displayedPoints[1].innerText = computerPoints;

      computerCardsDiv.append(paintCard(card));

      if (minPoints > 21) break;

    } while ((computerPoints < minPoints) && (minPoints <= 21));
    btnNewCard.disabled = true;
    btnEndGame.disabled = true;

    if (computerPoints > 21) displayedPoints[1].classList.add("loss");

    alert((computerPoints === minPoints)
      ? 'Both players tie'
      : (minPoints > 21 || (computerPoints > minPoints && computerPoints <= 21))
        ? 'Computer wins'
        : 'Human wins'
    )
  };


  // Events
  btnNewCard.addEventListener('click', () => {
    const card = getNewCard();

    humanPoints = humanPoints + calculateCardValue(card);
    displayedPoints[0].innerText = humanPoints;

    humanCardsDiv.append(paintCard(card));

    if (humanPoints > 21) {
      btnNewCard.disabled = true;
      btnEndGame.disabled = true;
      displayedPoints[0].classList.add("loss");
      computerTurn(humanPoints)

    } else if (humanPoints === 21) {
      btnNewCard.disabled = true;
      btnEndGame.disabled = true;
      window.alert('Human wins!');
    }
  });


  btnEndGame.addEventListener('click', () => {
    btnNewCard.disabled = true;
    computerTurn(humanPoints)
  })

  btnNewGame.addEventListener('click', () => {
    createDeck();

    humanPoints = 0;
    computerPoints = 0;

    displayedPoints[0].innerText = 0;
    displayedPoints[1].innerText = 0;

    displayedPoints[0].classList.remove("loss");
    displayedPoints[1].classList.remove("loss");

    humanCardsDiv.innerHTML = "";
    computerCardsDiv.innerHTML = "";

    btnNewCard.disabled = false;
    btnEndGame.disabled = false;
  });

  createDeck();
})();

