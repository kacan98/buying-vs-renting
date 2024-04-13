import {
  BuyingDetails,
  MonthValueChange,
  MortgageDetailsParams,
} from "./buying.model.ts";

export function calculateLoanDetails({
  initialPropertyValue,
  deposit,
  loanTerm,
  interestRate,
}: MortgageDetailsParams): {
  loanAmount: number;
  mortgagePerMonth: number;
} {
  const loanAmount = initialPropertyValue - deposit;
  const mortgagePerMonth = getMonthlyMortgagePayment({
    initialPropertyValue,
    deposit,
    loanTerm,
    interestRate,
  });

  return {
    loanAmount,
    mortgagePerMonth,
  };
}

export function simulateTimePassage({
  yearsStaying,
  yearlyOwnershipCost,
  propertyValueGrowth,
  loanAmount,
  mortgagePerMonth,
  interestRate,
  initialPropertyValue,
}: MortgageDetailsParams & {
  loanAmount: number;
  mortgagePerMonth: number;
}) {
  let remainingBalance = loanAmount;
  let totalMortgagePaid = 0;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0
  let currentPropertyValue = initialPropertyValue;
  let totalPropertyValueIncrease = 0;
  let totalOwnershipCosts = 0;
  let currentMonth = 0;
  const monthValueChanges: MonthValueChange[] = [];

  while (currentMonth < yearsStaying * 12) {
    let interestPaidThisMonth = 0;
    let principalPaidThisMonth = 0;

    if (remainingBalance > 0) {
      interestPaidThisMonth = remainingBalance * (interestRate / 100 / 12);
      principalPaidThisMonth = mortgagePerMonth - interestPaidThisMonth;
      remainingBalance -= principalPaidThisMonth;
      totalInterestPaid += interestPaidThisMonth;
      totalPrincipalPaid += principalPaidThisMonth
      totalMortgagePaid += mortgagePerMonth;
    }

    //These will happen even though the loan is paid off
    totalOwnershipCosts += yearlyOwnershipCost / 12;
    const thisMonthPropertyValueIncrease =
      currentPropertyValue * (propertyValueGrowth / 100 / 12);
    totalPropertyValueIncrease += thisMonthPropertyValueIncrease;
    currentPropertyValue += thisMonthPropertyValueIncrease;

    const monthValueChange: MonthValueChange = {
      interestPaidThisMonth,
      principalPaidThisMonth,
      increaseInPropertyValue: thisMonthPropertyValueIncrease,
      monthlyOwnershipCost: yearlyOwnershipCost / 12,
      buyingCosts: 0,
      sellingCosts: 0,
    };
    monthValueChanges.push(monthValueChange);

    currentMonth++;
  }

  if (remainingBalance < 0) {
    remainingBalance = 0;
  }

  return {
    remainingBalance,
    totalMortgagePaid,
    totalInterestPaid,
    totalPrincipalPaid,
    totalPropertyValueIncrease,
    totalOwnershipCosts,
    monthValueChanges,
    endPropertyValue: currentPropertyValue,
  };
}

export function calculateCosts({
  initialPropertyValue,
  endPropertyValue,
  buyingCostsPercentage,
  sellingCostsPercentage,
  monthValueChanges,
}: MortgageDetailsParams & {
  initialPropertyValue: number;
  endPropertyValue: number;
  monthValueChanges: MonthValueChange[];
}) {
  const buyingCost = initialPropertyValue * (buyingCostsPercentage / 100);
  const sellingCost = endPropertyValue * (sellingCostsPercentage / 100);

  if (monthValueChanges.length > 0) {
    monthValueChanges[0].buyingCosts = buyingCost;
    monthValueChanges[monthValueChanges.length - 1].sellingCosts = sellingCost;
  }

  return { buyingCost, sellingCost };
}

export function calculateMortgageDetails(
  params: MortgageDetailsParams,
): BuyingDetails {
  const { loanAmount, mortgagePerMonth } = calculateLoanDetails(params);
  const {
    remainingBalance,
    totalMortgagePaid,
    totalInterestPaid,
    totalPropertyValueIncrease,
    totalOwnershipCosts,
    monthValueChanges,
    endPropertyValue,
    totalPrincipalPaid
  } = simulateTimePassage({
    ...params,
    loanAmount,
    mortgagePerMonth,
  });
  const { buyingCost, sellingCost } = calculateCosts({
    ...params,
    endPropertyValue,
    monthValueChanges,
  });

  const totalCosts =
    buyingCost +
    params.deposit +
    totalMortgagePaid +
    remainingBalance +
    totalOwnershipCosts +
    sellingCost;
  const total =
    totalPropertyValueIncrease + params.initialPropertyValue - totalCosts;

  return {
    totalInterestPaid,
    remainingBalance,
    totalPropertyValueIncrease,
    totalOwnershipCosts,
    monthValueChanges,
    buyingCost,
    sellingCost,
    totalCosts,
    totalMortgagePaid,
    totalPrincipalPaid,
    mortgagePerMonth,

    totalBuying: total,
  };
}

export function getLoanAmount({
  deposit,
  initialPropertyValue,
}: {
  deposit: number;
  initialPropertyValue: number;
}) {
  return initialPropertyValue-deposit
}

export function getMonthlyMortgagePayment({
  initialPropertyValue,
  deposit,
  loanTerm,
  interestRate,
}: {
  initialPropertyValue: number;
  deposit: number;
  loanTerm: number;
  interestRate: number;
}) {
  const loanAmount = getLoanAmount({
    deposit,
    initialPropertyValue
  })
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  return (
    loanAmount *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments)))
  );
}
