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
  const [title, setTitle] = useState("Hurry up!");
  const [subheading, setSubheading] = useState("Sale ends in:");
  const [min, setMin] = useState(12);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const handleTitleChange = (val) => {
    //console.log(val);
    setTitle(val);
    props.setText(val);
  };

  const handleSubheadingChange = (val) => {
    setSubheading(val);
    props.setSubheading(val);
  };

  useEffect(() => {
    props.setTimerMinutes(min);
  }, [min]);

  useEffect(() => {
    props.setCounterDate(end);
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
            value={title}
            //onChange={(val) => handleTitleChange(val)}
            autoComplete="on"
          />
          <div class="Polaris-Labelled__HelpText" id="nameHelpText">
            Only visible to you. For your own internal reference.
          </div>

          <TextField
            label="Title"
            value={title}
            onChange={(val) => handleTitleChange(val)}
            autoComplete="off"
          />

          <TextField
            label="Subheading"
            value={subheading}
            onChange={(val) => handleSubheadingChange(val)}
            autoComplete="off"
          />
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
          >
            Add product
          </Button>
        </div>
      </Fragment>
    </Card>
  );
};

export default timerBuilder;
