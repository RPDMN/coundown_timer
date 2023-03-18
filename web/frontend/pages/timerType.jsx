import React, { Fragment, useEffect, useState, useCallback } from "react";
import "./Clock.css";
import { Select, TextField, Popover } from "@shopify/polaris";
//import { StatusValue } from "@shopify/polaris/build/ts/latest/src/components/Badge";
const TimerType = (props) => {
  const [selected, setSelected] = useState("today");
  const [minutes, setMinutes] = useState(12);
  const [endDate, setEndDate] = useState(new Date().getDate());
  const [startDate, setStartDate] = useState(new Date().getDate());
  //const handleTextChange = useCallback((newValue) => setValue(newValue), []);
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Hide the timer for the buyer", value: "today" },
    { label: "Repeat the countdown", value: "yesterday" },
    { label: "Show custom title", value: "lastWeek" },
    { label: "Do nothing", value: "donothing" },
  ];

  const changeMinute = (val) => {
    setMinutes(val);
    props.setMin(val);
  };

  const changeEndDate = (val) => {
    setEndDate(val);
    props.setEnd(val);
  };

  const changeStartDate = (val) => {
    setStartDate(val);
    props.setStart(val);
  };

  return (
    <Fragment>
      {props.selectTimer == 2 ? (
        <div style={{ marginTop: 23 }}>
          <label
            id="onceItEndsLabel"
            for="onceItEnds"
            class="Polaris-Label__Text"
          >
            Minutes
          </label>
          <TextField
            label="Minutes"
            type="number"
            labelHidden
            value={minutes}
            disabled={selected === "no"}
            onChange={(val) => {
              changeMinute(val);
            }}
            autoComplete="off"
          />
          <div style={{ marginTop: "1rem" }}>
            <Select
              label="Once it ends"
              options={options}
              onChange={handleSelectChange}
              value={selected}
            />
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 23 }}>
          <TextField
            label="Start Date"
            value={startDate}
            onChange={(val) => changeStartDate(val)}
            autoComplete="on"
            type="date"
          />
          <div style={{ marginTop: "1rem" }}>
            <TextField
              label="End Date"
              value={endDate}
              onChange={(val) => changeEndDate(val)}
              autoComplete="on"
              type="date"
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TimerType;
