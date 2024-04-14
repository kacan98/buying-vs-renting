import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BuyingState {
  locale?: string;
  currency?: string;
}

const initialState: BuyingState = {
  locale: undefined,
  currency: undefined,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLocale: (state: BuyingState, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    setCurrency: (state: BuyingState, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

export const { setLocale, setCurrency } = settingsSlice.actions;

export default settingsSlice.reducer;
