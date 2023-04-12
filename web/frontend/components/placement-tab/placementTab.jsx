import React, { useCallback, useState } from "react";
import { Card, RadioButton, Button } from "@shopify/polaris";
import "../../pages/index.css";
import { useDispatch, useSelector } from "react-redux";
import TIMER_POSITION_TYPE from "../../helpers/timer_position_type_enum";
import {
  setDisplayPositionType,
  setListOfProductsForPosition,
} from "../../store/slices/indexSlice";
import { ResourcePicker } from "@shopify/app-bridge-react";

const PlacementTab = () => {
  const displayPositionType = useSelector(
    (state) => state.index.displayPositionType
  );
  const timerId = useSelector((state) => state.index.timerId);
  const listOfProductsForPosition = useSelector(
    (state) => state.index.listOfProductsForPosition
  );

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleProductSelection = useCallback(
    (resources) => {
      setOpen(false);
      const selectedProducts = resources.selection.map((product) => ({
        id: product.id,
        handle: product.handle,
        title: product.title,
      }));
      dispatch(setListOfProductsForPosition(selectedProducts));
    },
    [dispatch]
  );

  return (
    <div style={{ maxWidth: "300px" }}>
      <Card>
        <div className="Polaris-Card__Section">
          <div className="Polaris-RadioButton">
            <h6 style={{ fontWeight: "bold" }}>Select Products</h6>
            <div style={{ marginTop: 16, marginBottom: 16 }}>
              <RadioButton
                label="All products"
                name="accounts"
                onChange={(val) =>
                  dispatch(
                    setDisplayPositionType(TIMER_POSITION_TYPE.ALL_PRODUCTS)
                  )
                }
                checked={
                  displayPositionType === TIMER_POSITION_TYPE.ALL_PRODUCTS
                }
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <RadioButton
                label="Specific products"
                name="accounts"
                onChange={(val) =>
                  dispatch(
                    setDisplayPositionType(
                      TIMER_POSITION_TYPE.SPECIFIC_PRODUCTS
                    )
                  )
                }
                checked={
                  displayPositionType === TIMER_POSITION_TYPE.SPECIFIC_PRODUCTS
                }
              />
              <div style={{ marginTop: "1rem" }}>
                <Button
                  fullWidth
                  disabled={
                    displayPositionType !==
                    TIMER_POSITION_TYPE.SPECIFIC_PRODUCTS
                  }
                  onClick={() => setOpen(true)}
                >
                  Select Products
                </Button>
              </div>
            </div>
            <div style={{ marginLeft: 16 }}>
              <ul>
                {listOfProductsForPosition.map((e) => (
                  <li key={e.id}>{e.title}</li>
                ))}
              </ul>
            </div>
            <div
              style={{ height: listOfProductsForPosition.length > 0 ? 16 : 0 }}
            ></div>
            <div>
              <RadioButton
                label="Custom position"
                name="accounts"
                helpText="Add timer anywhere using app blocks."
                onChange={(val) =>
                  dispatch(
                    setDisplayPositionType(TIMER_POSITION_TYPE.CUSTOM_POSITION)
                  )
                }
                checked={
                  displayPositionType === TIMER_POSITION_TYPE.CUSTOM_POSITION
                }
              />
            </div>
            <ResourcePicker
              resourceType="Product"
              open={open}
              onCancel={() => setOpen(false)}
              onSelection={handleProductSelection}
              initialSelectionIds={[...listOfProductsForPosition]}
            />
          </div>
        </div>
        {timerId ? (
          <div className="Polaris-Card__Section">
            <h2>Timer ID</h2>

            <p>{timerId}</p>
            <span>
              <p>
                Countdown timer app block can be added, removed, repositioned,
                and customized through the theme editor using timer ID.
              </p>
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </Card>
    </div>
  );
};

export default PlacementTab;
