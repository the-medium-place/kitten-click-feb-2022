// TODO: CREATE VARIABLES TO REFERENCE HTML ELEMENTS
// TODO: AND REQUIRED VALUES FOR GAME FUNCTIONALITY
var kittenList = [
    {
        source: 'https://placekitten.com/400/400',
        description: 'Lookit this little cutie!'
    },
    {
        source: 'https://placekitten.com/642/573',
        description: '❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️'
    },
    {
        source: 'https://placekitten.com/528/174',
        description: 'I want to pet!!!!!'
    },
    {
        source: 'https://placekitten.com/452/745',
        description: 'too cute!?!'
    },
    {
        source: 'https://placekitten.com/753/458',
        description: 'This one is kinda weird lookin..'
    },
    {
        source: 'https://placekitten.com/635/498',
        description: 'So many kittens!'
    },
    {
        source: 'https://placekitten.com/257/800',
        description: 'what a fuzzy little face!!!!!'
    },
    {
        source: 'https://www.fillmurray.com/640/360',
        description: 'BEST ONE OF ALL!!!!!'
    },

]

var image = document.querySelector(".kitten-img");
var kittenDesc = document.querySelector(".kitten-desc");
var startBtn = document.querySelector(".start-btn");
var clickBtn = document.querySelector(".click-me");
var timerText = document.querySelector(".timer");
var scoresUl = document.querySelector(".scores-list");

var timer = 5;
var score = 0;

var kittenIndex = 0;

var savedScores = JSON.parse(localStorage.getItem("score")) || []
console.log(savedScores);
// TODO: INITIALIZE PAGE WITH STARTER VALUES/IMAGES, RENDER ANY SAVED SCORES
function init() {
    clickBtn.style.display = "none"
    renderKitten();
    renderScores();
}

function renderKitten() {
    image.setAttribute("src", kittenList[kittenIndex].source);
    kittenDesc.textContent = kittenList[kittenIndex].description;

}

init();

startBtn.addEventListener("click", startGame)
// TODO: USER CLICKS START BUTTON TO START GAME - 
// ==================
// GAME FUNCTIONALITY
// ==================
function startGame() {
    // TODO: HIDE START BUTTON
    startBtn.style.display = "none";

    // TODO: SHOW CLICK BUTTON
    clickBtn.style.display = "block"

    // TODO: SHOW KITTEN IMG AND DESCRIPTION
    // TODO: START TIMER AND SHOW ON PAGE
    var gameTimer = setInterval(() => {
        timer--;
        timerText.textContent = timer;

        if (timer <= 0) {
            clearInterval(gameTimer);
            endGame()
        }
    }, 1000);

    // TODO: USER CLICKS 'CLICK ME' BUTTON --
    // TODO: INCREMENT THROUGH ARRAY OF KITTENS AND SCORE
    clickBtn.addEventListener("click", function () {
        score++;
        kittenIndex++;
        if (kittenIndex > kittenList.length) { kittenIndex = 0 }
        renderKitten();
    })


}






// TODO: TIMER RUNS OUT, GAME HAS ENDED
// ======================
// END-GAME FUNCTIONALITY
// ======================
function endGame() {
    // TODO: GET USER INITIALS
    var userInits = window.prompt("What are you Initials?")
    // TODO: SAVE USER/SCORE TO LOCALSTORAGE
    var userObj = {
        userInits,
        score
    }
    // UPDATE SAVED SCORE DATA (ARRAY)
    savedScores.push(userObj);
    // SET LOCAL STORAGE TO UPDATED DATA (STRINGIFIED)
    localStorage.setItem("score", JSON.stringify(savedScores))

    alert("Here is your score, " + userInits + "\nScore: " + score)
    // TODO: RESET PAGE AND VARIABLES FOR NEW GAME
    startBtn.style.display = "block";
    clickBtn.style.display = "none";
    kittenIndex = 0;
    timer = 5;
    score = 0;
    // TODO: ...AND SHOW/RENDER SCORES
    renderScores();
}

function renderScores() {
    for (let i = 0; i < savedScores.length; i++) {
        const element = savedScores[i];
        var newLi = document.createElement("li")
        newLi.textContent = element.userInits + " -- " + element.score
        scoresUl.appendChild(newLi);

    }
}
