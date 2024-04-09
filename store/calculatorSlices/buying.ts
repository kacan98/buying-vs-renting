import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BuyingState {
  propertyPrice?: number;
  deposit?: number;
  ownershipCosts?: number;
  loanTerm?: number;
  interestRate?: number;
  buyingCosts?: number;
  sellingCosts?: number;
}

const initialState: BuyingState = {};

export const buyingSlice = createSlice({
  name: "buying",
  initialState,
  reducers: {
    setBuyingValue: (state: BuyingState, action: PayloadAction<{ value: number, key: keyof BuyingState }>) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setBuyingValue } = buyingSlice.actions

export default buyingSlice.reducer