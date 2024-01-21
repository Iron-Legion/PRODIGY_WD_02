const timeEl = document.querySelector('h1');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsEl = document.querySelector('.laps');

let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapTimes = [];

function startStopwatch() {
  startTime = performance.now();
  isRunning = true;
  updateTime();
}

function pauseStopwatch() {
  isRunning = false;
}

function resetStopwatch() {
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  lapTimes = [];
  timeEl.textContent = '00:00:00.00';
  lapsEl.textContent = '';
}

function recordLap() {
  const lapTime = elapsedTime;
  lapTimes.push(lapTime);
  lapsEl.textContent += `Lap ${lapTimes.length}: ${formatTime(lapTime)}\n`;
}

function updateTime() {
  if (isRunning) {
    elapsedTime = performance.now() - startTime;
    timeEl.textContent = formatTime(elapsedTime);
    requestAnimationFrame(updateTime);
  }
}

function formatTime(time) {
  const milliseconds = Math.floor(time % 1000);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 60000) % 60);
  const hours = Math.floor(time / 3600000);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);