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
  Tag,
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
  const [startDate, setStartDate] = useState("12 feb 2023");
  const [endDate, setEndDate] = useState("12 june 2023");
  const [published, setPublished] = useState("no");
  const publishButton = {
    content: "Publish",
    onAction: () => {
      createTimerFunction();
    },
  };

  // const updateButton = {
  //   content: "up",
  //   onAction: () => {
  //     updateTimerFunction();
  //   },
  // };

  // const updateButton = {
  //   content: "Update",
  //   onAction: () => {
  //     updateTimerFunction();
  //   },
  // };

  // const deleteButton = {
  //   content: "Delete",
  //   onAction: () => {
  //     deleteTimerFunction();
  //   },
  // };

  useEffect(() => {
    console.log(startDate);
    console.log(endDate);
  }, [startDate, endDate]);

  const secondaryActions = [{ content: "Delete", url: "/bar", loading: false }];
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
      .get(`${url}/getTimerByShopId/req.body.ripuuuu`)
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
    // axios
    //   .post("http://localhost:3000/create/timer", {
    //     timerName: countdownName,
    //     title: title,
    //     subHeading: subheading,
    //     startDate: "req.body",
    //     endDate: "req.body.endDate",
    //     fixedMinutes: "req.body.fixedMinutes",
    //     repeat: true,
    //     timertType: "req.body.timertType",
    //     postion: "req.body.postion",
    //     shop: "req.body.ri",
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

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
    const countDownDate = new Date(endDate).getTime();
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

  // useEffect(() => {
  //   setStartDate("12 feb 2000");
  //   setTimerDays(0);
  //   setTimerHours(0);
  //   setTimerMinutes(timerMinutes);
  //   setTimerSeconds(2);
  //   startTimer();
  // }, [timerMinutes]);

  useEffect(() => {
    console.log(countdownName);
  }, [title]);

  return (
    <div>
      <div>
        <Layout.Section>
          <Page>
            {/* <TitleBar
              title="App name"
              primaryAction={publishButton}
              // breadcrumbs={[{ content: "Breadcrumb" }]}
              //secondaryActions={[deleteButton]}
            ></TitleBar> */}

            <div class="Polaris-Page Polaris-Page--FullWidth">
              <div class="Polaris-Page-Header ">
                <div class="Polaris-Page-Header__Row">
                  <div class="Polaris-Page-Header__BreadcrumbWrapper">
                    <nav role="navigation"></nav>
                  </div>
                  <div
                    class="Polaris-Page-Header__TitleWrapper"
                    style={{
                      margineTop: "-4rem ",
                      marginLeft: "-12rem",
                    }}
                  >
                    <div class="Polaris-Header-Title__TitleWithMetadataWrapper">
                      <h1 class="Polaris-Header-Title Polaris-Header-Title__TitleWithSubtitle">
                        {countdownName}
                      </h1>
                      <div>
                        {buttonSelector === 1 ? (
                          <div class="Polaris-Header-Title__TitleMetadata">
                            <span class="Polaris-Badge">
                              <span>Not published</span>
                            </span>
                          </div>
                        ) : (
                          <div class="Polaris-Header-Title__TitleMetadata">
                            <span
                              class="Polaris-Badge"
                              style={{ color: "green" }}
                            >
                              <span>published</span>
                            </span>
                          </div>
                        )}
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
                              aria-disabled="true"
                              type="button"
                              onClick={() => createTimerFunction()}
                            >
                              <span class="Polaris-Button__Text">Publish</span>
                            </button>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                type="button"
                                class="Polaris-ActionList__Item Polaris-ActionList--destructive"
                                onClick={() => deleteTimerFunction()}
                              >
                                <span class="Polaris-ActionList__Text">
                                  Delete
                                </span>
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
              <hr
                style={{
                  width: "147%",
                  marginLeft: "-14rem",
                  borderColor: "white",
                  // color: "white",
                }}
              />
            </div>
          </Page>
        </Layout.Section>
      </div>

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Page narrowWidth>
          <div style={{ marginLeft: "-11rem" }}>
            <Layout.Section>
              <TimerBuilder
                setCountdownName={setCountdownName}
                setTitle={setTitle}
                setSubheading={setSubheading}
                setTimerMinutes={setTimerMinutes}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
                createTimerFunction={createTimerFunction}
                buttonSelector={buttonSelector}
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
    </div>
  );
}
