import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTimerList } from "../store/slices/user.slice";
import TimerSelector from "../components/timer-selector/timerSelector";
import { BACKEND_URL, TIMER_TYPE } from "../helpers/constant";
import { useNavigate } from "@shopify/app-bridge-react";
import { Button } from "@shopify/polaris";
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
  setOnceTimerEndsCustomTitle,
  setShop,
} from "../store/slices/indexSlice";
import TIMER_STARTING_DATE_TYPE from "../helpers/timer_starting_date_type_enum";
import TIMER_POSITION from "../helpers/timer_position_enum";
import TIMER_POSITION_TYPE from "../helpers/timer_position_type_enum";
import { ONCE_TIMER_ENDS } from "../helpers/once_timer_ends_function";
import { callDomainResponse, getInitialCSS } from "../helpers/function";
import "./home-page.css";
import { useAuthenticatedFetch } from "../hooks";

const HomePageComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticatedFetch = useAuthenticatedFetch();

  const userTimerList = useSelector((state) => state.user.timerList);
  const [isLoading, setLoading] = useState(true);

  const fetchCountdownTimerList = useCallback(async () => {
    setLoading(true);
    const domain = await callDomainResponse(authenticatedFetch);
    const timeList = await axios.get(
      `${BACKEND_URL}/user/timer-list/${domain}`
    );
    dispatch(setTimerList(timeList.data));
    dispatch(setShop(`${domain}`));
    setLoading(false);
  }, [dispatch]);

  const handleDateDefine = useCallback((timer) => {
    if (timer.timerType === TIMER_TYPE.END_DATE) {
      return `${moment(timer.startDate).format("LL")} - ${moment(
        timer.endDate
      ).format("LL")}`;
    }
    return `${timer.fixedMinutes} mins`;
  }, []);

  useEffect(() => {
    fetchCountdownTimerList();
  }, [fetchCountdownTimerList]);

  // TODO remove reset state in future
  const resetState = useCallback(() => {
    dispatch(setTimerID(""));
    dispatch(setName("First Countdown Counter"));
    dispatch(setTitle("Hurry Up!"));
    dispatch(setSubheading("Sale ends in:"));
    dispatch(setStartDate(moment().format("YYYY-MM-DD")));
    dispatch(setStartDateHours(moment().hour()));
    dispatch(setStartDateMinutes(moment().minutes()));
    dispatch(setEndDate(moment().add("days", 10).format("YYYY-MM-DD")));
    dispatch(setEndDateHours(moment().hour()));
    dispatch(setEndDateMinutes(moment().minutes()));
    dispatch(setMinutesAdded(120));
    dispatch(setTimerType(TIMER_TYPE.END_DATE));
    dispatch(setTimerStatingDateType(TIMER_STARTING_DATE_TYPE.NOW));
    dispatch(setPostion(TIMER_POSITION.PRODUCTS_PAGE));
    dispatch(setDisplayPositionType(TIMER_POSITION_TYPE.ALL_PRODUCTS));
    dispatch(setPublished(false));
    dispatch(setOnceTimerEnds(ONCE_TIMER_ENDS.UNPUBLISH_TIMER));
    dispatch(setOnceTimerEndsCustomTitle(""));
    dispatch(setListOfProductsForPosition([]));
    dispatch(setStyle({ ...getInitialCSS() }));
  }, [dispatch]);

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
          padding: "16px 0",
          gap: "1rem",
        }}
      >
        <h1 className="Polaris-Header-Title">Your countdown timers</h1>
        <Button
          primary
          onClick={() => {
            resetState();
            navigate("/timerPositionType");
          }}
        >
          <span>Create a new timer</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="home-page--loader-container">
          {[1, 2, 3].map((i) => (
            <div key={`index-${i}`} className="home-page--loader-sub">
              <div className="home-page--loader" />
            </div>
          ))}
        </div>
      ) : userTimerList.length === 0 ? (
        <div
          style={{ background: "FFF" }}
          className="Polaris-EmptyState__Section"
        >
          <div className="Polaris-EmptyState__DetailsContainer">
            <div className="Polaris-EmptyState__Details">
              <div className="Polaris-TextContainer">
                <p className="Polaris-DisplayText Polaris-DisplayText--sizeSmall">
                  This is where you&apos;ll manage your timers
                </p>
                <div className="Polaris-EmptyState__Content">
                  <p>
                    Start by creating your first countdown timer and publishing
                    it to your store.
                  </p>
                </div>
              </div>
              <div className="Polaris-EmptyState__Actions">
                <div className="Polaris-Stack Polaris-Stack--spacingTight Polaris-Stack--distributionCenter Polaris-Stack--alignmentCenter">
                  <div className="Polaris-Stack__Item">
                    <Button
                      primary
                      onClick={() => {
                        resetState();
                        navigate("/timerPositionType");
                      }}
                    >
                      <span>Create a new timer</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Polaris-EmptyState__ImageContainer">
            <img
              alt=""
              src="https://incredible-apps.com/wp-content/uploads/2023/04/empty_countdown_apps.png"
              className="Polaris-EmptyState__Image"
              role="presentation"
            />
          </div>
        </div>
      ) : (
        <table className="timer-selector">
          <tbody>
            {userTimerList?.length > 0 &&
              userTimerList.map((timer) => (
                <TimerSelector
                  key={timer._id}
                  timerId={timer._id}
                  name={timer.timerName}
                  positionType={timer.postion}
                  date={handleDateDefine(timer)}
                  isPublished={timer.isPublished}
                />
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomePageComponent;
