import axios from "axios";
import TimerTypes from "./timer_types";

export const formatNumber = (num) => {
  if (typeof num === "number") {
    if (num.toString() === "NaN") return "00";
    return num.toString().length < 2 ? `0${num}` : num;
  }
  return num;
};

export const axiosInstance = (baseURL = "") => {
  const config = {
    baseURL,
    headers: {},
  };

  return axios.create(config);
};

export const startTimer = (
  selectedEndDate,
  selectedEndDateHours,
  selectedEndDateMinutes,
  selectedTimerType,
  secondReference
) => {
  let countDownDate = new Date();

  if (selectedTimerType === TimerTypes.FIXED_MINUTES) {
    countDownDate = new Date(countDownDate.getTime() + secondReference * 1000);
  } else {
    countDownDate = new Date(selectedEndDate).getTime();
    const endDateHours = selectedEndDateHours * 60 * 60 * 1000;
    const endDateMinutes = selectedEndDateMinutes * 60 * 1000;
    countDownDate = countDownDate + endDateHours + endDateMinutes;
  }
  const nowDate = new Date().getTime();
  const diffTime = countDownDate - nowDate;
  const days = Math.floor(diffTime / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (diffTime % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffTime % (60 * 60 * 1000)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (60 * 1000)) / 1000);
  return { days, hours, minutes, seconds, diffTime };
};

export const getInitialCSS = () => {
  return {
    titleSize: "28",
    titleColor: "000000",
    subHeadingSize: "16",
    subheadingColor: "000000",
    clockTimerSize: "40",
    clockTimerColor: "000000",
    legendSize: "14",
    legendColor: "000000",
    clockSingleColorBackground: "FFFFFF",
    clockGradientColor1: "DDDDDD",
    clockGradientColor2: "FFFFFF",
    gradientAngle: "90",
    cornerRadius: "8",
    borderSize: "0",
    borderColor: "000000",
    paddingTop: "30",
    paddingBottom: "30",
    outsideTopHeight: "20",
    outsideBottomHeight: "20",
    template: "Custom",
    fontFamily: "",
    backgroundColorType: "single",
  };
};

export const getInitialTimerBarCSS = () => {
  return {
    titleSize: "18",
    titleColor: "202223",
    subHeadingSize: "18",
    subheadingColor: "202223",
    clockTimerSize: "22",
    clockTimerColor: "202223",
    legendSize: "10",
    legendColor: "6d7175",
    clockSingleColorBackground: "FFFFFF",
    clockGradientColor1: "DDDDDD",
    clockGradientColor2: "FFFFFF",
    gradientAngle: "90",
    cornerRadius: "8",
    borderSize: "0",
    borderColor: "000000",
    paddingTop: "10",
    paddingBottom: "10",
    template: "Custom",
    fontFamily: "",
    backgroundColorType: "single",
  };
};

export const getInitalTimerBarExtraCss = () => {
  return {
    buttonColor: "000000",
    buttonFontSize: "14",
    buttonFontColor: "FFFFFF",
    buttonCornerRadius: "4",
    closeIconColor: "6d7175",
  };
};

export const getQueryStringFromURl = (key) => {
  try {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    return params.get(key);
  } catch (err) {
    return "";
  }
};

export const callDomainResponse = async (authenticatedFetch) => {
  const response = await authenticatedFetch("/api/shopify/session", {});
  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson.shop;
};
