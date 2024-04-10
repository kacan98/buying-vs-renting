export function calculateRent({ startingMonthlyRent, increaseRate, yearsStaying }) {
  console.log("calculateRent", { startingMonthlyRent, increaseRate, yearsStaying })
  let totalPaid = 0;
  let annualRent = startingMonthlyRent * 12; // Initial annual rent

  for (let i = 0; i < yearsStaying; i++) {
    totalPaid += annualRent;
    annualRent *= 1 + increaseRate; // Increase by the rate for the next year
  }

  return totalPaid;
}
