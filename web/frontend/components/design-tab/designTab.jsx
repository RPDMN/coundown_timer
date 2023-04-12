import {
  Card,
  Select,
  Button,
  RadioButton,
  RangeSlider,
  TextField,
  Checkbox,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import "./designTab";
import "@shopify/polaris/build/esm/styles.css";
import ColorPickerComponent from "./ColorPickerComponent";
import TypographyComponent from "./TypographyComponent";
import { useDispatch, useSelector } from "react-redux";
import { setStyle } from "../../store/slices/indexSlice";
import themesArray, {
  defaultSpacingAndSizing,
  defaultTimerBarSpacingAndSizing,
  templateOptionsList,
  timerBarThemesArray,
} from "./themes";
import ClockBackgroundColorTypes from "../../helpers/clock_background_color_types.js";
import "./designTab.css";
import Clock from "../clock/clock_block/clock";
import TIMER_POSITION from "../../helpers/timer_position_enum";
import { timerBarPositionOptions } from "../../helpers/timer_bar_position";
import {
  setIsSticky,
  setTimerBarPosition,
  setExtraStyle,
} from "../../store/slices/timerBarExtraParamSlice";
import { setSelectedTab } from "../../store/slices/selectedTabSlice";
import TAB_TYPE from "../../helpers/tabs_enum";

const DesignTab = (props) => {
  const dispatch = useDispatch();
  const css = useSelector((state) => state.index.css);
  const postion = useSelector((state) => state.index.postion);

  const timerBarPosition = useSelector(
    (state) => state.timerBarExtras.timerBarPosition
  );
  const isSticky = useSelector((state) => state.timerBarExtras.isSticky);
  const timerBarExtraCss = useSelector(
    (state) => state.timerBarExtras.extraCss
  );

  const handleSelectChange = useCallback(
    (value) => {
      let selectedThemeArr;
      let selectedDefaultSpacing;
      if (postion === TIMER_POSITION.PRODUCTS_PAGE) {
        selectedThemeArr = themesArray;
        selectedDefaultSpacing = defaultSpacingAndSizing;
      } else {
        selectedThemeArr = timerBarThemesArray;
        selectedDefaultSpacing = defaultTimerBarSpacingAndSizing;
      }
      dispatch(
        setStyle({
          titleSize: selectedDefaultSpacing.titleSize,
          titleColor: selectedThemeArr[value].titleColor,
          subHeadingSize: selectedDefaultSpacing.subHeadingSize,
          subheadingColor: selectedThemeArr[value].subheadingColor,
          clockTimerSize: selectedDefaultSpacing.timerSize,
          clockTimerColor: selectedThemeArr[value].clockTimerColor,
          legendColor: selectedThemeArr[value].legendColor,
          legendSize: selectedDefaultSpacing.legendSize,
          clockSingleColorBackground:
            selectedThemeArr[value].clockSingleColorBackground,
          clockGradientColor1: selectedThemeArr[value].clockGradientColor1,
          clockGradientColor2: selectedThemeArr[value].clockGradientColor2,
          gradientAngle: selectedThemeArr[value].gradientAngle,
          cornerRadius: selectedDefaultSpacing.cornerRadius,
          borderSize: selectedDefaultSpacing.borderSize,
          borderColor: selectedThemeArr[value].borderColor,
          paddingTop: selectedDefaultSpacing.paddingTop,
          paddingBottom: selectedDefaultSpacing.paddingBottom,
          outsideTopHeight: selectedDefaultSpacing.marginTop,
          outsideBottomHeight: selectedDefaultSpacing.marginBottom,
          template: value,
          fontFamily: selectedThemeArr[value].fontFamily,
          backgroundColorType: selectedThemeArr[value].backgroundColorType,
        })
      );

      if (postion === TIMER_POSITION.TOP_BOTTOM_BAR) {
        dispatch(
          setExtraStyle({
            buttonColor: selectedThemeArr[value].buttonColor,
            buttonFontSize: selectedThemeArr[value].buttonFontSize,
            buttonFontColor: selectedThemeArr[value].buttonFontColor,
            buttonCornerRadius: selectedThemeArr[value].buttonCornerRadius,
          })
        );
      }
    },
    [dispatch, postion]
  );

  const [selectedFont, setSelectedFont] = useState({
    label: "Use your theme fonts",
    value: "",
  });

  const handleSelectedFont = useCallback(
    (value) => {
      dispatch(setStyle({ fontFamily: value }));

      setSelectedFont(value);
    },
    [dispatch]
  );

  const fontOptions = [
    { label: "Use your theme fonts", value: "" },
    { label: "Helvetica", value: "Helvetica" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Georgia", value: "Georgia" },
    { label: "Garamond", value: "Garamond" },
    { label: "Courier New", value: "Courier New" },
  ];

  return (
    <div className="clock-container">
      <div className="clock-detail-container">
        <Card>
          <div className="timerBuilder">
            {postion === TIMER_POSITION.TOP_BOTTOM_BAR && (
              <div className="Polaris-Card__Section">
                <Select
                  label="Positioning"
                  options={timerBarPositionOptions}
                  onChange={(e) => {
                    dispatch(setTimerBarPosition(e));
                  }}
                  value={timerBarPosition}
                />
                <div style={{ marginTop: "1rem" }}>
                  <Checkbox
                    label="Sticky Bar"
                    helpText="Always visible while scrolling"
                    checked={isSticky}
                    onChange={(e) => dispatch(setIsSticky(e))}
                  />
                </div>
              </div>
            )}
            <div className="Polaris-Card__Section">
              <Select
                label="Template"
                options={templateOptionsList}
                onChange={(e) => handleSelectChange(e)}
                value={css.template}
              />
            </div>
            <div className="Polaris-Card__Section">
              <div className="Polaris-RadioButton">
                <h6 style={{ fontWeight: "bold" }}>Card</h6>
                <div
                  className="single-color-radio-button"
                  // style={{ marginTop: 16, marginBottom: 16 }}
                >
                  <RadioButton
                    label="Single color background"
                    checked={
                      css.backgroundColorType ===
                      ClockBackgroundColorTypes.single
                    }
                    value={ClockBackgroundColorTypes.single}
                    onChange={(val) => {
                      dispatch(
                        setStyle({
                          backgroundColorType: ClockBackgroundColorTypes.single,
                        })
                      );
                      dispatch(
                        setStyle({
                          clockSingleColorBackground:
                            css.clockSingleColorBackground,
                        })
                      );
                    }}
                  />
                  <div style={{ height: 16 }} />
                  <ColorPickerComponent
                    currentHexColor={css.clockSingleColorBackground}
                    disabled={
                      css.backgroundColorType ===
                      ClockBackgroundColorTypes.gradient
                    }
                    onChange={(hexColorCode) => {
                      dispatch(
                        setStyle({ clockSingleColorBackground: hexColorCode })
                      );
                    }}
                  ></ColorPickerComponent>
                </div>
                <div>
                  <RadioButton
                    label="Gradient background"
                    name="accounts"
                    value={ClockBackgroundColorTypes.gradient}
                    checked={
                      css.backgroundColorType ===
                      ClockBackgroundColorTypes.gradient
                    }
                    onChange={(val) => {
                      dispatch(
                        setStyle({
                          backgroundColorType:
                            ClockBackgroundColorTypes.gradient,
                        })
                      );
                      dispatch(
                        setStyle({
                          clockGradientColor1: css.clockGradientColor1,
                        })
                      );
                      dispatch(
                        setStyle({
                          clockGradientColor2: css.clockGradientColor2,
                        })
                      );
                    }}
                  />
                  <div style={{ height: 16 }} />
                  <RangeSlider
                    output
                    label="Gradient angle degree"
                    min={0}
                    max={360}
                    value={css.gradientAngle}
                    disabled={
                      css.backgroundColorType ===
                      ClockBackgroundColorTypes.single
                    }
                    onChange={(value) =>
                      dispatch(setStyle({ gradientAngle: value }))
                    }
                  />
                  <div style={{ height: 16 }} />

                  <ColorPickerComponent
                    currentHexColor={css.clockGradientColor1}
                    disabled={
                      css.backgroundColorType ===
                      ClockBackgroundColorTypes.single
                    }
                    onChange={(val) => {
                      dispatch(setStyle({ clockGradientColor1: val }));
                    }}
                  ></ColorPickerComponent>
                  <div style={{ height: 16 }} />

                  <ColorPickerComponent
                    currentHexColor={css.clockGradientColor2}
                    disabled={
                      css.backgroundColorType ===
                      ClockBackgroundColorTypes.single
                    }
                    onChange={(val) => {
                      dispatch(setStyle({ clockGradientColor2: val }));
                    }}
                  ></ColorPickerComponent>
                </div>
                <div style={{ height: 16 }} />
                <div>
                  <TextField
                    label="Corner radius"
                    type="number"
                    suffix="px"
                    value={css.cornerRadius}
                    onChange={(val) =>
                      dispatch(setStyle({ cornerRadius: val }))
                    }
                    autoComplete="off"
                  />
                </div>

                <div style={{ height: 16 }} />

                <TextField
                  label="Border Size"
                  type="number"
                  suffix="px"
                  value={css.borderSize}
                  onChange={(val) => dispatch(setStyle({ borderSize: val }))}
                  autoComplete="off"
                  min={0}
                />
                <div style={{ height: 16 }} />
                <div>
                  Border Color
                  <div style={{ height: 3 }}></div>
                  <ColorPickerComponent
                    currentHexColor={css.borderColor}
                    ColorPickerComponent={css.borderColor}
                    onChange={(val) => {
                      dispatch(setStyle({ borderColor: val }));
                    }}
                  ></ColorPickerComponent>
                </div>

                <div style={{ height: 16 }} />
              </div>
            </div>
            <div className="Polaris-Card__Section">
              <h6 style={{ fontWeight: "bold" }}>Spacing</h6>
              <div style={{ height: 16 }} />

              <TextField
                type="number"
                helpText="Inside top"
                suffix="px"
                value={css.paddingTop}
                onChange={(val) =>
                  dispatch(setStyle({ paddingTop: val > 100 ? 100 : val }))
                }
                autoComplete="off"
                max={100}
                min={0}
              />
              <div style={{ height: 16 }} />
              <TextField
                type="number"
                helpText="Inside bottom"
                suffix="px"
                value={css.paddingBottom}
                onChange={(val) =>
                  dispatch(setStyle({ paddingBottom: val > 100 ? 100 : val }))
                }
                autoComplete="off"
                max={100}
                min={0}
              />

              {postion === TIMER_POSITION.PRODUCTS_PAGE && (
                <div>
                  <div style={{ height: 16 }} />

                  <TextField
                    type="number"
                    max={100}
                    min={0}
                    helpText="Outside top"
                    suffix="px"
                    value={css.outsideTopHeight}
                    onChange={(val) =>
                      dispatch(
                        setStyle({ outsideTopHeight: val > 100 ? 100 : val })
                      )
                    }
                    autoComplete="off"
                  />
                  <div style={{ height: 16 }} />
                  <TextField
                    type="number"
                    max={100}
                    min={0}
                    helpText="Outside bottom"
                    suffix="px"
                    value={css.outsideBottomHeight}
                    onChange={(val) =>
                      dispatch(
                        setStyle({ outsideBottomHeight: val > 100 ? 100 : val })
                      )
                    }
                    autoComplete="off"
                  />
                </div>
              )}
            </div>

            <div className="Polaris-Card__Section">
              <h6 style={{ fontWeight: "bold" }}>Typography</h6>
              <div style={{ height: 16 }} />
              <Select
                label="Font"
                options={fontOptions}
                onChange={handleSelectedFont}
                value={selectedFont}
                helpText="Theme fonts are not available in the preview mode. Publish timer to preview it in store."
              />
              <div style={{ height: 16 }} />
              <TypographyComponent
                title="Title Size and color"
                value={css.titleSize}
                onChange={(e) => dispatch(setStyle({ titleSize: e }))}
                colorHslValue={css.titleColor}
                onColor={(e) => {
                  dispatch(setStyle({ titleColor: e }));
                }}
              />
              <div style={{ height: 16 }} />
              <TypographyComponent
                title="Subheading size and color"
                value={css.subHeadingSize}
                onChange={(e) => dispatch(setStyle({ subHeadingSize: e }))}
                colorHslValue={css.subheadingColor}
                onColor={(e) => {
                  dispatch(setStyle({ subheadingColor: e }));
                }}
              />
              <div style={{ height: 16 }} />
              <TypographyComponent
                title="Timer size and color"
                value={css.clockTimerSize}
                onChange={(e) => dispatch(setStyle({ clockTimerSize: e }))}
                colorHslValue={css.clockTimerColor}
                onColor={(e) => {
                  dispatch(setStyle({ clockTimerColor: e }));
                }}
              />
              <div style={{ height: 16 }} />
              <TypographyComponent
                title="Legend size and color"
                value={css.legendSize}
                onChange={(e) => dispatch(setStyle({ legendSize: e }))}
                colorHslValue={css.legendColor}
                onColor={(e) => {
                  dispatch(setStyle({ legendColor: e }));
                }}
              />
              <div style={{ height: 16 }} />
            </div>
            {postion === TIMER_POSITION.TOP_BOTTOM_BAR && (
              <div className="Polaris-Card__Section">
                <h6 style={{ fontWeight: "bold" }}>Button</h6>
                <div style={{ height: 16 }} />
                <div>
                  Button Color
                  <div style={{ height: 3 }}></div>
                  <ColorPickerComponent
                    currentHexColor={timerBarExtraCss.buttonColor}
                    ColorPickerComponent={timerBarExtraCss.buttonColor}
                    onChange={(val) => {
                      dispatch(
                        setExtraStyle({
                          buttonColor: val,
                        })
                      );
                    }}
                  ></ColorPickerComponent>
                </div>
                <div style={{ height: 16 }} />
                <TypographyComponent
                  title="Button font size and color"
                  value={timerBarExtraCss.buttonFontSize}
                  onChange={(val) =>
                    dispatch(
                      setExtraStyle({
                        buttonFontSize: val,
                      })
                    )
                  }
                  colorHslValue={timerBarExtraCss.buttonFontColor}
                  onColor={(e) => {
                    // dispatch(setExtraStyle({ buttonFontColor: e }));
                    dispatch(
                      setExtraStyle({
                        buttonFontColor: e,
                      })
                    );
                  }}
                />
              </div>
            )}

            <div className="Polaris-Card__Section">
              <Button
                size="large "
                fullWidth="true"
                onClick={() => {
                  dispatch(setSelectedTab(TAB_TYPE.PLACEMENT_TAB));
                }}
              >
                Continue to Placement
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="clock--container-max">
        <div className="clock--container-sticky">
          {postion === TIMER_POSITION.PRODUCTS_PAGE ? (
            <div>
              <div className="top-shadow" style={{ marginBottom: "1rem" }} />

              <Clock
                timerDays={"00"}
                timerHours={"00"}
                timerMinutes={"00"}
                timerSeconds={"00"}
                title={"Hurry Up!"}
                subheading={"Sales ends in:"}
              />
              <div className="bottom-shadow" style={{ marginTop: "1rem" }} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div style={{ height: 20 }}></div>
    </div>
  );
};

export default DesignTab;
