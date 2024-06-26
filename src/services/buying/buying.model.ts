export interface MortgageDetailsParams {
  initialPropertyValue: number;
  yearlyOwnershipCost: number;
  depositPercentage: number;

  yearsStaying: number;
  loanTerm: number;

  interestRate: number;
  propertyValueGrowthPercentage: number;
  buyingCostsPercentage: number;
  sellingCostsPercentage: number;
}

export interface PeriodValueChange {
  interestPaid: number;
  principalPaid: number;
  increaseInPropertyValue: number;
  buyingCosts: number;
  sellingCosts: number;
  ownershipCost: number;
}
[];

export interface MortgageDetails {
  initialPropertyValue: number;
  deposit: number;
  totalInterestPaid: number;
  remainingBalance: number;
  totalMortgagePaid: number;
  totalPrincipalPaid: number;
  mortgagePerMonth: number;
  totalPropertyValueIncrease: number;
  totalOwnershipCosts: number;

  monthValueChanges: PeriodValueChange[];
  yearValueChanges: PeriodValueChange[];
  yearValueChangeTotals: number[];
  buyingCost: number;
  sellingCost: number;

  totalCosts: number;
  totalBuying: number;
}
