import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BuyingState {
  propertyPrice?: number;
  depositPercentage?: number;
  yearlyOwnershipCost?: number;
  loanTerm?: number;
  interestRate?: number;
  buyingCostsPercentage?: number;
  sellingCostsPercentage?: number;
  propertyValueGrowthPercentage?: number;
}

const initialState: BuyingState = {
  propertyPrice: 1000000,
  depositPercentage: 10,
  yearlyOwnershipCost: 2500,
  loanTerm: 30,
  interestRate: 4.5,
  buyingCostsPercentage: 1,
  sellingCostsPercentage: 1,
  propertyValueGrowthPercentage: 3,
};

export const buyingSlice = createSlice({
  name: "buying",
  initialState,
  reducers: {
    setBuyingValue: (
      state: BuyingState,
      action: PayloadAction<{ value: number; key: keyof BuyingState }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setBuyingValue } = buyingSlice.actions;

export default buyingSlice.reducer;
