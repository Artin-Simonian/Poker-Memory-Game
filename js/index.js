const audio = new Audio("/audio/casino.mp3");
const wrongCardAudio = new Audio("/audio/correct.mp3");
const audience = new Audio("/audio/audience.mp3");
const jackPot = new Audio("/audio/jackpot.mp3");

let cardOne = null;
let cardTwo = null;
let moves = 20;

let cardImgs = document.querySelectorAll(".hide-cards");
let resetBtn = document.querySelector("#button");
const movesEl = document.getElementById("moves-count");

const imageContainer = document.querySelector("#container");
const images = document.querySelectorAll(".hide-cards");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  audio.currentTime = 0;
  audio.play();
}

const shuffledImages = Array.from(images);
shuffleArray(shuffledImages);

shuffledImages.forEach((image) => {
  imageContainer.appendChild(image);
});

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
    moves--;
    movesEl.textContent = moves;
    if (moves === 0) {
      window.location.href = "gameOver.html";
    }
  }
}

cardImgs.forEach((card) => {
  card.addEventListener("click", () => cardsClicker(card));
});

function matchingCards() {
  if (cardOne.src == cardTwo.src) {
    cardOne = null;
    cardTwo = null;
    wrongCardAudio.play();

    if (areAllCardsFlipped()) {
      audio.pause();
      audience.play();
      jackPot.play();
    }
  } else {
    cardOne.className = "hide-cards";
    cardTwo.className = "hide-cards";
    cardOne = null;
    cardTwo = null;
  }
}

function areAllCardsFlipped() {
  const flippedCards = document.querySelectorAll(".show-cards");
  return flippedCards.length === cardImgs.length;
}

resetBtn.addEventListener("click", () => {
  location.reload();
});
