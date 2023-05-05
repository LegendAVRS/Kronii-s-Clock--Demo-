import Clock from "./Clock.js";

let myClock = new Clock(1, 1, 30, document.querySelector(".clock"));

let intervalRate = 10;
let currentTimeInterval = setInterval(myClock.updateClockCurrentTime, intervalRate);
let sfxInterval = null;
let setTimeInterval = null; 


myClock.updateClockCurrentTime();

let optionBar = document.querySelector(".setting-bar");
let navButton = document.querySelector("#setting-icon");
let inputHour = document.querySelector("#input-hour");
let inputMinute = document.querySelector("#input-minute");
let inputSecond = document.querySelector("#input-second");
let setButton = document.querySelector("#set-button");
let pauseButton = document.querySelector("#pause-button");
let resetButton = document.querySelector("#reset-button");
let bgmCheck = document.querySelector("#check-bgm");
let smoothCheck = document.querySelector("#check-smooth");
let sfxCheck = document.querySelector("#check-sfx");
let showCheck = document.querySelector("#check-show");
let timeBox = document.querySelector("#time-label-box");

function closeOptionBar(event) {
  optionBar.classList.toggle("close");
}

let setTime = (event) => {
  clearInterval(currentTimeInterval);
  if (setTimeInterval !== null)  clearInterval(setTimeInterval);
  myClock.setTime(parseInt(inputHour.value), parseInt(inputMinute.value), parseInt(inputSecond.value));
  setTimeInterval = setInterval(myClock.updateClockSetTime, intervalRate);
};

let isPaused = false;
let pauseTime = (event) => {
  if (isPaused) {
    if (!myClock.setMode) currentTimeInterval = setInterval(myClock.updateClockCurrentTime,intervalRate);
    else setTimeInterval = setInterval(myClock.updateClockSetTime,intervalRate);
    pauseButton.textContent = "Pause";
  } else {
    clearInterval(currentTimeInterval);
    clearInterval(setTimeInterval);
    pauseButton.textContent = "Continue";
  }
  isPaused = !isPaused;
};

let resetTime = (event) => {
  clearInterval(setTimeInterval);
  clearInterval(currentTimeInterval);
  currentTimeInterval = setInterval(myClock.updateClockCurrentTime,intervalRate);
};

let bgm = new Audio("bgm.mp3");
bgm.loop = true;
let toggleMusic = (event) => {
    if (bgmCheck.checked) {
        bgm.play();
    }
    else {
        bgm.pause();
    }

}

let toggleSFX = (event) => {
  myClock.sfxOn = !myClock.sfxOn;
}

let toggleSmooth = (event) => {
  if (smoothCheck.checked) {
    intervalRate = 10;
  }
  else {
    intervalRate = 1000;
  }
  if (myClock.setMode) {
    clearInterval(setTimeInterval);
    setTimeInterval = setInterval(myClock.updateClockSetTime, intervalRate);
  }
  else {
    clearInterval(currentTimeInterval);
    currentTimeInterval = setInterval(myClock.updateClockCurrentTime, intervalRate);
  }
}

let toggleShow = (event) => {
  timeBox.classList.toggle("hide");
}

smoothCheck.checked = true;
showCheck.checked = true;


navButton.addEventListener("click", closeOptionBar);
pauseButton.addEventListener("click", pauseTime);
setButton.addEventListener("click", setTime);
resetButton.addEventListener("click", resetTime);
bgmCheck.addEventListener("click", toggleMusic);
smoothCheck.addEventListener("click", toggleSmooth);
showCheck.addEventListener("click", toggleShow);
sfxCheck.addEventListener("click", toggleSFX);