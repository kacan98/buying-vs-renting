import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RentingState {
  monthlyRent?: number;
  initialInvestment?: number;
  yearlyRentGrowth?: number;
  investDifference?: boolean;
  alternativeInvestmentReturnPercentage?: number;
}

const initialState: RentingState = {
  monthlyRent: 1500,
  initialInvestment: 3000,
  yearlyRentGrowth: 3,
  investDifference: true,
  alternativeInvestmentReturnPercentage: 7,
};

export const rentingSlice = createSlice({
  name: "renting",
  initialState,
  reducers: {
    setRentingValue: (
      state: RentingState,
      action: PayloadAction<{
        value: number;
        key: keyof Omit<RentingState, "investDifference">;
      }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    toggleInvestDifference: (
      state: RentingState,
      action: PayloadAction<boolean>,
    ) => {
      state.investDifference = action.payload;
    },
  },
});

export const { setRentingValue, toggleInvestDifference } = rentingSlice.actions;

export default rentingSlice.reducer;
