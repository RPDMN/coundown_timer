import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { formatNumber, startTimer } from "../../../helpers/function";
import "./clock.css";
import { formatNumber, startTimer } from "../../../helpers/function";

let timerInterval;

const Clock = () => {
  const timerTitle = useSelector((state) => state.index.title);
  const timerSubheading = useSelector((state) => state.index.subHeading);
  const minutesAdded = useSelector((state) => state.index.minutesAdded);
  const endDate = useSelector((state) => state.index.endDate);
  const endDateHours = useSelector((state) => state.index.endDateHours);
  const endDateMinutes = useSelector((state) => state.index.endDateMinutes);

  const timerType = useSelector((state) => state.index.timerType);
  const titleColor = useSelector((state) => state.index.css.titleColor);
  const subheadingColor = useSelector(
    (state) => state.index.css.subheadingColor
  );
  const clockTimerColor = useSelector(
    (state) => state.index.css.clockTimerColor
  );
  const legendColor = useSelector((state) => state.index.css.legendColor);
  const clockSingleColorBackground = useSelector(
    (state) => state.index.css.clockSingleColorBackground
  );
  const cornerRadius = useSelector((state) => state.index.css.cornerRadius);
  const borderSize = useSelector((state) => state.index.css.borderSize);
  const borderColor = useSelector((state) => state.index.css.borderColor);
  const paddingTop = useSelector((state) => state.index.css.paddingTop);
  const paddingBottom = useSelector((state) => state.index.css.paddingBottom);
  const marginTop = useSelector((state) => state.index.css.outsideTopHeight);
  const marginBottom = useSelector(
    (state) => state.index.css.outsideBottomHeight
  );
  const titleSize = useSelector((state) => state.index.css.titleSize);
  const subHeadingSize = useSelector((state) => state.index.css.subHeadingSize);
  const clockTimerSize = useSelector((state) => state.index.css.clockTimerSize);
  const legendSize = useSelector((state) => state.index.css.legendSize);
  const backgroundColorType = useSelector(
    (state) => state.index.css.backgroundColorType
  );
  const clockGradientColor1 = useSelector(
    (state) => state.index.css.clockGradientColor1
  );
  const clockGradientColor2 = useSelector(
    (state) => state.index.css.clockGradientColor2
  );
  const gradientAngle = useSelector((state) => state.index.css.gradientAngle);

  const fontFamily = useSelector((state) => state.index.css.fontFamily);

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
    <div className="clock--container-max">
      <div className="clock--container-sticky">
        <div
          style={{
            padding: "2rem",
            background:
              backgroundColorType === "single"
                ? `#${clockSingleColorBackground}`
                : `linear-gradient( ${gradientAngle}deg, #${clockGradientColor1}, #${clockGradientColor2}`,
            borderRadius: `${cornerRadius}px`,
            borderStyle: "solid",
            borderWidth: `${borderSize}px`,
            borderColor: `#${borderColor}`,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
            fontFamily: `${fontFamily}`,
          }}
        >
          <h2
            className="clock--header"
            style={{ color: `#${titleColor}`, fontSize: `${titleSize}px` }}
          >
            {timerTitle}
          </h2>
          <h4
            className="clock--sub-header mt-4"
            style={{
              color: `#${subheadingColor}`,
              fontSize: `${subHeadingSize}px`,
            }}
          >
            {timerSubheading}
          </h4>
          <table className="clock">
            <tbody>
              <tr>
                <td
                  className="bold"
                  style={{
                    color: `#${clockTimerColor}`,
                    fontSize: `${clockTimerSize}px`,
                  }}
                >
                  {formatNumber(timerData.days)}
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${clockTimerColor}`,
                    fontSize: `${clockTimerSize}px`,
                  }}
                >
                  :
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${clockTimerColor}`,
                    fontSize: `${clockTimerSize}px`,
                  }}
                >
                  {formatNumber(timerData.hours)}
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${clockTimerColor}`,
                    fontSize: `${clockTimerSize}px`,
                  }}
                >
                  :
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${clockTimerColor}`,
                    fontSize: `${clockTimerSize}px`,
                  }}
                >
                  {formatNumber(timerData.minutes)}
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${clockTimerColor}`,
                    fontSize: `${clockTimerSize}px`,
                  }}
                >
                  :
                </td>
                <td
                  className="bold"
                  style={{
                    color: `#${clockTimerColor}`,
                    fontSize: `${clockTimerSize}px`,
                  }}
                >
                  {formatNumber(timerData.seconds)}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    color: `#${legendColor}`,
                    fontSize: `${legendSize}px`,
                  }}
                >
                  Days
                </td>
                <td></td>
                <td
                  style={{
                    color: `#${legendColor}`,
                    fontSize: `${legendSize}px`,
                  }}
                >
                  Hrs
                </td>
                <td></td>
                <td
                  style={{
                    color: `#${legendColor}`,
                    fontSize: `${legendSize}px`,
                  }}
                >
                  Mins
                </td>
                <td></td>
                <td
                  style={{
                    color: `#${legendColor}`,
                    fontSize: `${legendSize}px`,
                  }}
                >
                  Secs
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clock;
