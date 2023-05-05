class Clock {
  constructor(hour, minute, second, clock) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;

    this.miliSecond = 0;

    this.oldMin = this.minute;
    this.oldHour = this.hour;

    // Sets update period to n miliseconds
    this.interval = 1000;

    // Sets CSS clock element values
    this.clock = clock;
    this.isRunning = true;
    this.clock.addEventListener("click", this.activateClock);

    this.setMode = false;
    this.smoothMode = true;

    this.clock.childNodes.forEach((element) => {
      switch (element.id) {
        case "hour":
          this.hourHand = element;
          break;
        case "minute":
          this.minuteHand = element;
          break;
        case "second":
          this.secondHand = element;
          break;
        case "core":
          this.core = element;
          break;
        case "ring":
          this.ring = element;
          break;
      }
    });

    this.timeLabel = document.querySelector("#time-label-box");

    this.sfxOn = false;
    this.isTickTurn = true;
    this.tickSFX = new Audio("tick.mp3");
    this.tockSFX = new Audio("tock.mp3");
    this.tockSFX.volume = this.tickSFX.volume = 0.3;
  }

  // Rotates clock hand
  rotateHand = (element, angle) => {
    element.style.setProperty("--angle", `${angle}deg`);
  };

  // Updates the current time after a set interval
  updateClockCurrentTime = () => {
    let currentDate = new Date();
    this.second =
      currentDate.getSeconds() + currentDate.getMilliseconds() / 1000;
    this.minute = currentDate.getMinutes() + this.second / 60;
    this.hour = currentDate.getHours() + this.minute / 60;

    this.rotateHand(this.secondHand, this.#convertSecondToAngle(this.second));
    this.rotateHand(this.minuteHand, this.#convertMinuteToAngle(this.minute));
    this.rotateHand(this.hourHand, this.#convertHourToAngle(this.hour));

    this.oldTimeLabelText = this.timeLabel.textContent;
    this.timeLabel.textContent = this.timeToString();
    if (this.timeLabel.textContent !== this.oldTimeLabelText && this.sfxOn) {
      this.playSFX();
    }
  };

  playSFX = () => {
    if (this.isTickTurn) this.tickSFX.play();
    else this.tockSFX.play();
    this.isTickTurn = !this.isTickTurn;
  }

  timeToString = () => {
    let secondString =
      this.second >= 10 ? Math.floor(this.second).toString() : `0${Math.floor(this.second).toString()}`;
    let minuteString =
      this.minute >= 10 ? Math.floor(this.minute).toString() : `0${Math.floor(this.minute).toString()}`;
    let hourString =
      this.hour >= 10 ? Math.floor(this.hour).toString() : `0${Math.floor(this.hour).toString()}`;

    return `${hourString}:${minuteString}:${secondString}`;
  };

  setTime = (hour, minute, second) => {
    this.hour = hour;
    this.minute = minute;
    this.second = second;

    this.origHour = hour;
    this.origMinute = minute;
    this.origSecond = second;

    this.origDate = new Date();

    this.miliSecond = 0;
  };

  updateClockSetTime = () => {
    let tempDate = new Date();
    let timeDif = tempDate - this.origDate;

    this.second = this.origSecond + timeDif / 1000;
    this.minute = this.origMinute + this.second / 60;
    this.hour = this.origHour + this.minute / 60;

    if (this.second >= 60) {
      this.second = 0;
      this.origMinute++;
    }

    if (this.minute >= 60) {
      this.minute = 0;
      this.origHour++;
    }

    this.hour %= 24;

    this.rotateHand(this.secondHand, this.#convertSecondToAngle(this.second));
    this.rotateHand(this.minuteHand, this.#convertMinuteToAngle(this.minute));
    this.rotateHand(this.hourHand, this.#convertHourToAngle(this.hour));
  };

  // Returns the angle of the respective time
  #convertSecondToAngle = (seconds) => {
    return seconds * (360 / 60);
  };

  #convertMinuteToAngle = (minutes) => {
    return minutes * (360 / 60);
  };

  #convertHourToAngle = (hours) => {
    return hours * (360 / 12);
  };
}

export default Clock;
