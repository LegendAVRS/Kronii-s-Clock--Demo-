class Clock {
  constructor(hour, minute, second, clock) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;

    // Sets update period to n miliseconds
    this.interval = 1000;

    // Sets CSS clock element values
    this.clock = clock;
    this.isRunning = true;
    this.clock.addEventListener("click", this.activateClock);

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
  }

  // Pauses or continues the clock
  activateClock = (event) => {
    if (this.isRunning) {
      this.stopClock();
    } else {
      this.continueClock();
    }

    this.isRunning = !this.isRunning;
  };

  stopClock = () => {
    this.hourHand.style.animationPlayState = "paused";
    this.minuteHand.style.animationPlayState = "paused";
    this.secondHand.style.animationPlayState = "paused";
  };

  continueClock = () => {
    this.hourHand.style.animationPlayState = "running";
    this.minuteHand.style.animationPlayState = "running";
    this.secondHand.style.animationPlayState = "running";
  };

  setCurrentHands = (cssVarFirst, cssVarSecond, angle) => {
    document.documentElement.style.setProperty(cssVarFirst, `${angle}deg`);
    document.documentElement.style.setProperty(
      cssVarSecond,
      `${angle + 360}deg`
    );
  };

  rotateHands = (element, angle) => {
    element.style.setProperty('--angle', `${angle}deg`);
  };

  // Updates the current time after a set interval
  updateTime =  () => {
      let currentDate = new Date();
      this.second = currentDate.getSeconds() + currentDate.getMilliseconds() / 1000;
      this.minute = currentDate.getMinutes() + this.second / 60;
      this.hour = currentDate.getHours() + this.minute / 60;
      this.rotateHands(this.secondHand, this.#convertSecondToAngle(this.second));
      this.rotateHands(this.minuteHand, this.#convertMinuteToAngle(this.minute));
      this.rotateHands(this.hourHand, this.#convertHourToAngle(this.hour)); 
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

  #secondToMinuteOffset = (seconds) => {
    return (seconds % 60) * (6 / 60);
  }

  #minuteToHourOffset = (minutes) => {
    return (minutes % 60) * (6 / 12);
  }
}

export default Clock;
