import React, { useCallback, useEffect, useState } from "react";
import { Frame, Loading, Tabs } from "@shopify/polaris";

import TAB_TYPE from "../helpers/tabs_enum";
import { BACKEND_URL, TAB_LIST, TIMER_TYPE } from "../helpers/constant";
import DesignTab from "../components/design-tab/designTab";
import ClockDetail from "../components/clock-detail/clockDetail";
import StatusPanel from "../components/status-panel/status-panel";
import PlacementTab from "../components/placement-tab/placementTab";
import axios from "axios";
// import TIMER_POSITION from "../../helpers/timer_position_enum";
// import TIMER_POSITION_TYPE from "../../helpers/timer_position_type_enum";
// import { ONCE_TIMER_ENDS } from "../../helpers/once_timer_ends_function";

import { useDispatch, useSelector } from "react-redux";
import { getQueryStringFromURl } from "../helpers/function";
import {
  setTimerID,
  setName,
  setTitle,
  setSubheading,
  setStartDate,
  setStartDateHours,
  setStartDateMinutes,
  setEndDate,
  setEndDateHours,
  setEndDateMinutes,
  setMinutesAdded,
  setTimerType,
  setTimerStatingDateType,
  setPostion,
  setDisplayPositionType,
  setPublished,
  setOnceTimerEnds,
  setListOfProductsForPosition,
  setStyle,
} from "../store/slices/indexSlice";
import Clock from "../components/clock/clock_block/clock";
import ClockBar from "../components/clock/clock_bar/clockBar";
import TIMER_POSITION from "../helpers/timer_position_enum";
import TimerBarPlacementTab from "../components/placement-tab/timerBarPlacementTab";
import TimerPublishedDialog from "../components/dialogs/timerPublishedDialog";
import TimerActivateWarningDialog from "../components/dialogs/timerWarning";
import { setSelectedTab } from "../store/slices/selectedTabSlice";
// import ClockBar from "../components/clock/clock_bar/clockBar";

const TimerConfigurationComponent = () => {
  const dispatch = useDispatch();

  // const [selectedTab, changeSelectedTab] = useState(TAB_TYPE.CONTENT_TAB);
  const selectedTab = useSelector(
    (state) => state.selectedTabSlice.selectedTab
  );

  const postion = useSelector((state) => state.index.postion);

  const [isLoading, setLoading] = useState(true);

  const initialState = useCallback(
    (timer) => {
      dispatch(setTimerID(timer._id));
      dispatch(setName(timer.timerName));
      dispatch(setTitle(timer.title));
      dispatch(setSubheading(timer.subHeading));
      dispatch(setStartDate(timer.startDate));
      dispatch(setStartDateHours(timer.startDateHours));
      dispatch(setStartDateMinutes(timer.startDateMinutes));
      dispatch(setEndDate(timer.endDate));
      dispatch(setEndDateHours(timer.endDateHours));
      dispatch(setEndDateMinutes(timer.endDateMinutes));
      dispatch(setMinutesAdded(timer.fixedMinutes));
      dispatch(setTimerType(timer.timerType));
      dispatch(setTimerStatingDateType(timer.timerStatingDateType));
      dispatch(setPostion(timer.postion));
      dispatch(setDisplayPositionType(timer.displayPositionType));
      dispatch(setPublished(timer.isPublished));
      dispatch(setOnceTimerEnds(timer.onceTimerEnds));
      dispatch(setListOfProductsForPosition(timer.listOfProductsForPosition));
      dispatch(
        setStyle({
          titleSize: timer.titleSize,
          titleColor: timer.titleColor,
          subHeadingSize: timer.subHeadingSize,
          subheadingColor: timer.subHeadingColor,
          clockTimerSize: timer.timerSize,
          clockTimerColor: timer.timerColor,
          legendColor: timer.legendColor,
          legendSize: timer.legendSize,
          clockSingleColorBackground: timer.singleColorBackground,
          clockGradientColor1: timer.gradientColor1,
          clockGradientColor2: timer.gradientColor2,
          gradientAngle: timer.gradientAngle,
          cornerRadius: timer.cornerRadius,
          borderSize: timer.borderSize,
          borderColor: timer.borderColor,
          paddingTop: timer.insideTopHeight,
          paddingBottom: timer.insideBottomHeight,
          outsideTopHeight: timer.outsideTopHeight,
          outsideBottomHeight: timer.outsideBottomHeight,
          template: timer.template,
          fontFamily: timer.font,
          backgroundColorType: timer.backgroundColorType,
        })
      );
    },
    [dispatch]
  );

  const fetchCountdownTimerList = useCallback(async () => {
    setLoading(true);
    const timerId = getQueryStringFromURl("timerId");
    const timer = await axios.get(`${BACKEND_URL}/getTimerById/${timerId}`);
    initialState(timer.data);
    setLoading(false);
    return timer;
  }, [initialState]);

  useEffect(() => {
    const isTimerOld = window.location.search.includes("timerId");
    const isTopBarType = window.location.search.includes("top-bar");
    const isProductPageType = window.location.search.includes("product-page");

    if (isTimerOld) {
      fetchCountdownTimerList();
    } else {
      setLoading(false);
    }

    if (isTopBarType) {
      dispatch(setPostion(TIMER_POSITION.TOP_BOTTOM_BAR));
    } else if (isProductPageType) {
      dispatch(setPostion(TIMER_POSITION.PRODUCTS_PAGE));
    }
  }, [dispatch, fetchCountdownTimerList]);

  return (
    <>
      {isLoading ? (
        <div style={{ height: "100px" }}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      ) : (
        <Frame>
          <StatusPanel className="home-page-status-panel" />

          <Tabs
            tabs={TAB_LIST}
            selected={selectedTab}
            onSelect={(e) => dispatch(setSelectedTab(e))}
          >
            {postion === TIMER_POSITION.TOP_BOTTOM_BAR && (
              <div style={{ marginTop: 16 }} />
            )}
            {postion === TIMER_POSITION.TOP_BOTTOM_BAR ? (
              <ClockBar />
            ) : (
              <div></div>
            )}
            {selectedTab === TAB_TYPE.CONTENT_TAB ? (
              <div className="container">
                <div className="clock-container">
                  <ClockDetail />
                  {postion === TIMER_POSITION.PRODUCTS_PAGE && <Clock />}
                </div>
              </div>
            ) : selectedTab === TAB_TYPE.DESIGN_TAB ? (
              <div className="container">
                <DesignTab />
              </div>
            ) : (
              <div className="container">
                <div className="clock-container">
                  {postion === TIMER_POSITION.PRODUCTS_PAGE ? (
                    <PlacementTab />
                  ) : (
                    <TimerBarPlacementTab />
                  )}
                  {postion === TIMER_POSITION.PRODUCTS_PAGE && <Clock />}
                </div>
              </div>
            )}
          </Tabs>
        </Frame>
      )}
    </>
  );
};

export default TimerConfigurationComponent;
