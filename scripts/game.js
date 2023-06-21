const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What are the common components of an organic garden?',
        choice1: 'Worms',
        choice2: 'Dead plant material',
        choice3: 'Living plant material',
        choice4: 'All of the above',
        answer: 4,
    },

    {
        question: 'What are the advantages of organic gardening?',
        choice1: 'Healthier plants, furits and vegetables',
        choice2: 'Safe for bees and ladybugs',
        choice3: 'Limits chemical exposure to the body',
        choice4: 'All of the above',
        answer: 4,
    },

    {
        question: 'What is the ideal height for a garden bed?',
        choice1: 'Ground level',
        choice2: '100 mm',
        choice3: '200 mm',
        choice4: '400 mm',
        answer: 3,
    },

    {
        question: 'When is it best to dig your vegetable garden?',
        choice1: 'Lightly dig the beds before planting',
        choice2: 'Not at all',
        choice3: 'At the finish of the growing season',
        choice4: 'Twice a year',
        answer: 2,
    },

    {
        question: 'When is the right time to water plants in an organic garden?',
        choice1: 'Anytime',
        choice2: 'Morning',
        choice3: 'Noon',
        choice4: 'Evening',
        answer: 2,
    },

    {
        question: 'What is used by organic gardeners to enrich the soil?',
        choice1: 'Antibiotics',
        choice2: 'Pesticides',
        choice3: 'Continuous turning',
        choice4: 'Manure from animals',
        answer: 4,
    },

    {
        question: 'Mulching is a practice important to organic gardening, as it promotes...',
        choice1: 'Disease control',
        choice2: 'Weed suppression',
        choice3: 'Slug control',
        choice4: 'Insect control',
        answer: 2,
    },

    {
        question: 'A great slug killer (they drown in it) is...',
        choice1: 'Wine',
        choice2: 'Coffee',
        choice3: 'Beer',
        choice4: 'Tea',
        answer: 3,
    },

    {
        question: 'Of the 17 Essential Elements for plant growth, identify the three Primary Macronutrients',
        choice1: 'Oxygen (O), Carbon (C), Hydrogen (H)',
        choice2: 'Boron (B), Chloride (Cl), Manganese (Mn)',
        choice3: 'Calcium (Ca), Magnesium (Mg), Sulfur (S)',
        choice4: 'Nitrogen (N), Phosphorus (P), Potassium (K)',
        answer: 4,
    },

    {
        question: 'During composting, microbes Mineralize organic Nitrogen over time, and convert it to plant-useable Nitrogen, in the form of...',
        choice1: 'Ammonia NH3 and Nitrite NO2-',
        choice2: 'Ammonium NH4+ and Nitrate NO3-',
        choice3: 'Nitrogen gas N2 and Nitric oxide NO',
        choice4: 'Nitrous oxide N2O and Urea CO(NH2)2',
        answer: 2,
    },
];




//  From Line 64 and 65 of game.html [temporary insertion of ' id = "myElement1" ']...

/*          <p class="choice-prefix">A</p>
            <p class="choice-text" data-number = "1" id = "myElement1">Choice</p> 

//  then, Attempt to use getElementById method on choice1 [Line 96 to 105]...
    {
        question: 'During composting, microbes Mineralize organic Nitrogen over time, and convert it to plant-useable Nitrogen, in the form of...',
        choice1: 'Ammonia NH<sub>3</sub> and Nitrite NO<sub>2</sub><sup>-</sup>',
        choice2: 'Ammonium NH<sub>4</sub><sup>+</sup> and Nitrate NO<sub>3</sub><sup>-</sup>',
        choice3: 'Nitrogen gas N<sub>2</sub> and Nitric oxide NO',
        choice4: 'Nitrous oxide N<sub>2</sub>O and Urea CO(NH<sub>2</sub>)<sub>2</sub>',
        answer: 2,
    },
];

document.getElementById("myElement1").innerHTML = 'Ammonia NH<sub>3</sub> and Nitrite NO<sub>2</sub><sup>-</sup>';
*/



/*
var string = 'NH3'
    result = string.replace(/\d+/g, '<sub>$&</sub>');

    document.body.innerHTML += result;
*/


/*
var string = 'NH3',
    result = string
    .split(/(\d+)/)
    .map((s, i) => i % 2 ? `<sub>${s}</sub>` : s)
    .join('');

console.log(result)
document.write(result)
*/


/*
        choice1: 'Ammonia NH<sub>3</sub> and Nitrite NO<sub>2</sub><sup>-</sup>',
        choice2: 'Ammonium NH<sub>4</sub><sup>+</sup> and Nitrate NO<sub>3</sub><sup>-</sup>',
        choice3: 'Nitrogen gas N<sub>2</sub> and Nitric oxide NO',
        choice4: 'Nitrous oxide N<sub>2</sub>O and Urea CO(NH<sub>2</sub>)<sub>2</sub>',
*/


/*
entryfootnote "NH" {sub "3"}"; 
entryfootnote "NO" {sub "2"} {sup"-"};
*/


// str = str.replace(/NH3/g,"$1<sub>3</sub>");


/*
  const formatted = arr[0].options.map(elem => elem.replace(/(\d)/g, `<sub>$1</sub>`));
  
  console.log(formatted);
  document.body.innerHTML = formatted;


  const formatted = arr[0].options.map(elem => elem.replace(/(\d)/g, `<sup>$1</sup>`));
  
  console.log(formatted);
  document.body.innerHTML = formatted;
*/





const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startGame();
