import {
  BuyingDetails,
  PeriodValueChange,
  MortgageDetailsParams,
} from "./buying.model.ts";

export function calculateLoanDetails({
  initialPropertyValue,
  depositPercentage,
  loanTerm,
  interestRate,
}: MortgageDetailsParams): {
  loanAmount: number;
  mortgagePerMonth: number;
  deposit: number;
} {
  console.log("initialPropertyValue", initialPropertyValue);
  console.log(depositPercentage);
  const deposit = initialPropertyValue * (depositPercentage / 100);
  console.log("deposit", deposit);
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
    deposit,
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
  let totalPrincipalPaid = 0;
  let currentPropertyValue = initialPropertyValue;
  let totalPropertyValueIncrease = 0;
  let totalOwnershipCosts = 0;
  let currentMonth = 0;
  const monthValueChanges: PeriodValueChange[] = [];

  while (currentMonth < yearsStaying * 12) {
    let interestPaidThisMonth = 0;
    let principalPaidThisMonth = 0;

    if (remainingBalance > 0) {
      interestPaidThisMonth = remainingBalance * (interestRate / 100 / 12);
      principalPaidThisMonth = mortgagePerMonth - interestPaidThisMonth;
      remainingBalance -= principalPaidThisMonth;
      totalInterestPaid += interestPaidThisMonth;
      totalPrincipalPaid += principalPaidThisMonth;
      totalMortgagePaid += mortgagePerMonth;
    }

    //These will happen even though the loan is paid off
    totalOwnershipCosts += yearlyOwnershipCost / 12;
    const thisMonthPropertyValueIncrease =
      currentPropertyValue * (propertyValueGrowth / 100 / 12);
    totalPropertyValueIncrease += thisMonthPropertyValueIncrease;
    currentPropertyValue += thisMonthPropertyValueIncrease;

    const monthValueChange: PeriodValueChange = {
      interestPaid: interestPaidThisMonth,
      principalPaid: principalPaidThisMonth,
      increaseInPropertyValue: thisMonthPropertyValueIncrease,
      ownershipCost: yearlyOwnershipCost / 12,
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
  monthValueChanges: PeriodValueChange[];
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
  console.log("depositPercentage", params.depositPercentage);
  //check for 0s
  if (params.loanTerm === 0 || params.yearsStaying === 0) {
    return {
      totalInterestPaid: 0,
      remainingBalance: 0,
      totalPropertyValueIncrease: 0,
      totalOwnershipCosts: 0,
      monthValueChanges: [],
      yearValueChanges: [],
      buyingCost: 0,
      sellingCost: 0,
      totalCosts: 0,
      totalBuying: 0,
      totalMortgagePaid: 0,
      totalPrincipalPaid: 0,
      mortgagePerMonth: 0,
      deposit: 0,
    };
  }

  const { loanAmount, mortgagePerMonth, deposit } =
    calculateLoanDetails(params);
  const {
    remainingBalance,
    totalMortgagePaid,
    totalInterestPaid,
    totalPropertyValueIncrease,
    totalOwnershipCosts,
    monthValueChanges,
    endPropertyValue,
    totalPrincipalPaid,
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
  console.log(
    buyingCost,
    deposit,
    totalMortgagePaid,
    remainingBalance,
    totalOwnershipCosts,
    sellingCost,
  );

  const totalCosts =
    buyingCost +
    deposit +
    totalMortgagePaid +
    remainingBalance +
    totalOwnershipCosts +
    sellingCost;
  const total =
    totalPropertyValueIncrease + params.initialPropertyValue - totalCosts;

  const yearValueChanges: PeriodValueChange[] = monthValueChanges.reduce(
    (acc, monthValueChange, i) => {
      if (i % 12 === 0) {
        //we don't want to modify the original object
        acc.push(structuredClone(monthValueChange));
      } else {
        acc[acc.length - 1].interestPaid += monthValueChange.interestPaid;
        acc[acc.length - 1].principalPaid += monthValueChange.principalPaid;
        acc[acc.length - 1].increaseInPropertyValue +=
          monthValueChange.increaseInPropertyValue;
        acc[acc.length - 1].ownershipCost += monthValueChange.ownershipCost;
        acc[acc.length - 1].buyingCosts += monthValueChange.buyingCosts;
        acc[acc.length - 1].sellingCosts += monthValueChange.sellingCosts;
      }
      return acc;
    },
    [] as PeriodValueChange[],
  );
  console.log(monthValueChanges);

  return {
    totalInterestPaid,
    remainingBalance,
    totalPropertyValueIncrease,
    totalOwnershipCosts,
    monthValueChanges,
    yearValueChanges,
    buyingCost,
    sellingCost,
    totalCosts,
    totalMortgagePaid,
    totalPrincipalPaid,
    mortgagePerMonth,
    deposit,

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
  return initialPropertyValue - deposit;
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
    initialPropertyValue,
  });
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  return (
    loanAmount *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments)))
  );
}
