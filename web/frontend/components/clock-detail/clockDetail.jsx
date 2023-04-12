import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, TextField, Button, Select } from "@shopify/polaris";
import {
  setName,
  setSubheading,
  setTitle,
} from "../../store/slices/indexSlice";
import {
  setCallToAction,
  setLink,
  setButtonText,
} from "../../store/slices/timerBarExtraParamSlice";
import TimerTypeSelection from "./timerTypeSelection";
import "./clock-detail.css";
import callToActionType, { callToActions } from "../../helpers/call_to_action";
import TIMER_POSITION from "../../helpers/timer_position_enum";
import { setSelectedTab } from "../../store/slices/selectedTabSlice";
import TAB_TYPE from "../../helpers/tabs_enum";

const ClockDetail = () => {
  const dispatch = useDispatch();

  const countdownTimerName = useSelector((state) => state.index.name);
  const timerTitle = useSelector((state) => state.index.title);
  const timerSubheading = useSelector((state) => state.index.subHeading);
  const postion = useSelector((state) => state.index.postion);
  const callToAction = useSelector(
    (state) => state.timerBarExtras.callToAction
  );
  const buttonText = useSelector((state) => state.timerBarExtras.buttonText);
  const link = useSelector((state) => state.timerBarExtras.link);

  return (
    <div className="clock-detail-container">
      <Card>
        <div className="timerBuilder">
          <div className="Polaris-Card__Section">
            <TextField
              label="Countdown name"
              value={countdownTimerName}
              onChange={(e) => dispatch(setName(e))}
              autoComplete="on"
            />
            <div id="nameHelpText" className="countdown-name-helper-text">
              Only visible to you. For your own internal reference.
            </div>

            <TextField
              label="Title"
              value={timerTitle}
              onChange={(val) => dispatch(setTitle(val))}
              autoComplete="off"
            />

            <div className="subHeading">
              <TextField
                label="Subheading"
                value={timerSubheading}
                onChange={(val) => dispatch(setSubheading(val))}
                autoComplete="off"
              />
            </div>
            {postion === TIMER_POSITION.TOP_BOTTOM_BAR && (
              <>
                <div style={{ marginTop: "1rem" }}>
                  <Select
                    label="Call to action"
                    options={callToActions}
                    value={callToAction}
                    onChange={(e) => {
                      dispatch(setCallToAction(e));
                      if (e === callToActionType.BUTTON_ACTION) {
                        dispatch(setButtonText("Shop Now!"));
                      }
                    }}
                  />
                </div>

                {callToAction === callToActionType.BUTTON_ACTION && (
                  <>
                    <div className="subHeading">
                      <TextField
                        label="Button Text"
                        value={buttonText}
                        onChange={(e) => dispatch(setButtonText(e))}
                        autoComplete="off"
                      />
                    </div>
                  </>
                )}

                {callToAction !== callToActionType.NO_ACTION && (
                  <>
                    <div className="subHeading">
                      <TextField
                        label="Link"
                        value={link}
                        onChange={(e) => dispatch(setLink(e))}
                        autoComplete="off"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="Polaris-Card__Section">
            <div className="Polaris-RadioButton">
              <TimerTypeSelection />
            </div>
          </div>

          <div className="Polaris-Card__Section">
            <Button
              size="large "
              fullWidth="true"
              onClick={() => {
                dispatch(setSelectedTab(TAB_TYPE.DESIGN_TAB));
              }}
            >
              Continue to Design
            </Button>
          </div>
        </div>
      </Card>
      <div style={{ height: 20 }}></div>
    </div>
  );
};

export default ClockDetail;
