import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RentingState {
  monthlyRent: number;
  initialInvestment: number;
  yearlyRentGrowth: number;
}

const initialState: RentingState = {
  monthlyRent: 1500,
  initialInvestment: 3000,
  yearlyRentGrowth: 3,
};

export const rentingSlice = createSlice({
  name: "renting",
  initialState,
  reducers: {
    setRentingValue: (state: RentingState, action: PayloadAction<{ value: number, key: keyof RentingState }>) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setRentingValue } = rentingSlice.actions

export default rentingSlice.reducer