import { useState } from "react";
import {
  Card,
  List,
  Heading,
  DisplayText,
  TextStyle,
  OptionList,
  TextContainer,
  Link,
} from "@shopify/polaris";
import React from "react";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { trophyImage } from "../assets";

export function QuickThemeCard() {
  const [selected, changeSelection] = useState([]);
  const [title, changeTitle] = useState("Hurrry Sale end In");

  function handleOnChange(val) {
    changeSelection(val);
  }

  function getFontFamily() {
    return selected[0] === "formal" ? "serif" : "cursive";
  }

  return (
    <>
      <Card title="Quick Theme" sectioned>
        <OptionList
          title="Click to apply"
          onChange={(val) => handleOnChange(val)}
          options={[
            { value: "formal", label: "Formal" },
            { value: "fancy", label: "Fancy" },
          ]}
          selected={selected}
        />
      </Card>

      <Card sectioned>
        <p
          style={{ fontWeight: 50, fontFamily: getFontFamily(), fontSize: 30 }}
        >
          Sale Ends in
        </p>
      </Card>
    </>
  );
}
