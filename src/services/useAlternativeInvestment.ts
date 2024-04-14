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

  const initialCash = mortgageDeposit - rentDeposit;
  const moneyAvailablePerMonth = mortgagePerMonth - monthlyRent;
  const returnObj = {
    investDifference,
    totalAtTheEnd: 0,
    valueAdded: 0,
    allMonthlyInvestment: 0,
    monthlyValues: [] as ReturnType<
      typeof calculateInvestmentReturns
    >["monthlyValues"],
    initialCash,
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

  return returnObj;
}
