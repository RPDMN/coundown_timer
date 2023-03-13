import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
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

  const [text, setText] = useState("Hurry Up! ");
  const [subheading, setSubheading] = useState("sale ends in:");
  const [now, setNow] = useState();
  const [counterDate, setCounterDate] = useState("12 feb 2024");
  const themeSetFunction = (theme) => {
    setThemeState(theme);
  };

  const textSet = (e) => {
    settext(e);
  };

  let interval;

  const startTimer = () => {
    const countDownDate = new Date(counterDate).getTime();
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

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    setCounterDate("12 feb 2000");
    setTimerDays(0);
    setTimerHours(0);
    setTimerMinutes(timerMinutes);
    setTimerSeconds(2);
    startTimer();
  }, [timerMinutes]);

  useEffect(() => {
    console.log(counterDate);
  }, [counterDate]);

  return (
    <Page narrowWidth>
      <div>
        <TitleBar title="App name" primaryAction={null} />

        <Layout.Section>
          <Card sectioned>
            <Clock
              timerDays={timerDays}
              timerHours={timerHours}
              timerMinutes={timerMinutes}
              timerSeconds={timerSeconds}
              themeState={themeState}
              text={text}
              subheading={subheading}
            />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <TimerBuilder
            setText={setText}
            setSubheading={setSubheading}
            setTimerMinutes={setTimerMinutes}
            setCounterDate={setCounterDate}
            setNow={setNow}
          />
        </Layout.Section>
      </div>
    </Page>
  );
}
