const digitalClock = document.getElementById('digitalClock');
const analogClock = document.getElementById('analogClock');
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const timerDisplay = document.getElementById('timerDisplay');
const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const alarmStatus = document.getElementById('alarmStatus');

let timerInterval;
let timerSeconds = 0;
let stopwatchInterval;
let stopwatchSeconds = 0;
let alarmTime;

document.getElementById('digitalBtn').addEventListener('click', () => {
    digitalClock.style.display = 'block';
    analogClock.style.display = 'none';
});

document.getElementById('analogBtn').addEventListener('click', () => {
    digitalClock.style.display = 'none';
    analogClock.style.display = 'block';
});

function updateClocks() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    digitalClock.innerText = now.toLocaleTimeString();

    const hourDeg = (hours + minutes / 60) * 30;
    const minuteDeg = (minutes + seconds / 60) * 6;
    const secondDeg = seconds * 6;

    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

setInterval(updateClocks, 1000);

document.getElementById('setAlarm').addEventListener('click', () => {
    const alarmInput = document.getElementById('alarmTime').value;
    if (alarmInput) {
        alarmTime = new Date();
        alarmTime.setHours(alarmInput.split(':')[0]);
        alarmTime.setMinutes(alarmInput.split(':')[1]);
        alarmTime.setSeconds(0);
        alarmStatus.innerText = `Alarm set for ${alarmTime.toLocaleTimeString()}`;
    }
});

setInterval(() => {
    if (alarmTime && new Date() >= alarmTime) {
        alarmStatus.innerText = 'Alarm ringing!';
        const audio = new Audio('alarm-sound.mp3'); // Add your alarm sound file
        audio.play();
        alarmTime = null; // Reset alarm
    }
}, 1000);

document.getElementById('startTimer').addEventListener('click', () => {
    const timerInput = document.getElementById('timerInput').value;
    if (timerInput) {
        timerSeconds = timerInput * 60;
        timerInterval = setInterval(() => {
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerDisplay.innerText = '00:00';
                return;
            }
            timerSeconds--;
            const minutes = Math.floor(timerSeconds / 60);
            const seconds = timerSeconds % 60;
            timerDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }
});

document.getElementById('stopTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 0;
    timerDisplay.innerText = '00:00';
});

document.getElementById('startStopwatch').addEventListener('click', () => {
    if (stopwatchInterval) return;
    stopwatchInterval = setInterval(() => {
        stopwatchSeconds++;
        const minutes = Math.floor(stopwatchSeconds / 60);
        const seconds = stopwatchSeconds % 60;
        stopwatchDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
});

document.getElementById('stopStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
});

document.getElementById('resetStopwatch').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchSeconds = 0;
    stopwatchDisplay.innerText = '00:00';
});