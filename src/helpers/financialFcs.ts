export const toLocaleCurrencyString = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export function calculateInvestmentReturns({
  initialInvestment,
  investmentPerPeriod,
  numberOfPeriods,
  appreciationRate,
}: {
  initialInvestment: number;
  investmentPerPeriod: number;
  numberOfPeriods: number;
  appreciationRate: number;
}): {
  totalAtTheEnd: number;
  monthlyValues: number[];
  valueAdded: number;
  allMonthlyInvestment: number;
} {
  const monthlyValues: number[] = [];
  let totalReturn = initialInvestment;
  let valueAdded = 0;
  let allRepeatedInvestments = 0;

  for (let i = 1; i <= numberOfPeriods; i++) {
    allRepeatedInvestments += investmentPerPeriod;
    totalReturn += investmentPerPeriod;
    const previousTotal = totalReturn;
    totalReturn = totalReturn * (1 + appreciationRate);
    valueAdded += totalReturn - previousTotal;
    monthlyValues.push(totalReturn);
  }

  return {
    totalAtTheEnd: totalReturn,
    monthlyValues,
    valueAdded,
    allMonthlyInvestment: allRepeatedInvestments,
  };
}
