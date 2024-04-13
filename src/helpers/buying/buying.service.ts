import {
  BuyingDetails,
  MonthValueChange,
  MortgageDetailsParams,
} from "./buying.model.ts";

export function calculateMortgageDetails({
  yearsStaying,
  propertyPrice,
  deposit,
  yearlyOwnershipCost,
  loanTerm,
  interestRate,
  annualAppreciationRate,
  buyingCostsPercentage,
  sellingCostsPercentage,
}: MortgageDetailsParams): BuyingDetails {
  const loanAmount = propertyPrice - deposit;
  const mortgagePerMonth = getMonthlyMortgagePayment({
    propertyPrice,
    deposit,
    loanTerm,
    interestRate,
  });
  const propertyPurchasePrice = propertyPrice;
  // property value increases over time
  let currentPropertyValue = propertyPrice;

  let remainingBalance = loanAmount;
  let totalMortgagePaid = 0;
  let totalInterestPaid = 0;
  let totalPropertyValueIncrease = 0;
  let totalOwnershipCosts = 0;
  let currentMonth = 0;
  const monthValueChanges: MonthValueChange[] = [];
  
  //Simulate passage of time
  while (currentMonth < yearsStaying * 12) {
    let interestPaidThisMonth = 0;
    let principalPaidThisMonth = 0;

    //check if we have to pay off the loan
    if (remainingBalance > 0) {
      interestPaidThisMonth = remainingBalance * (interestRate / 100 / 12);
      principalPaidThisMonth = mortgagePerMonth - interestPaidThisMonth;
      remainingBalance -= principalPaidThisMonth;
      totalInterestPaid += interestPaidThisMonth;
      totalMortgagePaid += mortgagePerMonth;
    }

    //ownership costs have to be paid even if we are not paying  mortgage
    totalOwnershipCosts += yearlyOwnershipCost / 12;

    //property value increases even if the mortgage is paid off
    const thisMonthPropertyValueIncrease =
      currentPropertyValue * (annualAppreciationRate / 100 / 12);
    totalPropertyValueIncrease += thisMonthPropertyValueIncrease;
    currentPropertyValue += thisMonthPropertyValueIncrease;

    //keep track what happened this month
    const monthValueChange: MonthValueChange = {
      interestPaidThisMonth,
      principalPaidThisMonth,
      increaseInPropertyValue:
        currentPropertyValue * (annualAppreciationRate / 100 / 12),
      monthlyOwnershipCost: yearlyOwnershipCost / 12,

      //these are set below
      buyingCosts: 0,
      sellingCosts: 0,
    };
    monthValueChanges.push(monthValueChange);

    currentMonth++;
  }

  // floats can be negative due to rounding errors
  // round to 0 if it's negative
  if (remainingBalance < 0) {
    remainingBalance = 0;
  }

  //set cost of buying and selling
  const buyingCost = propertyPurchasePrice * (buyingCostsPercentage / 100);
  const sellingCost = currentPropertyValue * (sellingCostsPercentage / 100);

  if (monthValueChanges.length > 0) {
    monthValueChanges[0].buyingCosts = buyingCost;
    monthValueChanges[monthValueChanges.length - 1].sellingCosts = sellingCost;
  }

  const totalCosts =
    totalInterestPaid +
    remainingBalance +
    totalOwnershipCosts +
    deposit +
    buyingCost +
    sellingCost;
  const total = totalPropertyValueIncrease + propertyPrice - totalCosts;

  return {
    totalInterestPaid,
    remainingBalance,
    totalPropertyValueIncrease,
    totalOwnershipCosts,
    monthValueChanges,
    buyingCost,
    sellingCost,
    totalCosts,
    total,
    totalMortgagePaid,
    mortgagePerMonth,
  };
}

export function getMonthlyMortgagePayment({
  propertyPrice,
  deposit,
  loanTerm,
  interestRate,
}: {
  propertyPrice: number;
  deposit: number;
  loanTerm: number;
  interestRate: number;
}) {
  const loanAmount = propertyPrice - deposit;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  return (
    loanAmount *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments)))
  );
}
