import { calculateRent } from "./renting.service.ts";
import { RentingState } from "../../../store/calculatorSlices/renting.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FuturePredictionsState } from "../../../store/calculatorSlices/futurePreditions.ts";

export const useRentDetails = () => {
  const { monthlyRent, yearlyRentGrowth }: RentingState = useSelector(
    (state: RootState) => state.calculator.renting,
  );

  const { yearsStaying }: FuturePredictionsState = useSelector(
    (state: RootState) => state.calculator.futurePredictions,
  );

  const rentTotal = calculateRent({
    startingMonthlyRent: monthlyRent,
    yearlyRentGrowth: yearlyRentGrowth,
    yearsStaying,
  });

  return {
    rentTotal,
  };
};
