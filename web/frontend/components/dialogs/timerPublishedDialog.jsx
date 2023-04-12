import React, { useEffect } from "react";
import { Button, Icon } from "@shopify/polaris";

import { CircleTickMajor } from "@shopify/polaris-icons";
import { useDispatch, useSelector } from "react-redux";
import TIMER_POSITION_TYPE from "../../helpers/timer_position_type_enum";
import { callDomainResponse } from "../../helpers/function";
import { useAuthenticatedFetch } from "../../hooks";
import { setShop } from "../../store/slices/indexSlice";

const TimerPublishedDialog = () => {
  const authenticatedFetch = useAuthenticatedFetch();
  const dispatch = useDispatch();

  const timerId = useSelector((state) => state.index.timerId);
  const displayPositionType = useSelector(
    (state) => state.index.displayPositionType
  );

  const isCustomPosition =
    displayPositionType === TIMER_POSITION_TYPE.CUSTOM_POSITION;

  const shop = useSelector((state) => state.index.shop);
  useEffect(() => {
    if (!shop || shop === "") {
      callDomainResponse(authenticatedFetch).then((domain) =>
        dispatch(setShop(`${domain}`))
      );
    }
  }, []);

  return (
    <>
      <div
        className="Polaris-Banner Polaris-Banner--statusSuccess Polaris-Banner--hasDismiss Polaris-Banner--withinPage"
        style={{ margin: "2rem" }}
      >
        <div className="Polaris-Banner__Ribbon">
          <Icon source={CircleTickMajor} color="success" />
        </div>
        <div>
          <div>
            <p className="Polaris-Heading">
              Countdown timer was successfully published in your store
            </p>
          </div>
          <div>
            <p>
              It might take up to 20 seconds for the countdown to appear in the
              store. Countdown timer app block can be also added, removed,
              repositioned, and customized through the theme editor using timer
              ID: {timerId}
            </p>
            <div className="Polaris-Banner__Actions ">
              <Button
                className="Polaris-Banner__Button Polaris-Banner--statusSuccess"
                style={{ borderColor: "#008060" }}
                onClick={() => {
                  if (shop || shop !== "") {
                    isCustomPosition
                      ? window.open(
                          `https://${shop}/admin/themes/current/editor`
                        )
                      : window.open(
                          `https://${shop}/admin/themes/current/editor`
                        );
                  }
                }}
              >
                {isCustomPosition
                  ? "Add Timer using theme editor"
                  : "Preview countdown in store"}
              </Button>
            </div>
            <div style={{ height: 16 }}></div>
            <p>
              Please Note : If Incredible-app Countdown timer Embed Block is not
              enabled then it will not work properly. Click the button below if
              it is already not enabled.
            </p>

            <div className="Polaris-Banner__Actions ">
              <Button
                className="Polaris-Banner__Button Polaris-Banner--statusSuccess"
                style={{ borderColor: "#008060" }}
                onClick={() => {
                  if (shop || shop !== "") {
                    window.open(
                      `https://${shop}/admin/themes/current/editor?context=apps&template=index&activateAppId=29738860545/app-embed
                          `
                    );
                  }
                }}
              >
                {"Enable Embed Block"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimerPublishedDialog;
