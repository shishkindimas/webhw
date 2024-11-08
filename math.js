let level = 'primary';
let correctCount = 0;
let incorrectCount = 0;
let questionsAsked = [];
const totalQuestionsPerLevel = 10; // Количество вопросов на каждом уровне
let timeElapsed = 0;
let timer;
let currentQuestionAnswer; // Переменная для хранения правильного ответа

const levels = {
    primary: { operator: ['+', '-', '*'], maxNum: 10 }, // Убрали деление
    average: { operator: ['>', '<'], maxNum: 20 },
    advanced: { operator: ['+', '*'], maxNum: 5 } // Операции с двоичными числами
};

function startGame() {
    correctCount = 0;
    incorrectCount = 0;
    questionsAsked = [];
    timeElapsed = 0;
    document.getElementById('correct-count').innerText = correctCount;
    document.getElementById('incorrect-count').innerText = incorrectCount;

    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById('time').innerText = `Времени прошло: ${timeElapsed}`;
    }, 1000);

    askQuestion();
}

function askQuestion() {
    if (questionsAsked.length >= totalQuestionsPerLevel) {
        checkLevelUp(); // Проверяем, нужно ли переходить на следующий уровень
        return;
    }

    const question = generateQuestion();
    currentQuestionAnswer = question.answer; // Сохраняем правильный ответ
    document.getElementById('question').innerText = question.text;
}

function generateQuestion() {
    let operators = levels[level].operator;

    let num1 = Math.floor(Math.random() * levels[level].maxNum);
    let num2 = Math.floor(Math.random() * levels[level].maxNum);

    let operatorIndex = Math.floor(Math.random() * operators.length);
    let operator = operators[operatorIndex];

    let questionText, correctAnswer;

    if (level === 'primary') {
        if (operator === '+') {
            questionText = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
        } else if (operator === '-') {
            questionText = `${num1} - ${num2}`;
            correctAnswer = num1 - num2;
        } else if (operator === '*') {
            questionText = `${num1} * ${num2}`;
            correctAnswer = num1 * num2;
        }
    } else if (level === 'average') {
        if (operator === '>') {
            questionText = `${num1} > ${num2}`;
            correctAnswer = (num1 > num2) ? 1 : 0; // true как 1, false как 0
        } else if (operator === '<') {
            questionText = `${num1} < ${num2}`;
            correctAnswer = (num1 < num2) ? 1 : 0; // true как 1, false как 0
        }
    } else if (level === 'advanced') {
        let binaryNum1 = num1.toString(2);
        let binaryNum2 = num2.toString(2);
        
        if (operator === '+') {
            questionText = `${binaryNum1} + ${binaryNum2} (в двоичном виде)`;
            correctAnswer = parseInt(binaryNum1, 2) + parseInt(binaryNum2, 2); // Сложение в десятичном формате
        } else if (operator === '*') {
            questionText = `${binaryNum1} * ${binaryNum2} (в двоичном виде)`;
            correctAnswer = parseInt(binaryNum1, 2) * parseInt(binaryNum2, 2); // Умножение в десятичном формате
        }
    }

    questionsAsked.push(questionText);

    return { text: questionText, answer: correctAnswer };
}

document.getElementById('submit').addEventListener('click', () => {
    const userAnswer = document.getElementById('answer').value.trim();

    if (userAnswer === '') return;

    // Проверяем введенный пользователем ответ с сохраненным правильным ответом
    if ((userAnswer === 'undefined' && currentQuestionAnswer === 'undefined') || parseInt(userAnswer) === currentQuestionAnswer) { 
        correctCount++;
        document.getElementById('result').innerHTML =
            "Верно!";

        setTimeout(() => { 
            document.getElementById('result').innerHTML = ''; 
            askQuestion(); // Задаем новый вопрос после правильного ответа
        }, 2000);
        
        updateScoreboard();

    } else {
        incorrectCount++;
        document.getElementById('result').innerHTML =
            "Неверно, попробуй еще раз!";

        setTimeout(() => { 
            document.getElementById('result').innerHTML = ''; 
            askQuestion(); // Задаем новый вопрос даже после неверного ответа
        }, 2000);
        
        if (incorrectCount >= totalQuestionsPerLevel) endGame();
        updateScoreboard();
        
    }
});

function updateScoreboard() {
    document.getElementById('correct-count').innerText = correctCount;
    document.getElementById('incorrect-count').innerText = incorrectCount;
}

function checkLevelUp() {
   const totalCorrectAnswersNeededForLevelUp = Math.ceil(totalQuestionsPerLevel * 0.8); // Нужно минимум 80%
   
   if (correctCount >= totalCorrectAnswersNeededForLevelUp) {
       if (level === 'primary') level = 'average';
       else if (level === 'average') level = 'advanced';
       else endGame(); // Завершить игру после всех уровней

       questionsAsked.length = 0; // Сбрасываем вопросы
       askQuestion(); // Задаем новый вопрос
       document.getElementById('level').innerText = `Level: ${level}`; // Обновляем уровень на экране
   } else {
       endGame(); // Если не хватает правильных ответов, игра заканчивается
   }
}

function endGame() {
   clearInterval(timer);
   alert(`Игра окончена! Правильные ответы: ${correctCount}, Неправильные ответы: ${incorrectCount}`);
   document.getElementById('restart').style.display = "block";
}

document.getElementById('restart').addEventListener('click', () => {
   level = 'primary';
   document.getElementById('level').innerText = `Level: ${level}`;
   startGame();
});

// Запуск игры при загрузке страницы
startGame();