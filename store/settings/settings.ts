import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BuyingState {
  locale?: string;
  currency?: string;
  theme: "auto" | "light" | "dark";
}

const initialState: BuyingState = {
  locale: undefined,
  currency: undefined,
  theme: "auto",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLocale: (
      state: BuyingState,
      action: PayloadAction<BuyingState["locale"]>,
    ) => {
      state.locale = action.payload;
    },
    setCurrency: (
      state: BuyingState,
      action: PayloadAction<BuyingState["currency"]>,
    ) => {
      state.currency = action.payload;
    },
    setTheme: (
      state: BuyingState,
      action: PayloadAction<BuyingState["theme"]>,
    ) => {
      state.theme = action.payload;
    },
  },
});

export const { setLocale, setCurrency, setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
