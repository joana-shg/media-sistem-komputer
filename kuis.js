// ===============================
// DATA PERTANYAAN
// ===============================
const questions = [
    {
        q: "Apa kepanjangan dari CPU?",
        a: ["Central Processing Unit", "Central Program Unit", "Control Processing Unit"],
        correct: 0
    },
    {
        q: "Perangkat yang berfungsi memasukkan data adalah…",
        a: ["Monitor", "Keyboard", "Speaker"],
        correct: 1
    },
    {
        q: "Sistem operasi termasuk perangkat…",
        a: ["Hardware", "Software", "Brainware"],
        correct: 1
    },
    {
        q: "RAM digunakan untuk…",
        a: ["Menyimpan data permanen", "Menyimpan data sementara", "Memproses grafik"],
        correct: 1
    },
    {
        q: "Perangkat keluaran berikut adalah…",
        a: ["Mouse", "Keyboard", "Printer"],
        correct: 2
    }
];

let index = 0;
let score = 0;
let timer;
let timeLeft = 10; // detik per soal

// ===============================
// LOAD QUESTION
// ===============================
function loadQuestion() {
    let q = questions[index];

    // Reset timer
    timeLeft = 10;
    document.getElementById("timer").innerText = timeLeft + " detik";

    clearInterval(timer);
    startTimer();

    // Isi pertanyaan
    document.getElementById("question").innerText = q.q;

    // Jawaban
    let answers = "";
    q.a.forEach((opt, i) => {
        answers += `
            <p class="answer-option" onclick="selectAnswer(${i})">
                ${opt}
            </p>
        `;
    });

    document.getElementById("answers").innerHTML = answers;

    // Update progress bar
    let progress = ((index) / questions.length) * 100;
    document.getElementById("progress").style.width = progress + "%";
}

// ===============================
// TIMER SYSTEM
// ===============================
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft + " detik";

        if (timeLeft <= 0) {
            clearInterval(timer);
            autoNext("waktu habis!");
        }
    }, 1000);
}

// ===============================
// SELECT ANSWER
// ===============================
function selectAnswer(i) {
    let correct = questions[index].correct;

    // Efek warna jawaban
    let options = document.querySelectorAll(".answer-option");

    if (i === correct) {
        options[i].classList.add("correct");
        score++;
    } else {
        options[i].classList.add("wrong");
        options[correct].classList.add("correct");
    }

    clearInterval(timer);

    // Otomatis lanjut setelah 1.2 detik
    setTimeout(() => {
        nextQuestion();
    }, 1200);
}

// ===============================
// AUTO NEXT WHEN TIMER ENDS
// ===============================
function autoNext(msg) {
    let correct = questions[index].correct;
    let options = document.querySelectorAll(".answer-option");

    options[correct].classList.add("correct");

    setTimeout(() => {
        nextQuestion();
    }, 1200);
}

// ===============================
// NEXT QUESTION
// ===============================
function nextQuestion() {
    index++;

    if (index < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// ===============================
// END QUIZ
// ===============================
function endQuiz() {
    document.getElementById("quiz-box").innerHTML = `
        <h2 style="text-align:center;">🎉 Kuis Selesai!</h2>
        <p style="text-align:center; font-size:20px;">Skor Kamu:</p>
        <h1 style="text-align:center; font-size:45px; color:#00ffea;">${score} / ${questions.length}</h1>
        <button class="restart-btn" onclick="location.reload()">Ulangi Kuis</button>
    `;

    document.getElementById("progress").style.width = "100%";
}

// ===============================
// START
// ===============================
loadQuestion();
