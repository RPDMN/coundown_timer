import { useNavigate } from "@shopify/app-bridge-react";
import { Badge } from "@shopify/polaris";
import React from "react";

import { TIMER_POSITION_NAME } from "../../helpers/timer_position_enum";

import "../timer-selector/timer-selector.css";

const TimerSelector = ({ timerId, name, positionType, date, isPublished }) => {
  const navigate = useNavigate();

  return (
    <tr
      className="timer-selector--table-row"
      onClick={() => {
        navigate(`/timerConfigurationComponent?timerId=${timerId}`);
      }}
    >
      <td className="timer-selector--table-data Polaris-TextStyle--variationStrong">
        {name}
      </td>
      <td className="timer-selector--table-data">
        {TIMER_POSITION_NAME[positionType] || TIMER_POSITION_NAME.PRODUCTS_PAGE}
      </td>
      <td className="timer-selector--table-data">{date}</td>
      <td className="timer-selector--table-data">
        <Badge status={isPublished ? "success" : ""}>
          {isPublished ? "Published" : "Not Published"}
        </Badge>
      </td>
    </tr>
  );
};

export default TimerSelector;
