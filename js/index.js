const audio = new Audio('/audio/casino.mp3');

let cardOne = null;
let cardTwo = null;
let moves = 0;

let cardImgs = document.querySelectorAll(".hide-cards");
let resetBtn = document.querySelector("button");
const movesEl = document.getElementById('moves-count');

const imageContainer = document.querySelector("#container");
const images = document.querySelectorAll(".hide-cards");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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
    moves++;
    movesEl.textContent = moves;
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

resetBtn.addEventListener("click", () => {
  location.reload();
  audio.currentTime = 0;
  audio.play();
});
