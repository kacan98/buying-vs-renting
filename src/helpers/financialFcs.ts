export const toLocaleCurrencyString = (value: number) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export function calculateInvestmentReturns({
  initialInvestment,
  monthlyInvestment,
  numberOfPeriods,
  appreciationRate,
}: {
  initialInvestment: number;
  monthlyInvestment: number;
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
  let allMonthlyInvestment = 0;

  for (let i = 1; i <= numberOfPeriods; i++) {
    allMonthlyInvestment += monthlyInvestment; // Add monthly investment at the start of the period
    totalReturn += monthlyInvestment; // Add monthly investment at the start of the period
    let previousTotal = totalReturn; // Store previous total for value added calculation
    totalReturn = totalReturn * (1 + appreciationRate); // Apply appreciation rate
    valueAdded += totalReturn - previousTotal; // Calculate value added in this period
    monthlyValues.push(totalReturn); // Store the total return at the end of the period
  }

  return {
    totalAtTheEnd: totalReturn,
    monthlyValues,
    valueAdded,
    allMonthlyInvestment,
  };
}
