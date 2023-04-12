import React, { useCallback, useState } from "react";
import { Card, RadioButton, Button } from "@shopify/polaris";
import "../../pages/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setDisplayPositionType,
  setListOfCollectionForPosition,
} from "../../store/slices/timerBarExtraParamSlice";
import { TIMER_BAR_POSITION_TYPE } from "../../helpers/timer_bar_position_type";
import { setListOfProductsForPosition } from "../../store/slices/indexSlice";
import { ResourcePicker } from "@shopify/app-bridge-react";
// import Clock from "../clock/clock";

const TimerBarPlacementTab = () => {
  const dispatch = useDispatch();

  const [openProductSelectionDialog, setOpenProductSelectionDialog] =
    useState(false);

  const handleProductSelection = useCallback(
    (resources) => {
      setOpenProductSelectionDialog(false);
      const selectedProducts = resources.selection.map((product) => ({
        id: product.id,
        handle: product.handle,
        title: product.title,
      }));
      dispatch(setListOfProductsForPosition(selectedProducts));
    },
    [dispatch]
  );

  const [openCollectionSelectionDialog, setOpenCollectionSelectionDialog] =
    useState(false);

  const handleCollectionSelection = useCallback(
    (resources) => {
      setOpenCollectionSelectionDialog(false);
      const selectedCollection = resources.selection.map((product) => ({
        id: product.id,
        handle: product.handle,
        title: product.title,
      }));
      dispatch(setListOfCollectionForPosition(selectedCollection));
    },
    [dispatch]
  );

  const timerBarDisplayPositionType = useSelector(
    (state) => state.timerBarExtras.timerBarDisplayPositionType
  );

  const listOfProductsForPosition = useSelector(
    (state) => state.index.listOfProductsForPosition
  );

  const listOfCollectionForPosition = useSelector(
    (state) => state.timerBarExtras.listOfCollectionForPosition
  );

  return (
    <div style={{ maxWidth: "300px" }}>
      <Card>
        <div className="Polaris-Card__Section">
          <div className="Polaris-RadioButton">
            <h6 style={{ fontWeight: "bold" }}>Select Products</h6>
            <div style={{ height: 16 }}></div>

            <div>
              <RadioButton
                label="Show on every page"
                onChange={(val) =>
                  dispatch(
                    setDisplayPositionType(TIMER_BAR_POSITION_TYPE.EVERY_PAGE)
                  )
                }
                checked={
                  timerBarDisplayPositionType ===
                  TIMER_BAR_POSITION_TYPE.EVERY_PAGE
                }
              />
            </div>

            <div>
              <RadioButton
                label="Show on home page only"
                onChange={(val) =>
                  dispatch(
                    setDisplayPositionType(
                      TIMER_BAR_POSITION_TYPE.ONLY_HOME_PAGE
                    )
                  )
                }
                checked={
                  timerBarDisplayPositionType ===
                  TIMER_BAR_POSITION_TYPE.ONLY_HOME_PAGE
                }
              />
            </div>

            <div>
              <RadioButton
                label="Show on all product pages"
                onChange={(val) =>
                  dispatch(
                    setDisplayPositionType(
                      TIMER_BAR_POSITION_TYPE.ALL_PRODUCT_PAGE
                    )
                  )
                }
                checked={
                  timerBarDisplayPositionType ===
                  TIMER_BAR_POSITION_TYPE.ALL_PRODUCT_PAGE
                }
              />
            </div>
            <div>
              <RadioButton
                label="Show on specific product pages"
                onChange={(val) =>
                  dispatch(
                    setDisplayPositionType(
                      TIMER_BAR_POSITION_TYPE.SPECIFIC_PRODUCT_PAGES
                    )
                  )
                }
                checked={
                  timerBarDisplayPositionType ===
                  TIMER_BAR_POSITION_TYPE.SPECIFIC_PRODUCT_PAGES
                }
              />
              <div style={{ marginTop: "1rem" }}>
                <Button
                  fullWidth
                  disabled={
                    timerBarDisplayPositionType !==
                    TIMER_BAR_POSITION_TYPE.SPECIFIC_PRODUCT_PAGES
                  }
                  onClick={() => {
                    setOpenProductSelectionDialog(true);
                  }}
                >
                  Select Products
                </Button>
              </div>
            </div>

            <div style={{ marginLeft: 16, marginTop: 16 }}>
              <ul>
                {listOfProductsForPosition.map((e) => (
                  <li key={e.id}>
                    <p style={{ fontSize: 15 }}>{e.title}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ height: 16 }}></div>

            <div>
              <RadioButton
                label="Show on all collection pages"
                onChange={(val) =>
                  dispatch(
                    setDisplayPositionType(
                      TIMER_BAR_POSITION_TYPE.ALL_COLLECTIONS
                    )
                  )
                }
                checked={
                  timerBarDisplayPositionType ===
                  TIMER_BAR_POSITION_TYPE.ALL_COLLECTIONS
                }
              />
            </div>
            <div>
              <RadioButton
                label="Show on specific collection pages"
                onChange={(val) =>
                  dispatch(
                    setDisplayPositionType(
                      TIMER_BAR_POSITION_TYPE.SPECIFIC_COLLECTIONS
                    )
                  )
                }
                checked={
                  timerBarDisplayPositionType ===
                  TIMER_BAR_POSITION_TYPE.SPECIFIC_COLLECTIONS
                }
              />
              <div style={{ marginTop: "1rem" }}>
                <Button
                  fullWidth
                  disabled={
                    timerBarDisplayPositionType !==
                    TIMER_BAR_POSITION_TYPE.SPECIFIC_COLLECTIONS
                  }
                  onClick={() => setOpenCollectionSelectionDialog(true)}
                >
                  Select Collections
                </Button>
              </div>
            </div>
            <div style={{ marginLeft: 16, marginTop: 16 }}>
              <ul>
                {listOfCollectionForPosition.map((e) => (
                  <li key={e.id}>
                    <p style={{ fontSize: 15 }}>{e.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ResourcePicker
            resourceType="Product"
            open={openProductSelectionDialog}
            onCancel={() => setOpenProductSelectionDialog(false)}
            onSelection={handleProductSelection}
            initialSelectionIds={[...listOfProductsForPosition]}
          />
          <ResourcePicker
            resourceType="Collection"
            open={openCollectionSelectionDialog}
            onCancel={() => setOpenCollectionSelectionDialog(false)}
            onSelection={handleCollectionSelection}
            initialSelectionIds={[...listOfCollectionForPosition]}
          />
        </div>
      </Card>
      <div style={{ height: 20 }}></div>
    </div>
  );
};

export default TimerBarPlacementTab;
