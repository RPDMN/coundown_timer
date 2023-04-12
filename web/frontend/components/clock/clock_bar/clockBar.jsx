import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatNumber, startTimer } from "../../../helpers/function";
import { Icon } from "@shopify/polaris";
import "./clockbar.css";
import { CancelSmallMinor } from "@shopify/polaris-icons";
import CALL_TO_ACTION_TYPE from "../../../helpers/call_to_action";

let timerInterval;
const ClockBar = () => {
  const timerTitle = useSelector((state) => state.index.title);
  const timerSubheading = useSelector((state) => state.index.subHeading);
  const minutesAdded = useSelector((state) => state.index.minutesAdded);
  const endDate = useSelector((state) => state.index.endDate);
  const endDateHours = useSelector((state) => state.index.endDateHours);
  const endDateMinutes = useSelector((state) => state.index.endDateMinutes);
  const timerType = useSelector((state) => state.index.timerType);
  const timerCss = useSelector((state) => state.index.css);
  const callToAction = useSelector(
    (state) => state.timerBarExtras.callToAction
  );

  const buttonText = useSelector((state) => state.timerBarExtras.buttonText);
  const timerBarExtraCss = useSelector(
    (state) => state.timerBarExtras.extraCss
  );

  const [timerData, setTimerData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    let bufferSeconds = minutesAdded * 60;
    timerInterval = setInterval(() => {
      const { days, hours, minutes, seconds, diffTime } = startTimer(
        endDate,
        endDateHours,
        endDateMinutes,
        timerType,
        bufferSeconds
      );

      if (diffTime <= 0) {
        clearInterval(timerInterval);
        setTimerData({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimerData({ days, hours, minutes, seconds });
        bufferSeconds--;
      }
    }, 1000);

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [endDate, timerType, minutesAdded, endDateHours, endDateMinutes]);

  return (
    <div className="container sticky-0">
      <div
        className="clock-bar--container"
        style={{
          background:
            timerCss.backgroundColorType === "single"
              ? `#${timerCss.clockSingleColorBackground}`
              : `linear-gradient( ${timerCss.gradientAngle}deg, #${timerCss.clockGradientColor1}, #${timerCss.clockGradientColor2}`,
          borderRadius: `${timerCss.cornerRadius}px`,
          borderStyle: "solid",
          borderWidth: `${timerCss.borderSize}px`,
          borderColor: `#${timerCss.borderColor}`,
          paddingTop: `${timerCss.paddingTop}px`,
          paddingBottom: `${timerCss.paddingBottom}px`,
          marginTop: `${timerCss.marginTop}px`,
          marginBottom: `${timerCss.marginBottom}px`,
          fontFamily: `${timerCss.fontFamily}`,
        }}
      >
        <h2
          className="clock--header"
          style={{
            color: `#${timerCss.titleColor}`,
            fontSize: `${timerCss.titleSize}px`,
          }}
        >
          {timerTitle}
        </h2>

        <h4
          className="clock--sub-header"
          style={{
            color: `#${timerCss.subheadingColor}`,
            fontSize: `${timerCss.subHeadingSize}px`,
          }}
        >
          {timerSubheading}
        </h4>
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          <table className="clockbar--table">
            <tbody>
              <tr>
                <td
                  className="bold"
                  style={{
                    color: `#${timerCss.clockTimerColor}`,
                    fontSize: `${timerCss.clockTimerSize}px`,
                  }}
                >
                  {formatNumber(timerData.days)}
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${timerCss.clockTimerColor}`,
                    fontSize: `${timerCss.clockTimerSize}px`,
                  }}
                >
                  :
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${timerCss.clockTimerColor}`,
                    fontSize: `${timerCss.clockTimerSize}px`,
                  }}
                >
                  {formatNumber(timerData.hours)}
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${timerCss.clockTimerColor}`,
                    fontSize: `${timerCss.clockTimerSize}px`,
                  }}
                >
                  :
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${timerCss.clockTimerColor}`,
                    fontSize: `${timerCss.clockTimerSize}px`,
                  }}
                >
                  {formatNumber(timerData.minutes)}
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${timerCss.clockTimerColor}`,
                    fontSize: `${timerCss.clockTimerSize}px`,
                  }}
                >
                  :
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${timerCss.clockTimerColor}`,
                    fontSize: `${timerCss.clockTimerSize}px`,
                  }}
                >
                  {formatNumber(timerData.seconds)}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    color: `#${timerCss.legendColor}`,
                    fontSize: `${timerCss.legendSize}px`,
                  }}
                >
                  Days
                </td>
                <td></td>
                <td
                  style={{
                    color: `#${timerCss.legendColor}`,
                    fontSize: `${timerCss.legendSize}px`,
                  }}
                >
                  Hrs
                </td>
                <td></td>
                <td
                  style={{
                    color: `#${timerCss.legendColor}`,
                    fontSize: `${timerCss.legendSize}px`,
                  }}
                >
                  Mins
                </td>
                <td></td>
                <td
                  style={{
                    color: `#${timerCss.legendColor}`,
                    fontSize: `${timerCss.legendSize}px`,
                  }}
                >
                  Secs
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {callToAction === CALL_TO_ACTION_TYPE.BUTTON_ACTION && buttonText ? (
          <div className="shopNowButton">
            <button
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 16,
                paddingRight: 16,
                backgroundColor: `#${timerBarExtraCss.buttonColor}`,
                color: `#${timerBarExtraCss.buttonFontColor}`,
                borderWidth: "0px",
                borderRadius: 4,
                fontSize: `${timerBarExtraCss.buttonFontSize}px`,
                fontFamily: `${timerCss.fontFamily}`,
              }}
            >
              {buttonText}
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ClockBar;
