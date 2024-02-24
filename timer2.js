let timerInterval;
let targetDate = new Date('2024-12-31T23:59:59').getTime();
let isPaused = false;
let initialTime;

function start(timer) {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer(timer), 1000);
    }
}

function pause() {
    isPaused = true;
}

function resume() {
    isPaused = false;
}

function stop(timer) {
    clearInterval(timerInterval);
    timerInterval = null;
    reset();
}

function update() {
    if (!isPaused) {
        const currentDate = new Date().getTime();
        const timeDifference = targetDate - currentDate;

        if (timeDifference > 0) {
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const formattedTime = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
            document.getElementById(timer).innerHTML = formattedTime;
        } else {
            stop();
            document.getElementById(timer).innerHTML = '00:00:00';
            alert('Countdown expired!');
        }
    }
}

function reset(timer) {
    document.getElementById(timer).innerHTML = '00:00:00';
    isPaused = false;
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}


export {
    start,
    pause,
    resume,
    stop
}