document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        {
            question: "Как часто что-то там бывает?",
            options: [
                "Никогда",
                "Бывает",
                "Не бывает",
                "Всегда"
            ]
        },
        {
            question: "Вопрос 2",
            options: [
                "Вариант 1",
                "Вариант 2",
                "Вариант 3",
                "Вариант 4"
            ]
        }
    ];

    const form = document.getElementById("testForm");
    const questionsContainer = document.getElementById("questionsContainer");
    const nameInput = document.getElementById("name");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const answers = [];
        const inputs = document.querySelectorAll("select[name='answer']");
        inputs.forEach(function(input) {
            answers.push(parseInt(input.value));
        });

        const score = calculateScore(answers);
        const name = nameInput.value;

        localStorage.setItem("score", score);
        localStorage.setItem("name", name);

        window.location.href = "results.html";
    });

    function calculateScore(answers) {
        let score = 0;
        for (let i = 0; i < answers.length; i++) {
            const answer = parseInt(answers[i]);
            score += answer;
        }
        return score;
    }

    function createQuestionElement(question) {
        const div = document.createElement("div");
        div.innerHTML = question.question;
        div.style.display = "block";

        const select = document.createElement("select");
        select.name = "answer";
        select.style.display = "block";

        question.options.forEach(function(option, index) {
            const optionElement = document.createElement("option");
            optionElement.value = index;
            optionElement.text = option;
            select.appendChild(optionElement);
        });

        div.appendChild(select);

        return div;
    }

    questions.forEach(function(question) {
        const questionElement = createQuestionElement(question);
        questionsContainer.appendChild(questionElement);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const resultsContainer = document.getElementById("resultsContainer");
    const score = localStorage.getItem("score");
    const name = localStorage.getItem("name");
    const resultElement = document.createElement("p");
    resultElement.innerHTML = "Имя: " + name + "<br>Количество баллов: " + score;
    resultsContainer.appendChild(resultElement);
});