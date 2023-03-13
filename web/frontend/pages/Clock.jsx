import React, { Fragment, useEffect } from "react";
import "./Clock.css";

const Clock = ({
  timerDays,
  timerHours,
  timerMinutes,
  timerSeconds,
  themeState,
  text,
  subheading,
}) => {
  const title = text;

  return (
    <Fragment>
      {themeState == 1 ? (
        <section className="timer-container">
          <section className="timer">
            <h1
              style={{
                textAlign: "center",
                marginTop: 50,
                color: "white",
                fontSize: 29,
              }}
            >
              {title}
            </h1>
            <h1
              style={{
                textAlign: "center",
                marginTop: 10,
                color: "white",
              }}
            >
              {subheading}
            </h1>
            <div className="clock">
              <section>
                <p>{timerDays}</p>
                <small>Days</small>
              </section>
              <span>:</span>
              <section>
                <p>{timerHours}</p>
                <small>Hours</small>
              </section>{" "}
              <span>:</span>
              <section>
                <p>{timerMinutes}</p>
                <small>Minutes</small>
              </section>{" "}
              <span>:</span>
              <section>
                <p>{timerSeconds}</p>
                <small>Seconds</small>
              </section>
            </div>
          </section>
        </section>
      ) : (
        <div>
          {" "}
          <h1>Theme2</h1>
        </div>
      )}
    </Fragment>
  );
};

export default Clock;
