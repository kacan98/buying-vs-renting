import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { getMonthlyMortgagePayment } from "./buying.service.ts";

export function useMortgageDetails() {
  const mortgageDetails = {
    initialPropertyValue: useSelector(
      (state: RootState) => state.buying.propertyPrice,
    ),
    depositPercentage: useSelector(
      (state: RootState) => state.buying.depositPercentage,
    ),
    loanTerm: useSelector((state: RootState) => state.buying.loanTerm),
    interestRate: useSelector((state: RootState) => state.buying.interestRate),
  };

  const mortgageDeposit =
    mortgageDetails.initialPropertyValue *
    (mortgageDetails.depositPercentage / 100);

  return {
    paymentPerMonth: getMonthlyMortgagePayment({
      initialPropertyValue: mortgageDetails.initialPropertyValue,
      deposit: mortgageDeposit,
      loanTerm: mortgageDetails.loanTerm,
      interestRate: mortgageDetails.interestRate,
    }),
    deposit: mortgageDeposit,
  };
}
