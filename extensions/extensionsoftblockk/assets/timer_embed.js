const getTimerConfigForEmbed = async () => {
  // const href = window.location.href;
  const shopName = window.Shopify.shop;
  // const test = href.split("admin.shopify.com/store");
  // console.log(href, shopify);
  // // const shopName = shopify ? shopify : href;

  // const SHOP_NAME = "test-store-softblockk.myshopify.com"; // todo change later
  const url =
    "https://timerbackend.onrender.com" + `/user/embed-timer-list/${shopName}`;

  const resp = await fetch(url);
  return resp.json();
};

// This function will start the timer
const startTimerForEmbed = (duration, timerResponse) => {
  const daysElement = document.getElementById(`timer-day_${timerResponse._id}`);
  const hoursElement = document.getElementById(
    `timer-hours_${timerResponse._id}`
  );
  const minutesElement = document.getElementById(
    `timer-minutes_${timerResponse._id}`
  );
  const secondsElement = document.getElementById(
    `timer-seconds_${timerResponse._id}`
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

      performOnceTimerEndsFunctionForEmbed(timerResponse);
    }
  }, 1000);
};

// This function will prevent timer to be displayed before start date
const shouldDisplayTimerFunctionForEmbed = (timerData) => {
  if (!timerData) {
    return false;
  }
  if (!timerData.isPublished) {
    return false;
  }
  if (timerData.postion === TIMER_POSITION_FOR_EMBED.PRODUCTS_PAGE) {
    if (!window.location.pathname.includes("products")) {
      return false;
    }
  }
  if (timerData.postion === TIMER_POSITION_FOR_EMBED.TOP_BOTTOM_BAR) {
    switch (timerData.timerBarDisplayPositionType) {
      case TIMER_BAR_POSITION_TYPE_FOR_EMBED.ONLY_HOME_PAGE: {
        if (window.location.pathname !== "/") {
          return false;
        }
        break;
      }
      case TIMER_BAR_POSITION_TYPE_FOR_EMBED.ALL_PRODUCT_PAGE: {
        if (!window.location.pathname.includes("/products")) {
          return false;
        }
        break;
      }
      case TIMER_BAR_POSITION_TYPE_FOR_EMBED.SPECIFIC_PRODUCT_PAGES: {
        const listOfProductsToShow = timerData.listOfProductsForPosition;
        const isCorrectProduct = listOfProductsToShow.find((e) => {
          return window.location.pathname.endsWith(`products/${e.handle}`);
        });
        if (!isCorrectProduct) {
          return false;
        }
        break;
      }
      case TIMER_BAR_POSITION_TYPE_FOR_EMBED.ALL_COLLECTIONS: {
        if (!window.location.pathname.includes("/collections")) {
          return false;
        }
        break;
      }
      case TIMER_BAR_POSITION_TYPE_FOR_EMBED.SPECIFIC_COLLECTIONS: {
        const listOfCollectionsToShow = timerData.listOfCollectionForPosition;
        const isCorrectCollection = listOfCollectionsToShow.find((e) => {
          return window.location.pathname.endsWith(`collections/${e.handle}`);
        });
        if (!isCorrectCollection) {
          return false;
        }
        break;
      }
    }
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
getTimerConfigForEmbed().then(async (timers) => {
  if (!timers) {
    return;
  }

  const listOfTimers = [timers.topBottomBarTimer, timers.productPageTimer];

  listOfTimers.forEach((timer) => {
    const shouldDisplayTimer = shouldDisplayTimerFunctionForEmbed(timer);

    if (!shouldDisplayTimer) {
      return;
    }

    // const parentElement = document.getElementById("embed_parent");
    const parentElement = document.createElement("div");
    parentElement.setAttribute("id", timer._id);
    parentElement.style.zIndex = 5;

    if (timer.postion === TIMER_POSITION_FOR_EMBED.PRODUCTS_PAGE) {
      parentElement.innerHTML = `
      <div id="title_${timer._id}" class="timely-header timely-bold">${timer.title}</div>
      <div id="subHeading_${timer._id}" class="timely-sub-header">${timer.subHeading}</div>
      <div class="timely-timer">
        <span id="timer-day_${timer._id}" class="timely-bold">00</span>
        <span id="col1_${timer._id}" class="timely-bold">:</span>
        <span id="timer-hours_${timer._id}" class="timely-bold">00</span>
        <span id="col2_${timer._id}" class="timely-bold">:</span>
        <span id="timer-minutes_${timer._id}" class="timely-bold">00</span>
        <span id="col3_${timer._id}" class="timely-bold">:</span>
        <span id="timer-seconds_${timer._id}" class="timely-bold">00</span>
    
        <span id="legendDays_${timer._id}" class="time-type">Days</span>
        <span class="timely-opaq">.</span>
        <span id="legendHrs_${timer._id}" class="time-type">Hrs</span>
        <span class="timely-opaq">.</span>
        <span id="legendMins_${timer._id}" class="time-type">Mins</span>
        <span class="timely-opaq">.</span>
        <span id="legendSecs_${timer._id}" class="time-type">Secs</span>
      </div>`;
    } else if (timer.postion === TIMER_POSITION_FOR_EMBED.TOP_BOTTOM_BAR) {
      parentElement.innerHTML = `<div class="container sticky-0">
    <div class="clock-bar--container">
      <h2 id="title_${timer._id}" class="clock--header">${timer.title}</h2>
  
      <h4 id="subHeading_${timer._id}">${timer.subHeading}</h4>
      <div>
        <table class="clockbar--table">
          <tbody class="timely-bold-bar">
            <tr>
              <td id="timer-day_${timer._id}" class="bold">00</td>
              <td id="col1_${timer._id}" class="bold">:</td>
              <td id="timer-hours_${timer._id}">00</td>
              <td id="col2_${timer._id}">:</td>
              <td id="timer-minutes_${timer._id}">00</td>
              <td id="col3_${timer._id}">:</td>
              <td id="timer-seconds_${timer._id}">00</td>
            </tr>
            <tr>
              <td id="legendDays_${timer._id}">Days</td>
              <td></td>
              <td id="legendHrs_${timer._id}">Hrs</td>
              <td></td>
              <td id="legendMins_${timer._id}">Mins</td>
              <td></td>
              <td id="legendSecs_${timer._id}">Secs</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="button_parent_${timer._id}">
      
      <button
       id="timer_bar_button_${timer._id}"
              
            >
            </button>
            </div>
    </div>
  </div>
  `;
    }

    // as soon as the api is called we will show the timer

    if (timer.postion === TIMER_POSITION_FOR_EMBED.PRODUCTS_PAGE) {
      if (
        timer.displayPositionType === TIMER_POSITION_TYPE_FOR_EMBED.ALL_PRODUCTS
      ) {
        const allFormAction = document.querySelectorAll("form[action]");
        const cartAddBlock = Array.from(allFormAction).filter((e) =>
          e.getAttribute("action").includes("/cart/add")
        );
        if (cartAddBlock.length) {
          const buyButtonElement = cartAddBlock[cartAddBlock.length - 1];
          buyButtonElement.append(parentElement);
        }
      } else if (
        timer.displayPositionType ===
        TIMER_POSITION_TYPE_FOR_EMBED.SPECIFIC_PRODUCTS
      ) {
        const listOfProductsToShow = timer.listOfProductsForPosition;
        const isCorrectProduct = listOfProductsToShow.find((e) => {
          return window.location.pathname.endsWith(`products/${e.handle}`);
        });
        if (isCorrectProduct) {
          const allFormAction = document.querySelectorAll("form[action]");
          const cartAddBlock = Array.from(allFormAction).filter((e) =>
            e.getAttribute("action").includes("/cart/add")
          );
          if (cartAddBlock.length) {
            const buyButtonElement = cartAddBlock[cartAddBlock.length - 1];
            buyButtonElement.append(parentElement);
          }
        }
      }
    } else if (timer.postion === TIMER_POSITION_FOR_EMBED.TOP_BOTTOM_BAR) {
      switch (timer.timerBarDisplayPositionType) {
        case TIMER_BAR_POSITION_TYPE_FOR_EMBED.EVERY_PAGE: {
          buildTimerBar(timer, parentElement);
          break;
        }
        case TIMER_BAR_POSITION_TYPE_FOR_EMBED.ONLY_HOME_PAGE: {
          if (window.location.pathname === "/") {
            buildTimerBar(timer, parentElement);
          }
          break;
        }
        case TIMER_BAR_POSITION_TYPE_FOR_EMBED.ALL_PRODUCT_PAGE: {
          if (window.location.pathname.includes("/products")) {
            buildTimerBar(timer, parentElement);
          }
          break;
        }
        case TIMER_BAR_POSITION_TYPE_FOR_EMBED.SPECIFIC_PRODUCT_PAGES: {
          const listOfProductsToShow = timer.listOfProductsForPosition;
          const isCorrectProduct = listOfProductsToShow.find((e) => {
            return window.location.pathname.endsWith(`products/${e.handle}`);
          });
          if (isCorrectProduct) {
            buildTimerBar(timer, parentElement);
          }
          break;
        }
        case TIMER_BAR_POSITION_TYPE_FOR_EMBED.ALL_COLLECTIONS: {
          if (window.location.pathname.includes("/collections")) {
            buildTimerBar(timer, parentElement);
          }
          break;
        }
        case TIMER_BAR_POSITION_TYPE_FOR_EMBED.SPECIFIC_COLLECTIONS: {
          const listOfCollectionsToShow = timer.listOfCollectionForPosition;
          const isCorrectCollection = listOfCollectionsToShow.find((e) => {
            return window.location.pathname.endsWith(`collections/${e.handle}`);
          });
          if (isCorrectCollection) {
            buildTimerBar(timer, parentElement);
          }
          break;
        }
        default: {
          buildTimerBar(timer, parentElement);
          break;
        }
      }
    }

    setTimeout(function () {
      const titleElement = document.getElementById(`title_${timer._id}`);
      const subHeadingElement = document.getElementById(
        `subHeading_${timer._id}`
      );

      const timerDayElement = document.getElementById(`timer-day_${timer._id}`);
      const timerHoursElement = document.getElementById(
        `timer-hours_${timer._id}`
      );
      const timerMinElement = document.getElementById(
        `timer-minutes_${timer._id}`
      );
      const timerSecsElement = document.getElementById(
        `timer-seconds_${timer._id}`
      );
      const col1Element = document.getElementById(`col1_${timer._id}`);
      const col2Element = document.getElementById(`col2_${timer._id}`);
      const col3Element = document.getElementById(`col3_${timer._id}`);

      const legendDaysElement = document.getElementById(
        `legendDays_${timer._id}`
      );
      const legendHrsElement = document.getElementById(
        `legendHrs_${timer._id}`
      );
      const legendMinsElement = document.getElementById(
        `legendMins_${timer._id}`
      );
      const legendSecsElement = document.getElementById(
        `legendSecs_${timer._id}`
      );
      const buttonParentElement = document.getElementById(
        `button_parent_${timer._id}`
      );
      const buttonElement = document.getElementById(
        `timer_bar_button_${timer._id}`
      );

      // AFTER API CHANGE CHANGE HERE
      titleElement.innerHTML = timer.title;
      subHeadingElement.innerHTML = timer.subHeading;
      parentElement.style.fontFamily = `${timer.font}`;

      // STYLE STARTS

      if (timer.postion === TIMER_POSITION_FOR_EMBED.PRODUCTS_PAGE) {
        parentElement.style.paddingTop = `${timer.insideTopHeight}px`;
        parentElement.style.paddingBottom = `${timer.insideBottomHeight}px`;
        parentElement.style.marginTop = `${timer.outsideTopHeight}px`;
        parentElement.style.marginBottom = `${timer.outsideBottomHeight}px`;
      } else if (timer.postion === TIMER_POSITION_FOR_EMBED.TOP_BOTTOM_BAR) {
        parentElement.style.paddingTop = "0px";
        parentElement.style.paddingBottom = "0px";
        parentElement.style.marginTop = "0px";
        parentElement.style.marginBottom = "0px";

        if (timer.buttonText && timer.buttonText !== "") {
          buttonElement.innerText = timer.buttonText;
          buttonElement.style.paddingTop = "10px";
          buttonElement.style.paddingBottom = "10px";
          buttonElement.style.paddingLeft = "16px";
          buttonElement.style.paddingRight = "16px";
          buttonElement.style.backgroundColor = `#${timer.buttonColor}`;
          buttonElement.style.color = `#${timer.buttonFontColor}`;
          buttonElement.style.borderWidth = "0px";
          buttonElement.style.borderRadius = "4px";
          buttonElement.style.fontSize = `${timer.buttonFontSize}px`;
          buttonElement.style.fontFamily = `${timer.font}`;
        } else {
          buttonParentElement.innerHTML = "";
        }
      }

      parentElement.style.textAlign = "center";

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

      startTimerForEmbed(timerDuration, timer);
    }, 100);
  });
});

const buildTimerBar = (timer, parentElement) => {
  if (timer.isSticky === "true" || timer.isSticky === true) {
    parentElement.style.position = "sticky";
  }
  if (timer.timerBarPosition === TIMER_BAR_POSITION_FOR_EMBED.TOP_PAGE) {
    parentElement.style.top = "0";
    document.body.prepend(parentElement);
  } else if (
    timer.timerBarPosition === TIMER_BAR_POSITION_FOR_EMBED.BOTTOM_PAGE
  ) {
    parentElement.style.bottom = "0";
    document.body.append(parentElement);
  }
};

// This function will be called when timer hits zero
const performOnceTimerEndsFunctionForEmbed = (timerData) => {
  if (timerData.onceTimerEnds === ONCE_TIMER_ENDS_FOR_EMBED.UNPUBLISH_TIMER) {
    const parentElement = document.getElementById("parent");
    parentElement.innerHTML = "";
  } else if (
    timerData.onceTimerEnds === ONCE_TIMER_ENDS_FOR_EMBED.SHOW_CUSTOM_TITLE
  ) {
    const titleElement = document.getElementById("title");
    titleElement.innerText = timerData.onceTimerEndsCustomTitle;
  }
};

const ONCE_TIMER_ENDS_FOR_EMBED = Object.freeze({
  UNPUBLISH_TIMER: "UNPUBLISH_TIMER",
  SHOW_CUSTOM_TITLE: "SHOW_CUSTOM_TITLE",
  DO_NOTHING: "DO_NOTHING",
});

const TIMER_POSITION_TYPE_FOR_EMBED = Object.freeze({
  ALL_PRODUCTS: "ALL_PRODUCTS",
  SPECIFIC_PRODUCTS: "SPECIFIC_PRODUCTS",
  CUSTOM_POSITION: "CUSTOM_POSITION",
});

const TIMER_POSITION_FOR_EMBED = Object.freeze({
  TOP_BOTTOM_BAR: "TOP_BOTTOM_BAR",
  PRODUCTS_PAGE: "PRODUCTS_PAGE",
});

const TIMER_BAR_POSITION_TYPE_FOR_EMBED = Object.freeze({
  EVERY_PAGE: "EVERY_PAGE",
  ONLY_HOME_PAGE: "ONLY_HOME_PAGE",
  ALL_PRODUCT_PAGE: "ALL_PRODUCT_PAGE",
  SPECIFIC_PRODUCT_PAGES: "SPECIFIC_PRODUCT_PAGES",
  ALL_COLLECTIONS: "ALL_COLLECTIONS",
  SPECIFIC_COLLECTIONS: "SPECIFIC_COLLECTIONS",
});

const TIMER_BAR_POSITION_FOR_EMBED = Object.freeze({
  TOP_PAGE: "TOP_PAGE",
  BOTTOM_PAGE: "BOTTOM_PAGE",
});

const getQueryStringFromURl = (key) => {
  try {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    return params.get(key);
  } catch (err) {
    return "";
  }
};
