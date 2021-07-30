let startButton = document.getElementById("start-button");
let roundTitle = document.getElementById("round-title");
let timerDiv = document.getElementById("timer");
let round = 1;
let number = 25 * 60;
let timeParse = function (seconds) {
    let min, sec;
    min = Math.floor(seconds / 60);
    sec = seconds - min * 60;
    return min + ":" + sec;
}

let updater;
let updateTimer = function () {
    if (number > 0) {
        number--;
        timerDiv.innerText = timeParse(number);
        if (number === 0) {
            clearInterval(updater);

            round++;

            startButton.disabled = false;

            if (round % 9 === 0) {
                roundTitle.innerText = "Long Break"
                number = 30 * 60;
            }
            else if ((round % 9) % 2 === 1) {
                roundTitle.innerText = "Pomodoro"
                number = 25 * 60;
            }
            else {
                roundTitle.innerText = "Short Break"
                number = 5 * 60;
            }

            timerDiv.innerText = timeParse(number);
        }
    }
}

let startTimer = function () {
    console.log('start clicked');
    updater = setInterval(updateTimer, 1000);
    startButton.disabled = true;
}

startButton.addEventListener("click", startTimer);
