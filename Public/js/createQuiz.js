function generateForm() {
    let subject = document.getElementById("subject").value.trim();
    let topic = document.getElementById("topic").value.trim();
    let numQuestions = parseInt(document.getElementById("numQuestions").value);

    if (!subject || !topic || isNaN(numQuestions) || numQuestions < 1) {
        alert("Please enter valid Subject, Topic, and Number of Questions.");
        return;
    }

    let container = document.getElementById("questionsContainer");
    container.innerHTML = "";
    
    for (let i = 0; i < numQuestions; i++) {
        container.innerHTML += `
            <div class="mb-4 p-4 border rounded">
                <label class="font-semibold">Question ${i + 1}:</label>
                <input type="text" class="w-full border p-2 rounded mb-2 question" placeholder="Enter question">

                <label class="font-semibold">Options:</label>
                ${[0, 1, 2, 3].map(j => `
                    <div class="flex items-center gap-2">
                        <input type="radio" name="correct${i}" value="${j}" required>
                        <input type="text" class="w-full border p-2 rounded option" placeholder="Option ${j + 1}">
                    </div>
                `).join("")}
            </div>
        `;
    }

    document.getElementById("quizForm").classList.remove("hidden");
}

function saveQuiz() {
    let subject = document.getElementById("subject").value.trim();
    let topic = document.getElementById("topic").value.trim();
    let questions = [];

    document.querySelectorAll("#questionsContainer > div").forEach((div, i) => {
        let questionText = div.querySelector(".question").value.trim();
        let options = [...div.querySelectorAll(".option")].map(input => input.value.trim());
        let correctAnswer = [...div.querySelectorAll(`input[name="correct${i}"]`)].findIndex(r => r.checked);

        if (!questionText || options.includes("") || correctAnswer === -1) {
            alert("Please fill all fields and select the correct answer.");
            return;
        }

        questions.push({ text: questionText, options, correctAnswer });
    });

    if (questions.length === 0) return;

    let quizzes = JSON.parse(localStorage.getItem("quizzes")) || {};
    if (!quizzes[subject]) quizzes[subject] = {};
    quizzes[subject][topic] = questions;
    localStorage.setItem("quizzes", JSON.stringify(quizzes));

    alert("Quiz saved successfully!");
    location.reload();
}
