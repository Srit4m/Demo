const board = document.getElementById("game-board");
const movesText = document.getElementById("moves");
const timerText = document.getElementById("timer");
const matchSound = document.getElementById("match-sound");
const flipSound = document.getElementById("flip-sound");

const icons = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍍"];
let cards = [...icons, ...icons];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let timer = 0;
let interval = null;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer() {
  interval = setInterval(() => {
    timer++;
    timerText.textContent = timer;
  }, 1000);
}

function createCard(icon) {
  const card = document.createElement("div");
  card.classList.add("card");

  const inner = document.createElement("div");
  inner.classList.add("inner-card");

  const front = document.createElement("div");
  front.classList.add("front");
  front.textContent = icon;

  const back = document.createElement("div");
  back.classList.add("back");
  back.textContent = "❓";

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener("click", () => flipCard(card, icon));
  return card;
}

function flipCard(card, icon) {
  if (lockBoard || card.classList.contains("flipped")) return;

  flipSound.play();
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = { card, icon };
    if (moves === 0) startTimer();
    return;
  }

  secondCard = { card, icon };
  moves++;
  movesText.textContent = moves;

  if (firstCard.icon === secondCard.icon) {
    matchSound.play();
    firstCard = null;
    secondCard = null;
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.card.classList.remove("flipped");
      secondCard.card.classList.remove("flipped");
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 1000);
  }
}

function initGame() {
  board.innerHTML = "";
  cards = shuffle(cards);
  cards.forEach(icon => {
    const card = createCard(icon);
    board.appendChild(card);
  });
}

initGame();
