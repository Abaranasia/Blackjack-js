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
  console.log(cardImage.src)
  cardImage.classList.add('card');
  return cardImage
}

// Events
btnNewCard.addEventListener('click', () => {
  const card = getNewCard();
  console.log({ card })
  humanPoints = humanPoints + calculateCardValue(card);

  displayedPoints[0].innerText = humanPoints;
  humanCardsDiv.append(paintCard(card));

  if (humanPoints > 21) {
    btnNewCard.disabled = true;
    displayedPoints[0].classList.add("loss");
    console.log('This human has lost!')

  } else if (humanPoints === 21) {
    btnNewCard.disabled = true;
    window.alert('Human wins!');
  }
});


createDeck();