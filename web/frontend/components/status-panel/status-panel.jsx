import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast, Button, ButtonGroup, Icon } from "@shopify/polaris";
import { callDomainResponse, getInitialCSS } from "../../helpers/function";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import { BACKEND_URL, TIMER_TYPE } from "../../helpers/constant";
import {
  setDisplayPositionType,
  setEndDate,
  setEndDateHours,
  setEndDateMinutes,
  setListOfProductsForPosition,
  setMinutesAdded,
  setName,
  setOnceTimerEnds,
  setOnceTimerEndsCustomTitle,
  setPostion,
  setPublished,
  setShop,
  setStartDate,
  setStartDateHours,
  setStartDateMinutes,
  setStyle,
  setSubheading,
  setTimerID,
  setTimerStatingDateType,
  setTimerType,
  setTitle,
} from "../../store/slices/indexSlice";

import "./status-panel.css";
import moment from "moment";
import TIMER_STARTING_DATE_TYPE from "../../helpers/timer_starting_date_type_enum";
import TIMER_POSITION from "../../helpers/timer_position_enum";
import TIMER_POSITION_TYPE from "../../helpers/timer_position_type_enum";
import { ONCE_TIMER_ENDS } from "../../helpers/once_timer_ends_function";
import { useNavigate } from "@shopify/app-bridge-react";
import TimerPublishedDialog from "../dialogs/timerPublishedDialog";
import TimerActivateWarningDialog from "../dialogs/timerWarning";
import { useAuthenticatedFetch } from "../../hooks";

const StatusPanel = ({ className }) => {
  const authenticatedFetch = useAuthenticatedFetch();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timerId = useSelector((state) => state.index.timerId);
  const countdownTimerName = useSelector((state) => state.index.name);
  const timerTitle = useSelector((state) => state.index.title);
  const timerSubheading = useSelector((state) => state.index.subHeading);
  const startDate = useSelector((state) => state.index.startDate);
  const startDateHours = useSelector((state) => state.index.startDateHours);
  const startDateMinutes = useSelector((state) => state.index.startDateMinutes);
  const endDate = useSelector((state) => state.index.endDate);
  const endDateHours = useSelector((state) => state.index.endDateHours);
  const endDateMinutes = useSelector((state) => state.index.endDateMinutes);
  const minutesAdded = useSelector((state) => state.index.minutesAdded);
  const timerType = useSelector((state) => state.index.timerType);
  const timerStatingDateType = useSelector(
    (state) => state.index.timerStatingDateType
  );
  const postion = useSelector((state) => state.index.postion);
  const displayPositionType = useSelector(
    (state) => state.index.displayPositionType
  );
  const isPublished = useSelector((state) => state.index.isPublished);
  const onceTimerEnds = useSelector((state) => state.index.onceTimerEnds);
  const onceTimerEndsCustomTitle = useSelector(
    (state) => state.index.onceTimerEndsCustomTitle
  );

  const listOfProductsForPosition = useSelector(
    (state) => state.index.listOfProductsForPosition
  );

  const shop = useSelector((state) => state.index.shop);

  const css = useSelector((state) => state.index.css);

  const callToAction = useSelector(
    (state) => state.timerBarExtras.callToAction
  );
  const buttonText = useSelector((state) => state.timerBarExtras.buttonText);
  const link = useSelector((state) => state.timerBarExtras.link);
  const shouldDisplayCloseIcon = useSelector(
    (state) => state.timerBarExtras.shouldDisplayCloseIcon
  );
  const timerBarPosition = useSelector(
    (state) => state.timerBarExtras.timerBarPosition
  );
  const timerBarDisplayPositionType = useSelector(
    (state) => state.timerBarExtras.timerBarDisplayPositionType
  );
  const isSticky = useSelector((state) => state.timerBarExtras.isSticky);
  const timerBarExtraCss = useSelector(
    (state) => state.timerBarExtras.extraCss
  );
  const listOfCollectionForPosition = useSelector(
    (state) => state.timerBarExtras.listOfCollectionForPosition
  );

  const [toastMessage, setToastMessage] = useState("");
  const [isPublishLoading, setPublishButtonLoading] = useState(false);
  const [isSaveButtonLoading, setSaveBtnLoadingState] = useState(false);
  const [isDeleteBtnLoading, setDeleteBtnLoadingState] = useState(false);
  const [showPublishDialog, setPublishDialog] = useState(false);
  const [showErrorDialog, setErrorDialog] = useState(false);

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
    setPublishButtonLoading(false);
    setSaveBtnLoadingState(false);
    setDeleteBtnLoadingState(false);
  }, [dispatch]);

  useEffect(() => {
    callDomainResponse(authenticatedFetch).then((domain) =>
      dispatch(setShop(`${domain}`))
    );
  }, []);

  // const isEmbedBlockEnabled = useCallback(async (shouldPublish) => {
  //   // setSaveBtnLoadingState(true);

  //   const response = await axios
  //     .post(
  //       `https://${SHOP_NAME}/admin/api/2021-09/applications/${SHOPIFY_APP_ID}.json`,
  //       {
  //         headers: {
  //           "X-Shopify-Access-Token": SHOPIFY_API_KEY,
  //         },
  //       }
  //     )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const appEmbedsEnabled = data.application.app_embeds_enabled;

  //       if (appEmbedsEnabled) {
  //         console.log("Embed blocks are enabled");
  //       } else {
  //         console.log("Embed blocks are not enabled");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //   dispatch(setTimerID(response.data._id));

  //   setToastMessage("Timer Saved!");
  // }, []);

  const createTimerFunction = useCallback(
    async (shouldPublish) => {
      // setSaveBtnLoadingState(true);

      const response = await axios.post(`${BACKEND_URL}/create/timer`, {
        timerName: countdownTimerName,
        title: timerTitle,
        subHeading: timerSubheading,
        startDate,
        startDateHours,
        startDateMinutes,
        endDate,
        endDateHours,
        endDateMinutes,
        fixedMinutes: `${minutesAdded}`,
        repeat: true,
        timerType,
        timerStatingDateType,
        postion,
        displayPositionType,
        shop: `${shop}`,
        onceTimerEnds,
        onceTimerEndsCustomTitle,
        listOfProductsForPosition,
        isPublished: shouldPublish,
        template: css.template,
        backgroundColorType: css.backgroundColorType,
        singleColorBackground: css.clockSingleColorBackground,
        gradientColor1: css.clockGradientColor1,
        gradientColor2: css.clockGradientColor2,
        gradientAngle: css.gradientAngle,
        cornerRadius: css.cornerRadius,
        borderSize: css.borderSize,
        borderColor: css.borderColor,
        insideTopHeight: css.paddingTop,
        insideBottomHeight: css.paddingBottom,
        outsideTopHeight: css.outsideTopHeight,
        outsideBottomHeight: css.outsideBottomHeight,
        font: css.fontFamily,
        titleSize: css.titleSize,
        titleColor: css.titleColor,
        subHeadingSize: css.subHeadingSize,
        subHeadingColor: css.subheadingColor,
        timerSize: css.clockTimerSize,
        timerColor: css.clockTimerColor,
        legendSize: css.legendSize,
        legendColor: css.legendColor,

        callToAction,
        buttonText,
        link,
        shouldDisplayCloseIcon,
        buttonColor: timerBarExtraCss.buttonColor,
        buttonFontSize: timerBarExtraCss.buttonFontSize,
        buttonFontColor: timerBarExtraCss.buttonFontColor,
        buttonCornerRadius: timerBarExtraCss.buttonCornerRadius,
        closeIconColor: timerBarExtraCss.closeIconColor,
        timerBarPosition,
        isSticky,
        timerBarDisplayPositionType,
        listOfCollectionForPosition,
      });

      dispatch(setTimerID(response.data._id));

      setToastMessage("Timer Saved!");
    },
    [
      buttonText,
      callToAction,
      countdownTimerName,
      css.backgroundColorType,
      css.borderColor,
      css.borderSize,
      css.clockGradientColor1,
      css.clockGradientColor2,
      css.clockSingleColorBackground,
      css.clockTimerColor,
      css.clockTimerSize,
      css.cornerRadius,
      css.fontFamily,
      css.gradientAngle,
      css.legendColor,
      css.legendSize,
      css.outsideBottomHeight,
      css.outsideTopHeight,
      css.paddingBottom,
      css.paddingTop,
      css.subHeadingSize,
      css.subheadingColor,
      css.template,
      css.titleColor,
      css.titleSize,
      dispatch,
      displayPositionType,
      endDate,
      endDateHours,
      endDateMinutes,
      isSticky,
      link,
      listOfCollectionForPosition,
      listOfProductsForPosition,
      minutesAdded,
      onceTimerEnds,
      onceTimerEndsCustomTitle,
      postion,
      shop,
      shouldDisplayCloseIcon,
      startDate,
      startDateHours,
      startDateMinutes,
      timerBarDisplayPositionType,
      timerBarExtraCss.buttonColor,
      timerBarExtraCss.buttonCornerRadius,
      timerBarExtraCss.buttonFontColor,
      timerBarExtraCss.buttonFontSize,
      timerBarExtraCss.closeIconColor,
      timerBarPosition,
      timerStatingDateType,
      timerSubheading,
      timerTitle,
      timerType,
    ]
  );

  const updateTimerFunction = useCallback(
    async (shouldPublish) => {
      setSaveBtnLoadingState(true);

      await axios.patch(`${BACKEND_URL}/update/${timerId}`, {
        timerName: countdownTimerName,
        title: timerTitle,
        subHeading: timerSubheading,
        startDate,
        startDateHours,
        startDateMinutes,
        endDate,
        endDateHours,
        endDateMinutes,
        fixedMinutes: `${minutesAdded}`,
        repeat: true,
        timerType,
        timerStatingDateType,
        postion,
        displayPositionType,
        shop: `${shop}`,
        onceTimerEnds,
        onceTimerEndsCustomTitle,
        listOfProductsForPosition,
        isPublished: shouldPublish,
        template: css.template,
        backgroundColorType: css.backgroundColorType,
        singleColorBackground: css.clockSingleColorBackground,
        gradientColor1: css.clockGradientColor1,
        gradientColor2: css.clockGradientColor2,
        gradientAngle: css.gradientAngle,
        cornerRadius: css.cornerRadius,
        borderSize: css.borderSize,
        borderColor: css.borderColor,
        insideTopHeight: css.paddingTop,
        insideBottomHeight: css.paddingBottom,
        outsideTopHeight: css.outsideTopHeight,
        outsideBottomHeight: css.outsideBottomHeight,
        font: css.fontFamily,
        titleSize: css.titleSize,
        titleColor: css.titleColor,
        subHeadingSize: css.subHeadingSize,
        subHeadingColor: css.subheadingColor,
        timerSize: css.clockTimerSize,
        timerColor: css.clockTimerColor,
        legendSize: css.legendSize,
        legendColor: css.legendColor,
        callToAction,
        buttonText,
        link,
        shouldDisplayCloseIcon,
        buttonColor: timerBarExtraCss.buttonColor,
        buttonFontSize: timerBarExtraCss.buttonFontSize,
        buttonFontColor: timerBarExtraCss.buttonFontColor,
        buttonCornerRadius: timerBarExtraCss.buttonCornerRadius,
        closeIconColor: timerBarExtraCss.closeIconColor,
        timerBarPosition,
        isSticky,
        timerBarDisplayPositionType,
        listOfCollectionForPosition,
      });
      setToastMessage("Timer Saved!");
      setSaveBtnLoadingState(false);
    },
    [
      buttonText,
      callToAction,
      countdownTimerName,
      css.backgroundColorType,
      css.borderColor,
      css.borderSize,
      css.clockGradientColor1,
      css.clockGradientColor2,
      css.clockSingleColorBackground,
      css.clockTimerColor,
      css.clockTimerSize,
      css.cornerRadius,
      css.fontFamily,
      css.gradientAngle,
      css.legendColor,
      css.legendSize,
      css.outsideBottomHeight,
      css.outsideTopHeight,
      css.paddingBottom,
      css.paddingTop,
      css.subHeadingSize,
      css.subheadingColor,
      css.template,
      css.titleColor,
      css.titleSize,
      displayPositionType,
      endDate,
      endDateHours,
      endDateMinutes,
      isSticky,
      link,
      listOfCollectionForPosition,
      listOfProductsForPosition,
      minutesAdded,
      onceTimerEnds,
      onceTimerEndsCustomTitle,
      postion,
      shouldDisplayCloseIcon,
      startDate,
      startDateHours,
      startDateMinutes,
      timerBarDisplayPositionType,
      timerBarExtraCss.buttonColor,
      timerBarExtraCss.buttonCornerRadius,
      timerBarExtraCss.buttonFontColor,
      timerBarExtraCss.buttonFontSize,
      timerBarExtraCss.closeIconColor,
      timerBarPosition,
      timerId,
      timerStatingDateType,
      timerSubheading,
      timerTitle,
      timerType,
    ]
  );

  const saveTimerFunction = useCallback(async () => {
    setSaveBtnLoadingState(true);
    if (timerId) {
      await updateTimerFunction(isPublished);
    } else {
      await createTimerFunction(isPublished);
    }
    setSaveBtnLoadingState(false);
  }, [createTimerFunction, isPublished, timerId, updateTimerFunction]);

  const publishTimerFunction = useCallback(async () => {
    setPublishButtonLoading(true);

    if (timerId) {
      await updateTimerFunction(true);
      dispatch(setPublished(true));
    } else {
      await createTimerFunction(true);
    }
    setPublishDialog(true);
    setPublishButtonLoading(false);
    dispatch(setPublished(true));

    setToastMessage("Timer Published!");
  }, [createTimerFunction, dispatch, timerId, updateTimerFunction]);

  const unpublishTimerFunction = useCallback(async () => {
    setPublishButtonLoading(true);

    await axios.patch(`${BACKEND_URL}/unpublish/${timerId}`);
    dispatch(setPublished(false));

    setPublishDialog(false);
    setErrorDialog(false);
    setPublishButtonLoading(false);
    setToastMessage("Timer Unpublished!");
  }, [dispatch, timerId]);

  const deleteTimerFunction = useCallback(async () => {
    setDeleteBtnLoadingState(true);
    await axios.delete(`${BACKEND_URL}/delete/${timerId}`);
    setDeleteBtnLoadingState(false);
    setToastMessage("Timer deleted!");
    resetState();
    navigate("/");
  }, [navigate, resetState, timerId]);

  return (
    <div className={className}>
      <div className="status-header-container">
        <div className="status-header-inner-container">
          <button
            className="Polaris-Breadcrumbs__Breadcrumb"
            onClick={() => {
              navigate("/homePage");
            }}
            type="button"
          >
            <Icon source={MobileBackArrowMajor} color="base" />
          </button>

          <h1 className="Polaris-Header-Title">
            {countdownTimerName || "Countdown"}
          </h1>
          <div>
            {!isPublished ? (
              <div>
                <span className="Polaris-Badge">
                  <span>Not published</span>
                </span>
              </div>
            ) : (
              <div>
                <span className="Polaris-Badge" style={{ color: "green" }}>
                  <span>Published</span>
                </span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div>
            <ButtonGroup>
              {timerId ? (
                <Button
                  plain
                  destructive
                  onClick={() => deleteTimerFunction()}
                  loading={isDeleteBtnLoading}
                  removeUnderline
                >
                  Delete
                </Button>
              ) : (
                <div></div>
              )}

              <Button
                plain
                monochrome
                onClick={() => saveTimerFunction()}
                loading={isSaveButtonLoading}
                removeUnderline
              >
                Save
              </Button>
              <Button
                primary={!isPublished}
                destructive={isPublished}
                onClick={() =>
                  isPublished
                    ? unpublishTimerFunction()
                    : publishTimerFunction()
                }
                loading={isPublishLoading}
              >
                {isPublished ? "Unpublish" : "Publish"}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <div
        className="Polaris-Header-Title__SubTitle"
        style={{ marginLeft: "55px" }}
      >
        <p>Timer ID: {timerId}</p>
      </div>
      {showPublishDialog && <TimerPublishedDialog />}
      {showErrorDialog && <TimerActivateWarningDialog />}

      {/* Toast */}
      {!!toastMessage && (
        <Toast content={toastMessage} onDismiss={() => setToastMessage("")} />
      )}
    </div>
  );
};

export default StatusPanel;
