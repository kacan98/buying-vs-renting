export function calculateRent({
  startingMonthlyRent,
  yearlyRentGrowth,
  yearsStaying,
}: {
  startingMonthlyRent: number;
  yearlyRentGrowth: number;
  yearsStaying: number;
}): number {
  const yearlyRentGrowthPercentage = yearlyRentGrowth / 100;
  let totalPaid = 0;
  let annualRent = startingMonthlyRent * 12; // Initial annual rent

  for (let i = 0; i < yearsStaying; i++) {
    totalPaid += annualRent;
    annualRent *= 1 + yearlyRentGrowthPercentage; // Increase by the rate for the next year
  }

  return totalPaid;
}
