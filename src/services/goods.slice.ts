import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetGoodsDto, Good } from "../shared/types/api.types";
import { ApiService } from "../shared/api/api.service";
import { RootState } from "../app/store";
import { constants } from "../shared/constants/constants";

interface InitialState {
  items: Array<Good>;
  searchValue: string;
  analogues: Array<Good>;
  searchAnalogueValue: string;
}

const initialState: InitialState = {
  items: [],
  searchValue: "",
  analogues: [],
  searchAnalogueValue: "",
};

export const getGoodsByFilter = createAsyncThunk(
  "goods/getGoodsByFilter",
  async (data: GetGoodsDto) => {
    const goods = await ApiService.getGoods(data);
    return goods;
  }
);

export const getAnaloguesForGood = createAsyncThunk(
  "goods/getAnaloguesForGood",
  async (id: string, { getState, dispatch }) => {
    const good = (getState() as RootState).goods.items.find(
      (good) => good.goodsID === id
    );

    if (!good) return [];

    const analogues = await ApiService.getAnalogues({
      key: constants.user.key,
      brand: good.brand,
      number: good.number,
    });

    dispatch(setSearchAnalogueValue(good.goodsID));

    return analogues;
  }
);

export const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSearchAnalogueValue: (state, action: PayloadAction<string>) => {
      state.searchAnalogueValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoodsByFilter.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getGoodsByFilter.rejected, (state) => {})
      .addCase(getAnaloguesForGood.fulfilled, (state, action) => {
        state.analogues = action.payload;
      });
  },
});

export const { setSearchValue, setSearchAnalogueValue } = goodsSlice.actions;
export default goodsSlice;
