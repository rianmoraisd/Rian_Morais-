/* Jogo da memória — lógica da página jogo.html */

const LEVELS = {
    facil: { cols: 4, pairs: 6 },
    medio: { cols: 4, pairs: 8 },
    dificil: { cols: 5, pairs: 10 }
};

const SYMBOLS = ["🤖", "💬", "📅", "⚡", "🚀", "📈", "🎯", "💡", "🔔", "📞"];

const RECORDS_KEY = "atendeai_memoria_recordes";
const MATCH_POINTS = 100;
const MISS_POINTS = 10;
const FLIP_BACK_DELAY = 700;

const board = document.getElementById("board");
const levels = document.getElementById("levels");
const newGameButton = document.getElementById("newGame");
const statusEl = document.getElementById("gameStatus");
const statPairs = document.getElementById("statPairs");
const statMoves = document.getElementById("statMoves");
const statPoints = document.getElementById("statPoints");
const statRecord = document.getElementById("statRecord");

let currentLevel = "facil";
let totalPairs = LEVELS.facil.pairs;
let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;
let matched = 0;
let points = 0;


/* ---------- embaralhar ---------- */

function shuffle(list) {

    for (let i = list.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
}


/* ---------- partida ---------- */

function startGame(level) {

    const config = LEVELS[level];

    currentLevel = level;
    totalPairs = config.pairs;

    firstCard = null;
    secondCard = null;
    lock = false;

    moves = 0;
    matched = 0;
    points = 0;

    const usedSymbols = SYMBOLS.slice(0, config.pairs);
    const deck = shuffle(usedSymbols.concat(usedSymbols));

    board.style.setProperty("--cols", config.cols);
    board.innerHTML = "";

    deck.forEach((symbol) => {

        const card = document.createElement("button");

        card.type = "button";
        card.className = "card";
        card.dataset.symbol = symbol;
        card.setAttribute("aria-label", "Carta virada");

        card.innerHTML = `
            <span class="card-inner">
                <span class="card-face card-front">?</span>
                <span class="card-face card-back">${symbol}</span>
            </span>
        `;

        card.addEventListener("click", () => flipCard(card));

        board.appendChild(card);
    });

    statusEl.classList.remove("win");
    statusEl.textContent = "Encontre todos os pares.";

    updateStats();
    updateRecordDisplay();
}

function flipCard(card) {

    if (lock) return;
    if (card.classList.contains("flipped")) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flipped");
    card.setAttribute("aria-label", "Carta " + card.dataset.symbol);

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matched++;
        points += MATCH_POINTS;

        firstCard = null;
        secondCard = null;

        updateStats();
        checkWin();

        return;
    }

    points = Math.max(0, points - MISS_POINTS);
    updateStats();

    lock = true;

    const wrongA = firstCard;
    const wrongB = secondCard;

    firstCard = null;
    secondCard = null;

    setTimeout(() => {

        wrongA.classList.remove("flipped");
        wrongB.classList.remove("flipped");

        wrongA.setAttribute("aria-label", "Carta virada");
        wrongB.setAttribute("aria-label", "Carta virada");

        lock = false;

    }, FLIP_BACK_DELAY);
}

function checkWin() {

    if (matched !== totalPairs) return;

    const isNewRecord = saveRecord(currentLevel, points, moves);

    statusEl.classList.add("win");

    statusEl.textContent = isNewRecord
        ? `Você venceu em ${moves} jogadas com ${points} pontos — novo recorde!`
        : `Você venceu em ${moves} jogadas com ${points} pontos!`;

    updateRecordDisplay();
}


/* ---------- placar ---------- */

function updateStats() {

    statPairs.textContent = `${matched}/${totalPairs}`;
    statMoves.textContent = moves;
    statPoints.textContent = points;
}


/* ---------- recordes (localStorage) ---------- */

function loadRecords() {

    try {

        const stored = JSON.parse(localStorage.getItem(RECORDS_KEY));

        return stored && typeof stored === "object" ? stored : {};

    } catch (error) {

        return {};
    }
}

function isBetter(record, pontos, jogadas) {

    if (!record) return true;
    if (pontos !== record.pontos) return pontos > record.pontos;

    return jogadas < record.jogadas;
}

function saveRecord(level, pontos, jogadas) {

    const records = loadRecords();

    if (!isBetter(records[level], pontos, jogadas)) return false;

    records[level] = { pontos, jogadas };

    try {

        localStorage.setItem(RECORDS_KEY, JSON.stringify(records));

        return true;

    } catch (error) {

        return false;
    }
}

function updateRecordDisplay() {

    const record = loadRecords()[currentLevel];

    statRecord.textContent = record ? `${record.pontos} pts` : "—";
    statRecord.title = record
        ? `Recorde: ${record.pontos} pontos em ${record.jogadas} jogadas`
        : "Sem recorde neste nível";
}


/* ---------- controles ---------- */

levels.addEventListener("click", (event) => {

    const button = event.target.closest(".level-button");

    if (!button) return;

    levels.querySelectorAll(".level-button").forEach((item) => {
        item.classList.toggle("active", item === button);
    });

    startGame(button.dataset.level);
});

newGameButton.addEventListener("click", () => {
    startGame(currentLevel);
});


startGame("facil");
