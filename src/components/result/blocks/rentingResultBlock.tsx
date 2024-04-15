import BuyingOrSellingResultWrapper from "./buyingOrSellingResultWrapper.tsx";
import { useTranslation } from "react-i18next";
import { FuturePredictionsState } from "../../../../store/calculatorSlices/futurePreditions.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { RentingState } from "../../../../store/calculatorSlices/renting.ts";
import { useAlternativeInvestmentReturns } from "../../../services/useAlternativeInvestment.ts";
import { useRentDetails } from "../../../services/renting/useRentDetails.ts";

function RentingResultBlock() {
  const { t } = useTranslation();
  const { yearsStaying }: FuturePredictionsState = useSelector(
    (state: RootState) => state.calculator.futurePredictions,
  );
  const { initialInvestment: rentDeposit }: RentingState = useSelector(
    (state: RootState) => state.calculator.renting,
  );
  const { totalRenting, rentTotal } = useRentDetails();

  const alternativeInvestment = useAlternativeInvestmentReturns();

  return (
    <BuyingOrSellingResultWrapper
      heading={t("labelForYears", {
        rentingOrBuying: t("Renting"),
        yearsNumber: yearsStaying,
        yearOrYears: yearsStaying !== 1 ? t("yearsPlural") : t("yearSingular"),
      })}
      rows={[
        { label: t("Deposit"), value: -1 * rentDeposit },
        {
          label: t("Rent"),
          value: -1 * rentTotal,
        },
        {
          label: t("Investment returns"),
          value: alternativeInvestment.valueAdded,
          tooltip: (
            <BuyingOrSellingResultWrapper
              heading={t("Alternative investment")}
              rows={[
                {
                  label: t("Initial investment"),
                  value: -1 * alternativeInvestment.initialCash,
                },
                {
                  label: t("All monthly investments"),
                  value: -1 * alternativeInvestment.allMonthlyInvestment,
                },
                "divider",
                {
                  label: t("Total at the end"),
                  value: alternativeInvestment.totalAtTheEnd,
                },
              ]}
            />
          ),
        },
        { label: t("Deposit returned"), value: rentDeposit },
        "divider",
        { label: t("Total"), value: totalRenting },
      ]}
    />
  );
}

export default RentingResultBlock;
