import { RentingState } from "../../../store/calculatorSlices/renting.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FuturePredictionsState } from "../../../store/calculatorSlices/futurePreditions.ts";
import { useAlternativeInvestmentReturns } from "../useAlternativeInvestment.ts";

function calculateRent({
  startingMonthlyRent,
  yearlyRentGrowth,
  yearsStaying,
  deposit,
}: {
  startingMonthlyRent: number;
  yearlyRentGrowth: number;
  yearsStaying: number;
  deposit: number;
}): { yearValueChangeTotals: number[]; rentTotal: number } {
  let rentTotal = 0;
  const yearValueChangeTotals: number[] = [];
  let currentRent = startingMonthlyRent;
  const rentIncreasePercentage = yearlyRentGrowth / 100;

  for (let i = 0; i < yearsStaying; i++) {
    let yearValueChange = -currentRent * 12;
    if (i === 0) yearValueChange -= deposit;
    if (i === yearsStaying - 1) yearValueChange += deposit;
    rentTotal -= yearValueChange;
    yearValueChangeTotals.push(-rentTotal);
    currentRent *= 1 + rentIncreasePercentage;
  }

  return { yearValueChangeTotals, rentTotal };
}

export const useRentDetails = () => {
  const { monthlyRent, yearlyRentGrowth, initialInvestment }: RentingState =
    useSelector((state: RootState) => state.calculator.renting);

  const { yearsStaying }: FuturePredictionsState = useSelector(
    (state: RootState) => state.calculator.futurePredictions,
  );

  const alternativeInvestment = useAlternativeInvestmentReturns();

  const { yearValueChangeTotals, rentTotal } = calculateRent({
    startingMonthlyRent: monthlyRent || 0,
    yearlyRentGrowth: yearlyRentGrowth || 0,
    yearsStaying: yearsStaying || 0,
    deposit: initialInvestment || 0,
  });

  const yearlyValuesRenting = yearValueChangeTotals.map(
    (rentValueChange, index) => {
      return (
        (alternativeInvestment.monthlyValues[index] || 0) + rentValueChange
      );
    },
  );
  const totalRenting = alternativeInvestment.valueAdded - rentTotal;

  return {
    rentTotal,
    totalRenting,
    yearlyValuesRenting,
  };
};
