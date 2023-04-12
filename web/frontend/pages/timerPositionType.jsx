import React from "react";
import { Button, Icon } from "@shopify/polaris";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import "./index.css";
import { useNavigate } from "@shopify/app-bridge-react";
import { useDispatch } from "react-redux";
import { setPostion, setStyle } from "../store/slices/indexSlice";
import TIMER_POSITION from "../helpers/timer_position_enum";
import { getInitialCSS, getInitialTimerBarCSS } from "../helpers/function";

const TimerPositionType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="timer-type">
        <div className="timer-type-top-bar">
          <div className="Polaris-Page-Header__BreadcrumbWrapper">
            <button
              className="Polaris-Breadcrumbs__Breadcrumb"
              onClick={() => {
                navigate("/homePage");
              }}
              type="button"
            >
              <Icon source={MobileBackArrowMajor} color="base" />
            </button>
          </div>
          <div className="Polaris-Page-Header__TitleWrapper">
            <h1 className="Polaris-Header-Title">Choose timer type</h1>
          </div>
        </div>
      </div>

      <div className="timer-selector-card-holder">
        <div className="timer-selector-card-1">
          <div className="Polaris-Card">
            <div className="Polaris-Card__Section">
              <img
                alt="Product page"
                width="100%"
                src="https://incredible-apps.com/wp-content/uploads/2023/04/product_bg.svg"
                className="sc-grREDI kNXxVx"
                // style="object-fit: cover; object-position: center center;"
              />
              <div className="Polaris-TextContainer">
                <h2 className="Polaris-Heading">Product page </h2>
                <p>Block in product page below add to cart button.</p>
                <Button
                  fullWidth
                  onClick={() => {
                    dispatch(setPostion(TIMER_POSITION.PRODUCTS_PAGE));
                    dispatch(setStyle({ ...getInitialCSS() }));
                    navigate("/timerConfigurationComponent?type=product-page");
                  }}
                >
                  Select this timer type
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="timer-selector-card-2">
          <div className="sc-HzFiz cbTYoN">
            <div className="Polaris-Card">
              <div className="Polaris-Card__Section">
                <img
                  width="100%"
                  alt="Top Bottom Bar"
                  src="https://incredible-apps.com/wp-content/uploads/2023/04/top_bottom.svg"
                />
                <div className="Polaris-TextContainer">
                  <h2 className="Polaris-Heading">Top/bottom bar</h2>
                  <p>
                    Fixed or sticky bar on the top or the bottom of any page.
                  </p>
                  <Button
                    fullWidth
                    onClick={() => {
                      dispatch(setPostion(TIMER_POSITION.TOP_BOTTOM_BAR));
                      dispatch(setStyle({ ...getInitialTimerBarCSS() }));
                      navigate("/timerConfigurationComponent?type=top-bar");
                    }}
                  >
                    Select this timer type
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimerPositionType;
