import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { calculateMortgageDetails } from "./buying.service.ts";
import { BuyingState } from "../../../store/calculatorSlices/buying.ts";
import { FuturePredictionsState } from "../../../store/calculatorSlices/futurePreditions.ts";
import { MortgageDetails } from "./buying.model.ts";

export function useMortgageDetails(): MortgageDetails {
  const { yearsStaying }: FuturePredictionsState = useSelector(
    (state: RootState) => state.calculator.futurePredictions,
  );

  const {
    propertyPrice,
    depositPercentage,
    yearlyOwnershipCost,
    loanTerm,
    interestRate,
    buyingCostsPercentage,
    sellingCostsPercentage,
    propertyValueGrowthPercentage,
  }: BuyingState = useSelector((state: RootState) => state.calculator.buying);

  return calculateMortgageDetails({
    yearsStaying,
    depositPercentage,
    initialPropertyValue: propertyPrice,
    yearlyOwnershipCost,
    loanTerm,
    interestRate,
    propertyValueGrowthPercentage,
    buyingCostsPercentage,
    sellingCostsPercentage,
  });
}
