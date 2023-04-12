import React from "react";
import { Icon } from "@shopify/polaris";
import { DiamondAlertMajor } from "@shopify/polaris-icons";

const TimerActivateWarningDialog = () => {
  return (
    <>
      <div
        className="Polaris-Banner Polaris-Banner--statusCritical Polaris-Banner--hasDismiss Polaris-Banner--withinPage"
        style={{ margin: "2rem" }}
      >
        <div className="Polaris-Banner__Dismiss"></div>
        <div className="Polaris-Banner__Ribbon">
          <Icon source={DiamondAlertMajor} color="Critical" />
        </div>
        <div>
          <div>
            <p className="Polaris-Heading">
              Activate Essential Countdown Before Publishing A Timer
            </p>
          </div>
          <div>
            <p>
              Essential Countdown uses the new Shopify app embed feature.You
              have to activate Essential Countdown in your theme setting before
              publishing a timer. See below how to do it.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimerActivateWarningDialog;
