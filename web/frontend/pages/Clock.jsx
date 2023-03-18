import React, { Fragment, useEffect } from "react";
import "./Clock.css";

const Clock = ({
  timerDays,
  timerHours,
  timerMinutes,
  timerSeconds,
  themeState,
  title,
  subheading,
}) => {
  return (
    <div className="clockadj">
      <section className="timer-container">
        <section className="timer">
          <h1
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 28,
              fontWeight: "bold",
              lineHeight: 1,
              marginTop: "3rem",
            }}
          >
            {title}
          </h1>
          <h1
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "black",
              lineHeight: 1.5,
            }}
          >
            {subheading}
          </h1>
          <div className="clock">
            <section>
              <p className="clocknum">{timerDays}</p>
              <small className="dms">Days</small>
            </section>
            <span className="spanC">:</span>
            <section>
              <p className="clocknum">{timerHours}</p>
              <small className="dms"> Hrs</small>
            </section>{" "}
            <span className="spanC">:</span>
            <section>
              <p className="clocknum">{timerMinutes}</p>
              <small className="dms">Min</small>
            </section>{" "}
            <span className="spanC">:</span>
            <section>
              <p className="clocknum">{timerSeconds}</p>
              <small className="dms">Sec</small>
            </section>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Clock;
