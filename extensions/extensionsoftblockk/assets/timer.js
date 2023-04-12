const ONCE_TIMER_ENDS = Object.freeze({
  UNPUBLISH_TIMER: "UNPUBLISH_TIMER",
  SHOW_CUSTOM_TITLE: "SHOW_CUSTOM_TITLE",
  DO_NOTHING: "DO_NOTHING",
});

// const TIMER_POSITION_TYPE = Object.freeze({
//   ALL_PRODUCTS: "ALL_PRODUCTS",
//   SPECIFIC_PRODUCTS: "SPECIFIC_PRODUCTS",
//   CUSTOM_POSITION: "CUSTOM_POSITION",
// });

// const TIMER_POSITION = Object.freeze({
//   TOP_BOTTOM_BAR: "TOP_BOTTOM_BAR",
//   PRODUCTS_PAGE: "PRODUCTS_PAGE",
// });

const getTimerConfig = async () => {
  const timerIdTagList = document.getElementsByTagName("timer-block--parent");
  // console.log(timerIdTagList);
  const timerList = [];
  for (let i = 0; i < timerIdTagList.length; i++) {
    const timerId = timerIdTagList[i].getAttribute("timerId");
    if (timerId) {
      const url =
        "https://timerbackend.onrender.com" + `/getTimerById/${timerId}`;
      const resp = (await fetch(url)).json();
      timerList.push(resp);
    }
  }

  return await Promise.all(timerList);
};

// This function will start the timer
const startTimer = (duration, timerResponse, index) => {
  const daysElement = document.getElementById(
    `timer-day_${timerResponse._id}-${index}`
  );
  const hoursElement = document.getElementById(
    `timer-hours_${timerResponse._id}-${index}`
  );
  const minutesElement = document.getElementById(
    `timer-minutes_${timerResponse._id}-${index}`
  );
  const secondsElement = document.getElementById(
    `timer-seconds_${timerResponse._id}-${index}`
  );

  let remainingTime = duration;

  const intervalId = setInterval(() => {
    remainingTime -= 1000;

    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    const minutes = Math.floor(
      (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
    );
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

    daysElement.textContent = ("0" + `${days}`).slice(-2);
    hoursElement.textContent = ("0" + `${hours}`).slice(-2);
    minutesElement.textContent = ("0" + `${minutes}`).slice(-2);
    secondsElement.textContent = ("0" + `${seconds}`).slice(-2);

    if (remainingTime === 0) {
      clearInterval(intervalId);
      // calling the once timer end function

      performOnceTimerEndsFunction(timerResponse);
    }
  }, 1000);
};

// This function will prevent timer to be displayed before start date
const shouldDisplayTimerFunction = (timerData) => {
  if (!timerData.isPublished) {
    return false;
  }
  if (timerData.timerStatingDateType === "LATER") {
    const startDate = new Date(`${timerData.startDate}`);

    if (!startDate) {
      return true;
    }

    let startDateHours = timerData.startDateHours;
    let startDateMinutes = timerData.startDateMinutes;
    const today = new Date();

    if (!startDateHours) {
      startDateHours = 0;
    }
    if (!startDateMinutes) {
      startDateMinutes = 0;
    }

    const totalStartTime =
      startDate.getTime() +
      startDateHours * 60 * 60 * 1000 +
      startDateMinutes * 60 * 1000;
    if (today.getTime() < totalStartTime) {
      return false;
    }
  }
  return true;
};

// After getting the timer config we call api and change the whole innder HTML of liquid block
getTimerConfig().then((timerList) => {
  if (!timerList || timerList.length < 1) {
    return;
  }

  const timerTotalList = {};

  timerList.forEach((timer) => {
    if (timerTotalList[timer._id] === undefined) {
      timerTotalList[timer._id] = [timer];
    } else {
      timerTotalList[timer._id].push(timer);
    }
  });

  for (const timerId in timerTotalList) {
    timerTotalList[timerId].forEach((timer, index) => {
      // console.log(index, timer);
      const shouldDisplayTimer = shouldDisplayTimerFunction(timer);

      if (!shouldDisplayTimer) {
        return;
      }

      // const parentElement = document.getElementById("timer-block--parent");
      const listOfDivsElement = document.querySelectorAll(
        `[timerId="${timer._id}"]`
      );

      console.log(listOfDivsElement);
      // 2 - a , 0, 2
      // 2 - b. 1, 3
      const appBlock = listOfDivsElement[index];

      // if (listOfDivsElement.length > 1) {
      // appBlock = listOfDivsElement[index];
      // } else {
      //   appBlock = listOfDivsElement[0];
      // }

      // console.log(appBlock, index);
      // return;
      const parentElement = document.createElement("div");
      parentElement.setAttribute("id", timer._id + index);
      appBlock.append(parentElement);

      // as soon as the api is called we will show the timer
      parentElement.innerHTML = `
        <div id="title_${timer._id}-${index}" class="timely-header timely-bold">Hurry up!</div>
        <div id="subHeading_${timer._id}-${index}" class="timely-sub-header">Sales end in:</div>
        <div class="timely-timer">
          <span id="timer-day_${timer._id}-${index}" class="timely-bold">00</span>
          <span id="col1_${timer._id}-${index}" class="timely-bold">:</span>
          <span id="timer-hours_${timer._id}-${index}" class="timely-bold">00</span>
          <span id="col2_${timer._id}-${index}" class="timely-bold">:</span>
          <span id="timer-minutes_${timer._id}-${index}" class="timely-bold">00</span>
          <span id="col3_${timer._id}-${index}" class="timely-bold">:</span>
          <span id="timer-seconds_${timer._id}-${index}" class="timely-bold">00</span>
  
          <span id="legendDays_${timer._id}-${index}" class="time-type">Days</span>
          <span class="timely-opaq">.</span>
          <span id="legendHrs_${timer._id}-${index}" class="time-type">Hrs</span>
          <span class="timely-opaq">.</span>
          <span id="legendMins_${timer._id}-${index}" class="time-type">Mins</span>
          <span class="timely-opaq">.</span>
          <span id="legendSecs_${timer._id}-${index}" class="time-type">Secs</span>
        </div>`;

      setTimeout(function () {
        const titleElement = document.getElementById(
          `title_${timer._id}-${index}`
        );
        const subHeadingElement = document.getElementById(
          `subHeading_${timer._id}-${index}`
        );

        const timerDayElement = document.getElementById(
          `timer-day_${timer._id}-${index}`
        );
        const timerHoursElement = document.getElementById(
          `timer-hours_${timer._id}-${index}`
        );
        const timerMinElement = document.getElementById(
          `timer-minutes_${timer._id}-${index}`
        );
        const timerSecsElement = document.getElementById(
          `timer-seconds_${timer._id}-${index}`
        );
        const col1Element = document.getElementById(
          `col1_${timer._id}-${index}`
        );
        const col2Element = document.getElementById(
          `col2_${timer._id}-${index}`
        );
        const col3Element = document.getElementById(
          `col3_${timer._id}-${index}`
        );

        const legendDaysElement = document.getElementById(
          `legendDays_${timer._id}-${index}`
        );
        const legendHrsElement = document.getElementById(
          `legendHrs_${timer._id}-${index}`
        );
        const legendMinsElement = document.getElementById(
          `legendMins_${timer._id}-${index}`
        );
        const legendSecsElement = document.getElementById(
          `legendSecs_${timer._id}-${index}`
        );

        // AFTER API CHANGE CHANGE HERE
        titleElement.innerHTML = timer.title;
        subHeadingElement.innerHTML = timer.subHeading;

        // STYLE STARTS

        parentElement.style.paddingTop = `${timer.insideTopHeight}px`;
        parentElement.style.paddingBottom = `${timer.insideBottomHeight}px`;
        parentElement.style.marginTop = `${timer.outsideTopHeight}px`;
        parentElement.style.marginBottom = `${timer.outsideBottomHeight}px`;
        parentElement.style.borderStyle = "solid"; // FOR NOW WE WILL KEEP SOLID AS DEFAULT
        parentElement.style.borderWidth = `${timer.borderSize}px`;
        parentElement.style.borderColor = `#${timer.borderColor}`;
        parentElement.style.borderRadius = `${timer.cornerRadius}px`;

        if (timer.backgroundColorType === "single") {
          parentElement.style.background = `#${timer.singleColorBackground}`;
        } else if (timer.backgroundColorType === "gradient") {
          parentElement.style.background = `linear-gradient(${timer.gradientAngle}deg, #${timer.gradientColor1}, #${timer.gradientColor2})`;
        }

        titleElement.style.color = `#${timer.titleColor}`;
        titleElement.style.fontSize = `${timer.titleSize}px`;
        subHeadingElement.style.color = `#${timer.subHeadingColor}`;
        subHeadingElement.style.fontSize = `${timer.subHeadingSize}px`;

        parentElement.style.fontFamily = `${timer.font}`;

        timerDayElement.style.color = `#${timer.timerColor}`;
        timerDayElement.style.fontSize = `${timer.timerSize}px`;
        timerHoursElement.style.color = `#${timer.timerColor}`;
        timerHoursElement.style.fontSize = `${timer.timerSize}px`;
        timerMinElement.style.color = `#${timer.timerColor}`;
        timerMinElement.style.fontSize = `${timer.timerSize}px`;
        timerSecsElement.style.color = `#${timer.timerColor}`;
        timerSecsElement.style.fontSize = `${timer.timerSize}px`;
        col1Element.style.color = `#${timer.timerColor}`;
        col1Element.style.fontSize = `${timer.timerSize}px`;
        col2Element.style.color = `#${timer.timerColor}`;
        col2Element.style.fontSize = `${timer.timerSize}px`;
        col3Element.style.color = `#${timer.timerColor}`;
        col3Element.style.fontSize = `${timer.timerSize}px`;

        legendDaysElement.style.color = `#${timer.legendColor}`;
        legendDaysElement.style.fontSize = `${timer.legendSize}px`;
        legendHrsElement.style.color = `#${timer.legendColor}`;
        legendHrsElement.style.fontSize = `${timer.legendSize}px`;
        legendMinsElement.style.color = `#${timer.legendColor}`;
        legendMinsElement.style.fontSize = `${timer.legendSize}px`;
        legendSecsElement.style.color = `#${timer.legendColor}`;
        legendSecsElement.style.fontSize = `${timer.legendSize}px`;

        // STYLE ENDS

        let timerDuration;
        if (timer.timerType === "FIXED_MINUTES") {
          timerDuration = timer.fixedMinutes * 60 * 1000; // converting minutes into milliseconds
        } else if (timer.timerType === "END_DATE") {
          const endDate = new Date(`${timer.endDate}`);
          const today = new Date();
          timerDuration = Math.abs(today.getTime() - endDate.getTime());
        } else {
          timerDuration = 2 * 60 * 60 * 1000; // setting default timer duration to 2 hours
        }

        startTimer(timerDuration, timer, index);
      }, 100);
    });
  }
});

// This function will be called when timer hits zero
const performOnceTimerEndsFunction = (timerData) => {
  if (timerData.onceTimerEnds === ONCE_TIMER_ENDS.UNPUBLISH_TIMER) {
    const parentElement = document.getElementById("timer-block--parent");
    parentElement.innerHTML = "";
  } else if (timerData.onceTimerEnds === ONCE_TIMER_ENDS.SHOW_CUSTOM_TITLE) {
    const titleElement = document.getElementById("title");
    titleElement.innerText = timerData.onceTimerEndsCustomTitle;
  }
};
