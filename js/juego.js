
(() => {
  'use strict'

/** We put all the code nside a module pattern to ensure no functions or cosnt/variables are available from outside */
  /**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

  let deck = [];
  let winner;
  const types = ['C', 'D', 'H', 'S'];
  const specials = ['A', 'J', 'Q', 'K'];


  //  let humanPoints = 0;
  //   let computerPoints = 0;
  let playersPoints = [];

  // HTML references
  const btnNewGame = document.querySelector('#btnNewGame');
  const btnNewCard = document.querySelector('#btnNewCard');
  const btnEndGame = document.querySelector('#btnEndGame');

  const displayedPoints = document.querySelectorAll('small');

  const humanCardsDiv = document.querySelector('#human-cards');
  const computerCardsDiv = document.querySelector('#computer-cards');


  // Functions ////////////

  const initiallizeGame = (numPlayers = 2) => {
    document.querySelector('#winner').style.display = "none";

    deck = createDeck();
    playersPoints = [];
    winner = '';

    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0)
    };

    displayedPoints[0].innerText = 0;
    displayedPoints[1].innerText = 0;

    displayedPoints[0].classList.remove("loss");
    displayedPoints[1].classList.remove("loss");

    humanCardsDiv.innerHTML = "";
    computerCardsDiv.innerHTML = "";

    btnNewCard.disabled = false;
    btnEndGame.disabled = false;
  };


  const createDeck = () => {
    deck = []; // initiallize

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
    return _.shuffle(deck)
  };

  const getNewCard = () => {
    if (deck.length === 0) throw 'No more cards available'
    return deck.shift();
  };


  const calculateCardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return (isNaN(value)) ?
      (value === 'A') ? 11 : 10
      : parseInt(value)
  };


  const displayCard = (card) => {
    const cardImage = document.createElement('img');
    cardImage.src = `./assets/cartas/${card}.png`;
    cardImage.classList.add('card');
    return cardImage
  }


  const displayWinner = (minPoints, computerPoints) => {
    const winnerDiv = document.querySelector('#winner');
    if (winner === '') {
      winner = (computerPoints === minPoints)
        ? 'Both players tie'
        : (minPoints > 21 || (computerPoints > minPoints && computerPoints <= 21))
          ? 'Computer wins'
          : 'Human wins'
    }
    winnerDiv.style.display = "block";
    winnerDiv.innerHTML = winner;
  };

  // turn: 0 is for first player and last is computer
  const addScores = (card, turn) => {
    playersPoints[turn] = playersPoints[turn] + calculateCardValue(card);
    displayedPoints[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  };


  // Computer turn handler
  const computerTurn = (minPoints) => {
    let computerPoints = 0;
    do {
      const card = getNewCard();
      computerPoints = addScores(card, playersPoints.length - 1)

      computerCardsDiv.append(displayCard(card));

      if (minPoints > 21) break;

    } while ((computerPoints < minPoints) && (minPoints <= 21));
    btnNewCard.disabled = true;
    btnEndGame.disabled = true;

    if (computerPoints > 21) displayedPoints[1].classList.add("loss");

    displayWinner(minPoints, computerPoints)

  };

  // Events
  btnNewCard.addEventListener('click', () => {
    const card = getNewCard();
    const humanPoints = addScores(card, 0)

    humanCardsDiv.append(displayCard(card));

    if (humanPoints > 21) {
      btnNewCard.disabled = true;
      btnEndGame.disabled = true;
      displayedPoints[0].classList.add("loss");
      computerTurn(humanPoints)

    } else if (humanPoints === 21) {
      btnNewCard.disabled = true;
      btnEndGame.disabled = true;
      winner = 'Human wins!';
      displayWinner(humanPoints, 0)
    };
  });


  btnEndGame.addEventListener('click', () => {
    btnNewCard.disabled = true;
    computerTurn(playersPoints[0])
  })

  btnNewGame.addEventListener('click', () => {
    initiallizeGame();
  });


})();

