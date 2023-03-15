import { Card, TextField, Button, RadioButton } from "@shopify/polaris";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import TimerType from "./timerType";
import "@shopify/polaris/build/esm/styles.css";
const timerBuilder = (props) => {
  function setSeclectTimerFunction(i) {
    //console.log(i);
    setSelectTimer(i);
  }
  const [selectTimer, setSelectTimer] = useState(1);
  const [countdownTimer1, setCountdownTimer1] = useState(
    "First Countdown Counter"
  );
  const [title1, setTitle1] = useState("Hurry up!");
  const [subheading, setSubheading] = useState("Sale ends in:");
  const [min, setMin] = useState(12);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const handleCountdownNameChange = (val) => {
    setCountdownTimer1(val);
    props.setCountdownName(val);
  };

  const handleTitleChange = (val) => {
    setTitle1(val);
    props.setTitle(val);
  };

  const handleSubheadingChange = (val) => {
    setSubheading(val);
    props.setSubheading(val);
  };

  useEffect(() => {
    props.setTimerMinutes(min);
  }, [min]);

  useEffect(() => {
    props.setStartDate(end);
  }, [end]);

  useEffect(() => {
    props.setNow(start);
  }, [start]);

  return (
    <Card>
      <Fragment>
        <div class="Polaris-Card__Section">
          <TextField
            label="Countdown name"
            value={countdownTimer1}
            onChange={(val) => handleCountdownNameChange(val)}
            autoComplete="on"
          />
          <div
            class="Polaris-Labelled__HelpText"
            id="nameHelpText"
            style={{ marginBottom: "1rem" }}
          >
            Only visible to you. For your own internal reference.
          </div>

          <TextField
            label="Title"
            value={title1}
            onChange={(val) => handleTitleChange(val)}
            autoComplete="off"
          />

          <div style={{ marginTop: "1rem" }}>
            <TextField
              label="Subheading"
              value={subheading}
              onChange={(val) => handleSubheadingChange(val)}
              autoComplete="off"
            />
          </div>
        </div>

        <div class="Polaris-Card__Section">
          <div class="Polaris-RadioButton">
            <RadioButton
              label="Countdown to a date"
              helpText="Timer that ends at the specific date."
              id="disabled"
              name="accounts"
              onChange={() => setSeclectTimerFunction(1)}
            />
            <RadioButton
              label="Fixed minutes"
              helpText="Individual fixed minutes countdown for each buyer session."
              id="optional"
              name="accounts"
              onChange={() => setSeclectTimerFunction(2)}
            />

            <TimerType
              selectTimer={selectTimer}
              setMin={setMin}
              setStart={setStart}
              setEnd={setEnd}
            />
          </div>
        </div>

        <div class="Polaris-Card__Section">
          <Button
            class="Polaris-Button Polaris-Button--fullWidth"
            size="large "
            fullWidth="true"
            onClick={() => props.createTimerFunction()}
          >
            Add product
          </Button>
        </div>
      </Fragment>
    </Card>
  );
};

export default timerBuilder;
