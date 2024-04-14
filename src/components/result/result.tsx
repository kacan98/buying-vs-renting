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

function Result() {
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
    { label: "Original property value", value: propertyPrice },
    {
      label: "Total property value increase",
      value: totalPropertyValueIncrease,
    },
    { label: "Paying off remaining debt", value: -1 * remainingBalance },
  ];

  const capitalFromSale = capitalFromSaleDetails.reduce((acc, row) => {
    if (row === "divider") return acc;
    return acc + row.value;
  }, 0);

  const makeLabel = (label: "Renting" | "Buying", years: number) => {
    return `${label} for ${years} year${years != 1 ? "s" : ""}`;
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
        {buyingIsBetter ? "Buying is better" : "Renting is better"}
        {` by ${formatAsCurrency(Math.abs(difference))}`}
      </Typography>
      <ResultBlock
        heading={makeLabel("Renting", yearsStaying)}
        rows={[
          { label: "Deposit", value: -1 * rentDeposit },
          {
            label: "Rent",
            value: -1 * rentTotal,
          },
          {
            label: "Investment returns",
            value: alternativeInvestment.valueAdded,
            tooltip: (
              <ResultBlock
                heading={"Alternative investment"}
                rows={[
                  {
                    label: "Initial investment",
                    value: -1 * alternativeInvestment.initialCash,
                  },
                  {
                    label: "All monthly investments",
                    value: -1 * alternativeInvestment.allMonthlyInvestment,
                  },
                  "divider",
                  {
                    label: "Total at the end",
                    value: alternativeInvestment.totalAtTheEnd,
                  },
                ]}
              />
            ),
          },
          { label: "Deposit returned", value: rentDeposit },
          "divider",
          { label: "Total", value: totalRenting },
        ]}
      />
      <br />
      <ResultBlock
        chart={<BuyingChart graphData={yearValueChanges} />}
        heading={makeLabel("Buying", yearsStaying)}
        rows={[
          { label: "Deposit", value: -1 * deposit },
          {
            label: "Mortgage paid",
            value: -totalMortgagePaid,
            tooltip: (
              <ResultBlock
                rows={[
                  {
                    label: "Total interest paid",
                    value: -1 * totalInterestPaid,
                  },
                  {
                    label: "Total principal paid",
                    value: -1 * totalPrincipalPaid,
                  },
                ]}
                heading={"Mortgage details:"}
              />
            ),
          },
          {
            label: "Buying and selling costs",
            value: -1 * (buyingCost + sellingCost),
            tooltip: (
              <ResultBlock
                rows={[
                  { label: "Buying costs", value: -1 * buyingCost },
                  { label: "Selling costs", value: -1 * sellingCost },
                ]}
                heading={"Buying and selling details:"}
              />
            ),
          },
          {
            label: "Total ownership costs",
            value: -1 * totalOwnershipCosts,
            tooltip: <div>Simply ownership cost over the time of staying</div>,
          },
          {
            label: "Capital from selling",
            value: capitalFromSale,
            tooltip: (
              <ResultBlock
                heading={"Capital from selling details"}
                rows={capitalFromSaleDetails}
              />
            ),
          },
          "divider",
          { label: "Total", value: totalBuying },
        ]}
      />
      <br />
    </Box>
  );
}

export default Result;
