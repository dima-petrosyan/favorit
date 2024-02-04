import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const analoguesDisplayData = createSelector(
  (state: RootState) => state.goods.analogues,
  (items) => {
    return items.map((item) => ({
      id: item.goodsID,
      brand: item.brand,
      number: item.number,
      name: item.name,
      count: item.count,
      price: item.warehouses.length > 0 ? item.warehouses[0].price : "-",
    }));
  }
);
