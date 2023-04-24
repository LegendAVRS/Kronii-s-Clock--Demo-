class Clock {
  constructor(hour, minute, second, clock) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;

    // Sets update period to n seconds
    this.interval = 1;

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

    // Sets time object
    this.timeObject = new Date();
  }

  // Pauses or continues the clock
  activateClock = (event) => {
    let animationPlayValue = "paused";
    if (this.isRunning) {
      animationPlayValue = "running";
    }

    this.hourHand.style.animationPlayState = animationPlayValue;
    this.minuteHand.style.animationPlayState = animationPlayValue;
    this.secondHand.style.animationPlayState = animationPlayValue;

    this.isRunning = !this.isRunning;
  };

  stopClock = () => {
    this.hourHand.style.animationPlayState = "paused";
    this.minuteHand.style.animationPlayState = "paused";
    this.secondHand.style.animationPlayState = "paused";
  }

  // Sets the clock's time to the given values
  setTime = (hour, minute, second) => {
    this.hour = this.timeObject.getHours();
    this.minute = this.timeObject.getMinutes();
    this.second = this.timeObject.getSeconds();

    this.drawInitialTime();
  };

  drawHand = (cssVarFirst, cssVarSecond, angle) => {
    document.documentElement.style.setProperty(cssVarFirst, `${angle}deg`);
    document.documentElement.style.setProperty(
      cssVarSecond,
      `${angle + 360}deg`
    );
  };

  // Sets the initial positions of the clock's hands
  drawInitialTime = () => {
    this.drawHand(
      "--spin-minute-first-angle",
      "--spin-minute-final-angle",
      this.#convertSecondToAngle(this.minute)
    );
    
    this.drawHand(
      "--spin-hour-first-angle",
      "--spin-hour-final-angle",
      this.#convertHourToAngle(this.hour)
    );
    
    this.drawHand(
      "--spin-second-first-angle",
      "--spin-second-final-angle",
      this.#convertSecondToAngle(this.second)
    );

  };

  // Updates the current time with after a set interval
  updateTime = () => {};

  // Returns the angle of the respective time
  #convertSecondToAngle = (seconds) => {
    return (seconds % 60) * (360 / 60);
  };

  #convertMinuteToAngle = (minutes) => {
    return (minutes % 60) * (360 / 60);
  };

  #convertHourToAngle = (hours) => {
    return(hours % 60) * (360 / 12);
  };
}

export default Clock;
