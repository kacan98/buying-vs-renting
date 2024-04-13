export interface MortgageDetailsParams {
  initialPropertyValue: number;
  deposit: number;
  yearlyOwnershipCost: number;
  
  yearsStaying: number;
  loanTerm: number;
  
  interestRate: number;
  propertyValueGrowth: number;
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
  totalPrincipalPaid: number;
  mortgagePerMonth: number;
  totalPropertyValueIncrease: number;
  totalOwnershipCosts: number;
  
  monthValueChanges: MonthValueChange[];
  buyingCost: number;
  sellingCost: number;
  
  totalCosts: number;
  totalBuying: number;
}
