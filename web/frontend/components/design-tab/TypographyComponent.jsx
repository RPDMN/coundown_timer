import {
  Card,
  Select,
  Button,
  RadioButton,
  RangeSlider,
  Layout,
  Stack,
  ColorPicker,
  TextField,
} from "@shopify/polaris";
import React, { useEffect, useState, useCallback } from "react";
import TimerTypes from "../../helpers/timer_types";
import "./designTab.css";
import { useSelector } from "react-redux";
import "@shopify/polaris/build/esm/styles.css";
import ColorPickerComponent from "./ColorPickerComponent.jsx";

const TypographyComponent = ({
  title,
  value,
  onChange,
  onColor,
  colorHslValue,
}) => {
  const data = useSelector((state) => {
    return state.index;
  });

  return (
    <div>
      {title}
      <div style={{ height: 3 }}></div>
      <Stack>
        <TextField
          type="number"
          suffix="px"
          value={value}
          onChange={(val) => onChange(val)}
          autoComplete="off"
        />

        <ColorPickerComponent
          currentHexColor={colorHslValue}
          onChange={(val) => {
            onColor(val);
          }}
        ></ColorPickerComponent>
      </Stack>
    </div>
  );
};

export default TypographyComponent;
