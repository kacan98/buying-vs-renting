import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BuyingState {
  locale?: string;
  currency?: string;
  theme: "auto" | "light" | "dark";
  introFinished?: boolean;
}

const initialState: BuyingState = {
  locale: undefined,
  currency: undefined,
  theme: "auto",
  introFinished: false,
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
    markIntroFinished: (state: BuyingState) => {
      state.introFinished = true;
    },
  },
});

export const { setLocale, setCurrency, setTheme, markIntroFinished } =
  settingsSlice.actions;

export default settingsSlice.reducer;
