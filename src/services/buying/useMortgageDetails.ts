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
    yearsStaying: yearsStaying || 0,
    depositPercentage: depositPercentage || 0,
    initialPropertyValue: propertyPrice || 0,
    yearlyOwnershipCost: yearlyOwnershipCost || 0,
    loanTerm: loanTerm || 0,
    interestRate: interestRate || 0,
    propertyValueGrowthPercentage: propertyValueGrowthPercentage || 0,
    buyingCostsPercentage: buyingCostsPercentage || 0,
    sellingCostsPercentage: sellingCostsPercentage || 0,
  });
}
