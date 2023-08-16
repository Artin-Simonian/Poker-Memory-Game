let cardOne = null;
let cardTwo = null;
const cardImgs = document.querySelectorAll(".hide-cards");

// function to flip the cards
// when being clicked
function cardsClicker(card) {
  if (cardOne == null) {
    card.className = "show-cards";
    cardOne = card;
  } else if (cardTwo == null) {
    card.className = "show-cards";
    cardTwo = card;

    setTimeout("matchingCards()", 1000);
  }
}


cardImgs.forEach((card) => {
  card.addEventListener("click", () => cardsClicker(card));
});

function matchingCards() {
  if (cardOne.src == cardTwo.src) {
    cardOne = null;
    cardTwo = null;
  } else {
    cardOne.className = "hide-cards";
    cardTwo.className = "hide-cards";
    cardOne = null;
    cardTwo = null;
  }
}
