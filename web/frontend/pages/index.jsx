import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { TitleBar } from "@shopify/app-bridge-react";
import "./Clock.css";
import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import Clock from "./Clock";
import TimerBuilder from "./timerBuilder";
import "./Clock.css";
export default function HomePage() {
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(1);
  const [timerMinutes, setTimerMinutes] = useState(7);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [themeState, setThemeState] = useState(1);
  const [buttonSelector, setButtonSelector] = useState(1);
  const [countdownName, setCountdownName] = useState("First Countdown Counter");
  const [title, setTitle] = useState("Hurry Up! ");
  const [subheading, setSubheading] = useState("Sale ends in:");
  const [now, setNow] = useState();
  const [startDate, setStartDate] = useState("12 june 2023");
  const [published, setPublished] = useState("no");
  const shopName = window.Shopify
    ? window.Shopify.shop
    : window.location.origin;
  const [intialState, setInitialState] = useState({});
  const themeSetFunction = (theme) => {
    setThemeState(theme);
  };

  const url = "http://localhost:3000";
  // state
  // init state - useeffect - state

  //first time (state - no data)
  // create button
  // state - save response

  // old user (state - data)
  // update/ delete
  // state already has daa

  useEffect(() => {
    axios
      .get(`${url}/getTimerByShopId/req.body.ri`)
      .then((response) => {
        console.log(shopName);
        console.log(response.data);
        setInitialState(response.data);
        if (response.data.length != 0) {
          setButtonSelector(2);
          setPublished("yes");
          setCountdownName(response.data[0].timerName);
        } else {
          setButtonSelector(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const textSet = (e) => {
  //   settext(e);
  // };

  const createTimerFunction = async () => {
    axios
      .post("http://localhost:3000/create/timer", {
        timerName: countdownName,
        title: title,
        subHeading: subheading,
        startDate: "req.body",
        endDate: "req.body.endDate",
        fixedMinutes: "req.body.fixedMinutes",
        repeat: true,
        timertType: "req.body.timertType",
        postion: "req.body.postion",
        shop: "req.body.ri",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setButtonSelector(2);
  };

  const deleteTimerFunction = async () => {
    axios
      .delete("http://localhost:3000/delete/6411bae2195b17ffe6474d5c")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTimerFunction = async () => {
    axios
      .patch("http://localhost:3000/update/6411b5a5195b17ffe6474d52", {
        timerName: countdownName,
        title: title,
        subHeading: subheading,
        startDate: "req.body.startDate",
        endDate: "req.body.endDate",
        fixedMinutes: "req.body.fixedMinutes",
        repeat: true,
        timertType: "req.body.timertType",
        postion: "req.body.postion",
        shop: "req.body.shop",
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let interval;

  const startTimer = () => {
    const countDownDate = new Date(startDate).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      //console.log(now);
      const distance = countDownDate - now;
      //console.log(distance);
      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance <= 0) {
        //stop the timer
        clearInterval(interval.clearInterval);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    //clearInterval(interval.clearInterval);
    startTimer();
  }, []);

  useEffect(() => {
    setStartDate("12 feb 2000");
    setTimerDays(0);
    setTimerHours(0);
    setTimerMinutes(timerMinutes);
    setTimerSeconds(2);
    startTimer();
  }, [timerMinutes]);

  useEffect(() => {
    console.log(countdownName);
  }, [title]);

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Page>
        <TitleBar title="App name" primaryAction={null} />
        <div class="Polaris-Page Polaris-Page--FullWidth">
          <div class="Polaris-Page-Header Polaris-Page-Header--hasNavigation Polaris-Page-Header--hasActionMenu Polaris-Page-Header--mobileView Polaris-Page-Header--mediumTitle">
            <div class="Polaris-Page-Header__Row">
              <div class="Polaris-Page-Header__BreadcrumbWrapper">
                <nav role="navigation">
                  <button class="Polaris-Breadcrumbs__Breadcrumb" type="button">
                    <span class="Polaris-Breadcrumbs__Icon">
                      <span class="Polaris-Icon">
                        <span class="Polaris-VisuallyHidden"></span>
                        <svg
                          viewBox="0 0 20 20"
                          class="Polaris-Icon__Svg"
                          focusable="false"
                          aria-hidden="true"
                        >
                          <path d="M17 9h-11.586l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414l-3.293-3.293h11.586a1 1 0 1 0 0-2z"></path>
                        </svg>
                      </span>
                    </span>
                    <span class="Polaris-VisuallyHidden">Home</span>
                  </button>
                </nav>
              </div>
              <div class="Polaris-Page-Header__TitleWrapper">
                <div class="Polaris-Header-Title__TitleWithMetadataWrapper">
                  <h1 class="Polaris-Header-Title Polaris-Header-Title__TitleWithSubtitle">
                    {countdownName}
                  </h1>
                  <div class="Polaris-Header-Title__TitleMetadata">
                    <span class="Polaris-Badge">
                      <span>Not published</span>
                    </span>
                  </div>
                </div>
                <div></div>
                <div class="Polaris-Header-Title__SubTitle">
                  <p>Timer ID: sdf3453534534mmkm34543</p>
                </div>
              </div>
              <div class="Polaris-Page-Header__RightAlign">
                <div class="Polaris-Page-Header__Actions">
                  <div class="Polaris-ActionMenu">
                    <div>
                      <div class="Polaris-ActionMenu-RollupActions__RollupActivator"></div>
                    </div>
                  </div>
                  <div class="Polaris-Page-Header__PrimaryActionWrapper">
                    <div>
                      {buttonSelector === 1 ? (
                        <button
                          class="Polaris-Button Polaris-Button--primary"
                          aria-disabled="false"
                          type="button"
                          onClick={() => createTimerFunction()}
                        >
                          <span class="Polaris-Button__Text">Publish</span>
                        </button>
                      ) : (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <button
                            type="button"
                            class="Polaris-ActionList__Item Polaris-ActionList--destructive"
                            onClick={() => deleteTimerFunction()}
                          >
                            <span class="Polaris-ActionList__Text">Delete</span>
                          </button>

                          <button
                            class="Polaris-Button Polaris-Button--primary"
                            aria-disabled="false"
                            type="button"
                            onClick={() => updateTimerFunction()}
                          >
                            <span
                              class="Polaris-Button__Text"
                              //style={{ margin: ".2rem" }}
                            >
                              Update
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
      <Page narrowWidth>
        <div>
          <Layout.Section>
            <TimerBuilder
              setCountdownName={setCountdownName}
              setTitle={setTitle}
              setSubheading={setSubheading}
              setTimerMinutes={setTimerMinutes}
              setStartDate={setStartDate}
              setNow={setNow}
              createTimerFunction={createTimerFunction}
            />
          </Layout.Section>
        </div>
      </Page>

      <Page narrowWidth>
        <Card sectioned>
          {/* <div
            style={{
              fontSize: "1rem!important",
              width: "22rem",
              height: "1rem!important",
              position: "sticky",
            }}
          > */}
          <Clock
            timerDays={timerDays}
            timerHours={timerHours}
            timerMinutes={timerMinutes}
            timerSeconds={timerSeconds}
            themeState={themeState}
            title={title}
            subheading={subheading}
          />
          {/* </div> */}
        </Card>
      </Page>
    </div>
  );
}
