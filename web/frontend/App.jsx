/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { RoutesInnerApp } from "./innerApp";

export default function App() {
  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu
              navigationLinks={
                [
                  // {
                  //   label: "Page name",
                  //   destination: "/pagename",
                  // },
                ]
              }
            />
            <RoutesInnerApp />
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
