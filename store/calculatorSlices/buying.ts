import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BuyingState {
  propertyPrice: number;
  deposit: number;
  ownershipCosts: number;
  loanTerm: number;
  interestRate: number;
  buyingCosts: number;
  sellingCosts: number;
}

const initialState: BuyingState = {
  propertyPrice: 1000000,
  deposit: 200000,
  ownershipCosts: 2500,
  loanTerm: 30,
  interestRate: 4.5,
  buyingCosts: 1,
  sellingCosts: 1
};

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