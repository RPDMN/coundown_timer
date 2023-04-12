import React, { useState, useMemo } from "react";
import { RadioButton, TextField, Autocomplete, Select } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";

import { TIMER_TYPE } from "../../helpers/constant";
import {
  setTimerType,
  setMinutesAdded,
  setEndDate,
  setTimerStatingDateType,
  setStartDate,
  setOnceTimerEnds,
  setStartDateHours,
  setStartDateMinutes,
  setEndDateHours,
  setEndDateMinutes,
  setOnceTimerEndsCustomTitle,
} from "../../store/slices/indexSlice";
import onceItEndsTimerOptions, {
  ONCE_TIMER_ENDS,
} from "../../helpers/once_timer_ends_function";
import TIMER_STARTING_DATE_TYPE from "../../helpers/timer_starting_date_type_enum";

const TimerTypeSelection = () => {
  const dispatch = useDispatch();
  const timerType = useSelector((state) => state.index.timerType);
  const minutesAdded = useSelector((state) => state.index.minutesAdded);
  const startDate = useSelector((state) => state.index.startDate);
  const startDateHours = useSelector((state) => state.index.startDateHours);
  const startDateMinutes = useSelector((state) => state.index.startDateMinutes);

  const endDate = useSelector((state) => state.index.endDate);
  const endDateHours = useSelector((state) => state.index.endDateHours);
  const endDateMinutes = useSelector((state) => state.index.endDateMinutes);

  const onceTimerEnds = useSelector((state) => state.index.onceTimerEnds);
  const onceTimerEndsCustomTitle = useSelector(
    (state) => state.index.onceTimerEndsCustomTitle
  );

  const timerStatingDateType = useSelector(
    (state) => state.index.timerStatingDateType
  );

  return (
    <>
      <h2 style={{ marginBottom: "1rem", fontWeight: "bold" }}>Timer Type</h2>
      <RadioButton
        label='Countdown to a date'
        helpText='Timer that ends at the specific date.'
        id='disabled'
        name='accounts'
        checked={timerType === TIMER_TYPE.END_DATE}
        onChange={() => dispatch(setTimerType(TIMER_TYPE.END_DATE))}
      />
      <RadioButton
        label='Fixed minutes'
        helpText='Individual fixed minutes countdown for each buyer session.'
        id='optional'
        name='accounts'
        checked={timerType === TIMER_TYPE.FIXED_MINUTES}
        onChange={() => dispatch(setTimerType(TIMER_TYPE.FIXED_MINUTES))}
      />

      <div style={{ marginTop: "1.5rem" }}>
        {timerType === TIMER_TYPE.FIXED_MINUTES ? (
          <>
            <label
              id='onceItEndsLabel'
              htmlFor='onceItEnds'
              className='Polaris-Label__Text'
            >
              Minutes
            </label>
            <TextField
              label='Minutes'
              type='number'
              labelHidden
              value={minutesAdded}
              onChange={(val) => dispatch(setMinutesAdded(val))}
              autoComplete='off'
              min={0}
            />
          </>
        ) : (
          <div>
            <h2 style={{ marginBottom: "1rem", fontWeight: "bold" }}>
              Timer Starts
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
                marginBottom: "10px",
              }}
            >
              <RadioButton
                label='Right Now'
                name='timerStarts'
                checked={timerStatingDateType === TIMER_STARTING_DATE_TYPE.NOW}
                onChange={() =>
                  dispatch(
                    setTimerStatingDateType(TIMER_STARTING_DATE_TYPE.NOW)
                  )
                }
              />
              <RadioButton
                label='Schedule to start later'
                name='timerStarts'
                checked={
                  timerStatingDateType === TIMER_STARTING_DATE_TYPE.LATER
                }
                onChange={() =>
                  dispatch(
                    setTimerStatingDateType(TIMER_STARTING_DATE_TYPE.LATER)
                  )
                }
              />
            </div>

            <>
              {timerStatingDateType === TIMER_STARTING_DATE_TYPE.LATER ? (
                <>
                  <div style={{ marginBottom: "8px" }}>
                    <TextField
                      label='Start Date'
                      value={startDate}
                      onChange={(val) => dispatch(setStartDate(val))}
                      autoComplete='on'
                      type='date'
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <TextField
                      label='Hours'
                      type='number'
                      value={startDateHours}
                      onChange={(val) => dispatch(setStartDateHours(val))}
                      autoComplete='off'
                      max={23}
                      min={0}
                    />
                    <div style={{ marginLeft: ".5rem" }}>
                      <TextField
                        label='Minutes'
                        type='number'
                        value={startDateMinutes}
                        onChange={(val) => dispatch(setStartDateMinutes(val))}
                        autoComplete='off'
                        max={59}
                        min={0}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div></div>
              )}

              <TextField
                label='End Date'
                value={endDate}
                onChange={(val) => dispatch(setEndDate(val))}
                autoComplete='on'
                type='date'
              />
              <div style={{ display: "flex", marginTop: "1rem" }}>
                <TextField
                  label='Hours'
                  type='number'
                  value={endDateHours}
                  onChange={(val) => dispatch(setEndDateHours(val))}
                  autoComplete='off'
                  max={23}
                  min={0}
                />
                <div style={{ marginLeft: ".5rem" }}>
                  <TextField
                    label='Minutes'
                    type='number'
                    value={endDateMinutes}
                    onChange={(val) => dispatch(setEndDateMinutes(val))}
                    autoComplete='off'
                    max={59}
                    min={0}
                  />
                </div>
              </div>
            </>
          </div>
        )}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Select
          label='Once it ends'
          options={onceItEndsTimerOptions}
          onChange={(e) => dispatch(setOnceTimerEnds(e))}
          value={onceTimerEnds}
        />
      </div>

      {onceTimerEnds === ONCE_TIMER_ENDS.SHOW_CUSTOM_TITLE ? (
        <div>
          <div style={{ height: 16 }}></div>

          <TextField
            label='Custom Title'
            value={onceTimerEndsCustomTitle}
            onChange={(val) => dispatch(setOnceTimerEndsCustomTitle(val))}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TimerTypeSelection;
