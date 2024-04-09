import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FuturePredictionsState {
  propertyValueGrowth?: number;
  alternativeInvestmentReturn?: number;
  inflationRate?: number;
}

const initialState: FuturePredictionsState = {};

export const futurePredictionsSlice = createSlice({
  name: "futurePredictions",
  initialState,
  reducers: {
    setFuturePredictionsValue: (state: FuturePredictionsState, action: PayloadAction<{ value: number, key: keyof FuturePredictionsState }>) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setFuturePredictionsValue } = futurePredictionsSlice.actions

export default futurePredictionsSlice.reducer