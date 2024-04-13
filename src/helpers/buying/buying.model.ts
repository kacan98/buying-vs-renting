export interface MortgageDetailsParams {
  yearsStaying: number;
  propertyPrice: number;
  deposit: number;
  yearlyOwnershipCost: number;
  loanTerm: number;
  interestRate: number;
  annualAppreciationRate: number;
  buyingCostsPercentage: number;
  sellingCostsPercentage: number;
}

export interface MonthValueChange {
  interestPaidThisMonth: number;
  principalPaidThisMonth: number;
  increaseInPropertyValue: number;
  buyingCosts: number;
  sellingCosts: number;
  monthlyOwnershipCost: number;
}
[];

export interface BuyingDetails {
  totalInterestPaid: number;
  remainingBalance: number;
  totalMortgagePaid: number;
  mortgagePerMonth: number;
  totalPropertyValueIncrease: number;
  totalOwnershipCosts: number;
  
  monthValueChanges: MonthValueChange[];
  buyingCost: number;
  sellingCost: number;
  
  totalCosts: number;
  total: number;
}
