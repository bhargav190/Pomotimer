let startButton = document.getElementById("start-button");
let roundTitle = document.getElementById("round-title");
let timerDiv = document.getElementById("timer");
let round = 1;
let number = 25 * 60;

let timeParse = function (seconds) {
    let min, sec;

    min = Math.floor(seconds / 60);
    sec = seconds % 60;

    if (min < 10) min = "0" + min;
    else min = String(min);

    if (sec < 10) sec = "0" + sec;
    else sec = String(sec);


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


const displayTasks = function (tasks) {
    const taskList = document.getElementById('tasks-list');
    taskList.innerHTML = '';
    for (let task of tasks) {
        console.log(task);
        let taskDiv = document.createElement('div');
        taskDiv.classList += 'unselected';
        taskDiv.innerText = task.taskname + " - " + task.pomodoros + ' pomodoros';
        
        taskDiv.addEventListener('click', function(){
            document.getElementById('present-task').innerText = this.innerText;
            let selectedTask = document.getElementsByClassName('selected');
            if(selectedTask[0]){
                selectedTask[0].className = 'unselected';
            }
            this.className = 'selected';
        })

        taskList.appendChild(taskDiv);
    }
}

const retrieveTasks = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/tasks', true);
    xhr.setRequestHeader(
        "Content-type",
        "application/json;charset=UTF-8"
    );
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            displayTasks(JSON.parse(this.responseText));
        } else {
            alert(this.responseText);
        }
    };

    xhr.send();
}

let newTaskButton = document.getElementById('new-task-button');
newTaskButton.addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/addTask', true);
    xhr.setRequestHeader(
        "Content-type",
        "application/json;charset=UTF-8"
    );
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            retrieveTasks();
        } else {
            alert(this.responseText);
        }
    };

    let newTaskData = {
        taskname: document.getElementById('task-name-box').value,
        pomodoros: document.getElementById('pomodoros-box').value,
    };

    xhr.send(JSON.stringify(newTaskData));
});
retrieveTasks();