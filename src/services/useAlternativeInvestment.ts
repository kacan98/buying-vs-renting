import { useMortgageDetails } from "./buying/useMortgageDetails.ts";
import { useSelector } from "react-redux";
import { calculateInvestmentReturns } from "../helpers/financialFcs.ts";
import { RootState } from "../../store";

export function useAlternativeInvestmentReturns() {
  const { paymentPerMonth: mortgagePerMonth, deposit: mortgageDeposit } =
    useMortgageDetails();
  const {
    monthlyRent,
    alternativeInvestmentReturnPercentage,
    initialInvestment: rentDeposit,
    investDifference,
  } = useSelector((state: RootState) => state.renting);

  const yearsStaying = useSelector(
    (state: RootState) => state.futurePredictions.yearsStaying,
  );

  const initialCash =
    mortgageDeposit - rentDeposit > 0 ? mortgageDeposit - rentDeposit : 0;
  const moneyAvailablePerMonth =
    mortgagePerMonth - monthlyRent > 0 ? mortgagePerMonth - monthlyRent : 0;
  const returnObj = {
    investDifference,
    totalAtTheEnd: 0,
    valueAdded: 0,
    allMonthlyInvestment: 0,
    initialCash: 0,
    monthlyValues: [] as ReturnType<
      typeof calculateInvestmentReturns
    >["monthlyValues"],
    moneyAvailablePerMonth,
  };

  if (!investDifference) return returnObj;

  const { totalAtTheEnd, monthlyValues, valueAdded, allMonthlyInvestment } =
    calculateInvestmentReturns({
      initialInvestment: initialCash,
      monthlyInvestment: moneyAvailablePerMonth,
      numberOfPeriods: yearsStaying,
      appreciationRate: alternativeInvestmentReturnPercentage / 100,
    });

  returnObj.totalAtTheEnd = totalAtTheEnd;
  returnObj.monthlyValues = monthlyValues;
  returnObj.valueAdded = valueAdded;
  returnObj.allMonthlyInvestment = allMonthlyInvestment;
  returnObj.initialCash = initialCash;

  return returnObj;
}
