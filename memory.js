const board = document.getElementById('game-board');
const resetBtn = document.getElementById('reset-btn');
const symbols = ['🍎','🍌','🍇','🍓','🍒','🍉','🥝','🍋'];
let cards = [];
let flipped = [];
let matched = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  board.innerHTML = '';
  cards = [];
  flipped = [];
  matched = 0;
  let cardSymbols = symbols.concat(symbols); // 8쌍, 총 16장
  shuffle(cardSymbols);
  cardSymbols.forEach((symbol, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = symbol;
    card.dataset.index = idx;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
    cards.push(card);
  });
}

function flipCard(e) {
  const card = e.currentTarget;
  if (card.classList.contains('flipped') || card.classList.contains('matched') || flipped.length === 2) return;
  card.classList.add('flipped');
  card.innerText = card.dataset.symbol;
  flipped.push(card);
  if (flipped.length === 2) {
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [card1, card2] = flipped;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matched += 2;
    if (matched === cards.length) {
      setTimeout(() => alert('축하합니다! 모든 카드를 맞췄어요!'), 200);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.innerText = '';
    card2.innerText = '';
  }
  flipped = [];
}

resetBtn.addEventListener('click', createBoard);

createBoard();