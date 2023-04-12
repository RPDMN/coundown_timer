import { Frame } from "@shopify/polaris";
import React, { useMemo } from "react";

import HomePageComponent from "./homePage";
import TimerPositionType from "./timerPositionType";
import { PAGE_ROUTE } from "../helpers/constant";
import TimerConfigurationComponent from "./timerConfigurationComponent";

import "./index.css";
import { getQueryStringFromURl } from "../helpers/function";

const AppComponent = () => {
  const pageRenderer = useMemo(() => {
    return getQueryStringFromURl("pg") || PAGE_ROUTE.HOME;
  }, []);

  return (
    <Frame>
      {pageRenderer === PAGE_ROUTE.HOME && <HomePageComponent />}
      {pageRenderer === PAGE_ROUTE.POSITION_TYPE && <TimerPositionType />}
      {pageRenderer === PAGE_ROUTE.CONFIGURE && <TimerConfigurationComponent />}
    </Frame>
  );
};

export default AppComponent;
