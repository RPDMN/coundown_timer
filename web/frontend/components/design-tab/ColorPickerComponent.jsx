import { Stack, ColorPicker, TextField, Popover } from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import "./designTab.css";
import "@shopify/polaris/build/esm/styles.css";

const hsvToHsl = (h, s, v) => {
  // both hsv and hsl values are in [0, 1]
  const l = ((2 - s) * v) / 2;

  if (l !== 0) {
    if (l === 1) {
      s = 0;
    } else if (l < 0.5) {
      s = (s * v) / (l * 2);
    } else {
      s = (s * v) / (2 - l * 2);
    }
  }

  return [h, s, l];
};

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `${f(0)}${f(8)}${f(4)}`;
}

function HexToHsl(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);

  // eslint-disable-next-line no-unused-expressions
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  let l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  var colorInHSL = "hsl(" + h + ", " + s + "%, " + l + "%)";
  return {
    hue: h,
    saturation: s,
    brightness: l,
    alpha: 1,
  };
}

const ColorPickerComponent = ({ onChange, disabled, currentHexColor }) => {
  const [color, setColor] = useState({
    hue: 120,
    saturation: 1,
    brightness: 1,
    alpha: 1,
  });

  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  // const [colorHex, changeColorHex] = useState("FFFFFF");

  const handleSetColor = (newColor) => {
    setColor(newColor);
    const cc = hsvToHsl(newColor.hue, newColor.saturation, newColor.brightness);
    const hexColorCode = hslToHex(cc[0], cc[1] * 100, cc[2] * 100);
    onChange(hexColorCode);
  };

  const handleHexColorChange = (hexColorCode) => {
    // TODO check if color is correct or not
    onChange(hexColorCode);
  };

  const activator = (
    <div
      className="colorPicker"
      style={{
        backgroundColor: `#${currentHexColor}`,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "default",
      }}
      onClick={togglePopoverActive}
    />
  );

  return (
    <Stack>
      <div>
        <Popover
          active={disabled ? false : popoverActive}
          activator={activator}
          autofocusTarget="first-node"
          onClose={togglePopoverActive}
        >
          <ColorPicker onChange={handleSetColor} color={color} />
        </Popover>
      </div>
      <TextField
        prefix="#"
        value={`${currentHexColor}`}
        onChange={(val) => handleHexColorChange(val)}
        autoComplete="off"
        disabled={disabled}
      />
    </Stack>
  );
};

export default ColorPickerComponent;
