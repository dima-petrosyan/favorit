import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const goodsDisplayData = createSelector(
  (state: RootState) => state.goods.items,
  (items) => {
    return items.map((item) => ({
      id: item.goodsID,
      brand: item.brand,
      number: item.number,
      name: item.name,
    }));
  }
);
