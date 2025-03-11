let quizzes = JSON.parse(localStorage.getItem("quizzes")) || {};
let selectedQuiz, questions, currentQuestionIdx , score, timerInterval;

function populateDropdown() {
    let dropdown = document.getElementById("quizDropdown");
    dropdown.innerHTML = '<option value="">Select a Quiz</option>';

    for (let subject in quizzes) {
        for (let topic in quizzes[subject]) {
            let option = document.createElement("option");
            option.value = `${subject}|${topic}`;
            option.textContent = `${subject} - ${topic}`;
            dropdown.appendChild(option);
        }
    }
}

function startQuiz() {
    let selected = document.getElementById("quizDropdown").value;
    if (!selected) {
        alert("Please select a quz");
        return;
    }

    [subject, topic] = selected.split("|");
    questions = quizzes[subject][topic];
    currentQuestionIdx = 0;
    score=0;

    document.getElementById("quizSelection").classList.add("hidden");
    document.getElementById("quizContainer").classList.remove("hidden");
    document.getElementById("quizResult").classList.add("hidden");

    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIdx  >= questions.length) {
        return endQuiz();
    }

    let q = questions[currentQuestionIdx ];
    document.getElementById("questionText").textContent = q.text;
    document.getElementById("optionsContainer").innerHTML = q.options.map((opt, i) =>
        `<button onclick="checkAnswer(${i})" class="block w-full bg-gray-200 p-2 rounded mb-1">${opt}</button>`
    ).join("");

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    let timer = 20;
    document.getElementById("timer").textContent = timer;

    timerInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").textContent = timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(i) {
    if (i === questions[currentQuestionIdx ].correctAnswer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIdx ++;
    loadQuestion();
}

function endQuiz() {
    clearInterval(timerInterval);

    document.getElementById("quizContainer").classList.add("hidden");
    document.getElementById("quizResult").classList.remove("hidden");

    document.getElementById("scoreDisplay").textContent = score;
    document.getElementById("totalQuestions").textContent = questions.length;
}

function retakeQuiz() {
    document.getElementById("quizSelection").classList.remove("hidden");
    document.getElementById("quizResult").classList.add("hidden");
}

populateDropdown();
