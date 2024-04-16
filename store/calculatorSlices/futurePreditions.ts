import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FuturePredictionsState {
  yearsStaying?: number;
}

const initialState: FuturePredictionsState = {
  yearsStaying: 5,
};

export const futurePredictionsSlice = createSlice({
  name: "futurePredictions",
  initialState,
  reducers: {
    setFuturePredictionsValue: (
      state: FuturePredictionsState,
      action: PayloadAction<{
        value: number;
        key: keyof FuturePredictionsState;
      }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setFuturePredictionsValue } = futurePredictionsSlice.actions;

export default futurePredictionsSlice.reducer;
