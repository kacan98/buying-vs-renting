import BuyingOrSellingResultWrapper, {
  ResultPanelProps,
} from "./buyingOrSellingResultWrapper.tsx";
import BuyingChart from "./charts/buyingChart.tsx";
import { useMortgageDetails } from "../../../services/buying/useMortgageDetails.ts";
import { useTranslation } from "react-i18next";
import { FuturePredictionsState } from "../../../../store/calculatorSlices/futurePreditions.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

function BuyingResultBlock() {
  const { t } = useTranslation();
  const { yearsStaying }: FuturePredictionsState = useSelector(
    (state: RootState) => state.calculator.futurePredictions,
  );
  const {
    totalInterestPaid,
    remainingBalance,
    totalPropertyValueIncrease,
    totalOwnershipCosts,
    yearValueChanges,
    buyingCost,
    sellingCost,
    totalBuying,
    totalMortgagePaid,
    totalPrincipalPaid,
    deposit,
    initialPropertyValue: propertyPrice,
  } = useMortgageDetails();

  const capitalFromSaleDetails: ResultPanelProps["rows"] = [
    { label: t("Original property value"), value: propertyPrice },
    {
      label: t("Total property value increase"),
      value: totalPropertyValueIncrease,
    },
    { label: t("Paying off remaining debt"), value: -1 * remainingBalance },
  ];

  const capitalFromSale = capitalFromSaleDetails.reduce((acc, row) => {
    if (row === "divider") return acc;
    return acc + row.value;
  }, 0);
  console.log(yearValueChanges);
  return (
    <BuyingOrSellingResultWrapper
      chart={<BuyingChart graphData={yearValueChanges} />}
      heading={t("labelForYears", {
        rentingOrBuying: t("Buying"),
        yearsNumber: yearsStaying,
        yearOrYears: yearsStaying !== 1 ? t("yearsPlural") : t("yearSingular"),
      })}
      rows={[
        { label: t("Deposit"), value: -1 * deposit },
        {
          label: t("Mortgage paid"),
          value: -totalMortgagePaid,
          tooltip: (
            <BuyingOrSellingResultWrapper
              rows={[
                {
                  label: t("Total interest paid"),
                  value: -1 * totalInterestPaid,
                },
                {
                  label: t("Total principal paid"),
                  value: -1 * totalPrincipalPaid,
                },
              ]}
              heading={t("Mortgage details")}
            />
          ),
        },
        {
          label: t("Buying and selling costs"),
          value: -1 * (buyingCost + sellingCost),
          tooltip: (
            <BuyingOrSellingResultWrapper
              rows={[
                { label: t("Buying costs"), value: -1 * buyingCost },
                { label: t("Selling costs"), value: -1 * sellingCost },
              ]}
              heading={t("Buying and selling details")}
            />
          ),
        },
        {
          label: t("Total ownership costs"),
          value: -1 * totalOwnershipCosts,
          tooltip: (
            <div>{t("Simply ownership cost over the time of staying")}</div>
          ),
        },
        {
          label: t("Capital from selling"),
          value: capitalFromSale,
          tooltip: (
            <BuyingOrSellingResultWrapper
              heading={t("Capital from selling details")}
              rows={capitalFromSaleDetails}
            />
          ),
        },
        "divider",
        { label: t("Total"), value: totalBuying },
      ]}
    />
  );
}

export default BuyingResultBlock;
