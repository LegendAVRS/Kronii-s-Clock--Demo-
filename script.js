import Clock from "./Clock.js"

let myClock = new Clock(1, 1, 30, document.querySelector(".clock"));

setInterval(myClock.updateTime, 1);
myClock.updateTime();
// myClock.stopClock();

