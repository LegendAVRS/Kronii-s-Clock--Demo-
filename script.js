import Clock from "./Clock.js"

let myClock = new Clock(1, 1, 1, document.querySelector(".clock"));

console.log(myClock);
myClock.setTime();
myClock.stopClock();
