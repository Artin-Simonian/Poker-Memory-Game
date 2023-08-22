// Audio variables
const audio = new Audio("/audio/casino.mp3");
const wrongCardAudio = new Audio("/audio/correct.mp3");
const audience = new Audio("/audio/audience.mp3");
const jackPot = new Audio("/audio/jackpot.mp3");

// card and button variables
let cardOne = null;
let cardTwo = null;
let moves = 20;
let cardImgs = document.querySelectorAll(".hide-cards");
let resetBtn = document.querySelector(".button > #reset-game-btn");
let gameRulesBtn = document.getElementById('game-rules-btn');
let gameRulesArea = document.getElementById('game-rules');
const movesEl = document.getElementById("moves-count");
const imageContainer = document.querySelector("#container");
const images = document.querySelectorAll(".hide-cards");

// Creates board and shuffles cards
function shuffleBoard(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  audio.currentTime = 0;
  audio.play();
}

// creates a new array from the 'images'
const shuffledImages = Array.from(images);
shuffleBoard(shuffledImages);

shuffledImages.forEach((image) => {
  imageContainer.appendChild(image);
});

// handle click function
function handleClick(card) {
  if (cardOne == null) {
    card.className = "show-cards";
    cardOne = card;
  } else if (cardTwo == null) {
    card.className = "show-cards";
    cardTwo = card;
    setTimeout("cardsMatched()", 1000);
    moves--;
    movesEl.textContent = moves;
    if (moves === 0) {
      window.location.href = "gameOver.html";
    }
  }
}

cardImgs.forEach((card) => {
  card.addEventListener("click", () => handleClick(card));
});

function cardsMatched() {
  if (cardOne.src == cardTwo.src) {
    cardOne = null;
    cardTwo = null;
    wrongCardAudio.play();

    if (winner()) {
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

function winner() {
  const flippedCards = document.querySelectorAll(".show-cards");
  return flippedCards.length === cardImgs.length;
}

resetBtn.addEventListener("click", () => {
  location.reload();
});

gameRulesBtn.addEventListener('click', function(){
  gameRulesArea.classList.toggle('hide');
})
