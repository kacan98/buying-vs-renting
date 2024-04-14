import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FuturePredictionsState } from "../../../store/calculatorSlices/futurePreditions.ts";
import { RentingState } from "../../../store/calculatorSlices/renting.ts";
import { BuyingState } from "../../../store/calculatorSlices/buying.ts";
import ResultBlock, { ResultBlockProps } from "./resultBlock.tsx";
import BuyingChart from "./buyingChart.tsx";
import { calculateMortgageDetails } from "../../services/buying/buying.service.ts";
import { useRentDetails } from "../../services/renting/useRentDetails.ts";
import { useAlternativeInvestmentReturns } from "../../services/useAlternativeInvestment.ts";
import { useLocaleCurrencyFormatter } from "../../../store/settings/useLocale.ts";
import { useTranslation } from "react-i18next";

function Result() {
  const { t } = useTranslation();
  const formatAsCurrency: (value: number) => string =
    useLocaleCurrencyFormatter();

  const { initialInvestment: rentDeposit }: RentingState = useSelector(
    (state: RootState) => state.calculator.renting,
  );
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
  } = calculateMortgageDetails({
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

  const { rentTotal } = useRentDetails();

  const alternativeInvestment = useAlternativeInvestmentReturns();

  const totalRenting =
    -(rentTotal + rentDeposit) + rentDeposit + alternativeInvestment.valueAdded;

  const capitalFromSaleDetails: ResultBlockProps["rows"] = [
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

  const makeLabel = (label: "Renting" | "Buying", numberOfYears: number) => {
    return t("labelForYears", {
      rentingOrBuying: t(label),
      yearsNumber: numberOfYears,
      yearOrYears: numberOfYears !== 1 ? t("yearsPlural") : t("yearSingular"),
    });
  };

  const buyingIsBetter = totalBuying > totalRenting;
  const difference = buyingIsBetter
    ? totalRenting - totalBuying
    : totalBuying - totalRenting;

  return (
    <Box
      sx={{
        textAlign: "left",
      }}
    >
      <Typography variant={"h3"} gutterBottom>
        {t("Buying/renting is better by", {
          buyingOrRenting: t(buyingIsBetter ? "Buying" : "Renting"),
          difference: formatAsCurrency(Math.abs(difference)),
        })}
      </Typography>
      <ResultBlock
        heading={makeLabel("Renting", yearsStaying)}
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
              <ResultBlock
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
      <br />
      <ResultBlock
        chart={<BuyingChart graphData={yearValueChanges} />}
        heading={makeLabel("Buying", yearsStaying)}
        rows={[
          { label: t("Deposit"), value: -1 * deposit },
          {
            label: t("Mortgage paid"),
            value: -totalMortgagePaid,
            tooltip: (
              <ResultBlock
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
              <ResultBlock
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
              <ResultBlock
                heading={t("Capital from selling details")}
                rows={capitalFromSaleDetails}
              />
            ),
          },
          "divider",
          { label: t("Total"), value: totalBuying },
        ]}
      />
      <br />
    </Box>
  );
}

export default Result;
