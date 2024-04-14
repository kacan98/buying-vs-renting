import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BuyingState {
  locale: string;
  currency?: string;
}

const initialState: BuyingState = {
  locale: "en-US",
  currency: undefined,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage: (state: BuyingState, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    setCurrency: (state: BuyingState, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

export const { setLanguage, setCurrency } = settingsSlice.actions;

export default settingsSlice.reducer;
