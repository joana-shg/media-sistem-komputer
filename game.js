const questions = [
    {
        q: "Perangkat apakah yang termasuk perangkat input?",
        a: ["Monitor", "Printer", "Keyboard"],
        correct: "Keyboard"
    },
    {
        q: "Mana yang termasuk perangkat output?",
        a: ["Mouse", "CPU", "Monitor"],
        correct: "Monitor"
    },
    {
        q: "Perangkat apakah yang berfungsi mengolah data?",
        a: ["CPU", "Microphone", "Speaker"],
        correct: "CPU"
    },
    {
        q: "Perangkat apakah yang mengeluarkan suara?",
        a: ["Speaker", "Keyboard", "Scanner"],
        correct: "Speaker"
    },
    {
        q: "Perangkat mana yang termasuk perangkat input?",
        a: ["Mouse", "Proyektor", "Speaker"],
        correct: "Mouse"
    }
];

let current = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsArea = document.getElementById("options-area");
const dropZone = document.getElementById("drop");
const scoreText = document.getElementById("score-text");

// Load question
function loadQuestion() {
    let q = questions[current];
    questionText.innerText = q.q;
    optionsArea.innerHTML = "";
    dropZone.innerHTML = "Drop jawaban di sini";
    dropZone.classList.remove("correct-drop", "wrong-drop");

    q.a.forEach(item => {
        let div = document.createElement("div");
        div.className = "drag-item";
        div.setAttribute("draggable", "true");
        div.innerText = item;
        optionsArea.appendChild(div);

        div.addEventListener("dragstart", () => {
            div.classList.add("dragging");
        });
        div.addEventListener("dragend", () => {
            div.classList.remove("dragging");
        });
    });
}

// Drag events
dropZone.addEventListener("dragover", e => {
    e.preventDefault();
    dropZone.classList.add("hover");
});
dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("hover");
});

dropZone.addEventListener("drop", () => {
    dropZone.classList.remove("hover");
    let dragged = document.querySelector(".dragging");

    if (!dragged) return;

    dropZone.innerText = dragged.innerText;

    if (dragged.innerText === questions[current].correct) {
        score++;
        dropZone.classList.add("correct-drop");
    } else {
        dropZone.classList.add("wrong-drop");
    }

    scoreText.innerText = "Skor: " + score;
});

function nextQuestion() {
    current++;
    if (current >= questions.length) {
        endGame();
    } else {
        loadQuestion();
    }
}

function endGame() {
    document.querySelector(".game-box").innerHTML = `
        <h2>Game Selesai!</h2>
        <p>Skor akhir kamu: ${score} dari ${questions.length}</p>
        <button class="next-btn" onclick="restart()">Main Lagi</button>
    `;
}

function restart() {
    current = 0;
    score = 0;
    scoreText.innerText = "Skor: 0";
    loadQuestion();
}

loadQuestion();
// ===========================
// GAME : MENC0C0KKAN KATA
// ===========================

const matchPairs = [
    { word: "Keyboard", pair: "Perangkat Input" },
    { word: "Monitor", pair: "Perangkat Output" },
    { word: "CPU", pair: "Pengolah Data" },
    { word: "Speaker", pair: "Output Suara" },
];

let matchScore = 0;

function loadMatchGame() {
    const leftBox = document.getElementById("leftWords");
    const rightBox = document.getElementById("rightWords");

    leftBox.innerHTML = "";
    rightBox.innerHTML = "";
    matchScore = 0;

    // Randomize
    const shuffledLeft = [...matchPairs].sort(() => Math.random() - 0.5);
    const shuffledRight = [...matchPairs].sort(() => Math.random() - 0.5);

    // LEFT SIDE - DRAGGABLE WORDS
    shuffledLeft.forEach(item => {
        const div = document.createElement("div");
        div.className = "match-item";
        div.draggable = true;
        div.innerText = item.word;
        div.dataset.word = item.word;

        div.addEventListener("dragstart", dragStart);
        leftBox.appendChild(div);
    });

    // RIGHT SIDE - DROP TARGETS
    shuffledRight.forEach(item => {
        const div = document.createElement("div");
        div.className = "drop-target";
        div.innerText = item.pair;
        div.dataset.pair = item.word;

        div.addEventListener("dragover", dragOver);
        div.addEventListener("dragleave", dragLeave);
        div.addEventListener("drop", dropWord);

        rightBox.appendChild(div);
    });
}

// DRAG EVENTS
function dragStart(e) {
    e.dataTransfer.setData("text", e.target.dataset.word);
}

function dragOver(e) {
    e.preventDefault();
    this.classList.add("hover");
}

function dragLeave() {
    this.classList.remove("hover");
}

function dropWord(e) {
    e.preventDefault();
    this.classList.remove("hover");

    const draggedWord = e.dataTransfer.getData("text");

    if (draggedWord === this.dataset.pair) {
        this.classList.add("correct");
        this.innerText += " ✓";
        matchScore++;
    } else {
        this.classList.add("wrong");
        this.innerText += " ✗";
    }

    document.getElementById("match-score").innerText =
        `Skor: ${matchScore} / ${matchPairs.length}`;
}

function restartMatch() {
    document.getElementById("match-score").innerText = "";
    loadMatchGame();
}

window.onload = loadMatchGame;
