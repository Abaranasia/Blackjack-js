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

createDeck();

// Events
btnNewCard.addEventListener('click', () => {
  const card = getNewCard();
  console.log({ card })
  humanPoints = humanPoints + calculateCardValue(card);
  displayedPoints[0].innerText = humanPoints
});



