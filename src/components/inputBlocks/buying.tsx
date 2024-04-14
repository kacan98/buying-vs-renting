import { getInputProps, getPercentageAdornment } from "./../adornments.tsx";
import { Grid, Stack, Typography } from "@mui/material";
import NumberFields from "../numberFields.tsx";
import useCalculatorSlice from "../../../store/calculatorSlices/useCalculatorSlice.ts";
import { toLocaleCurrencyString } from "../../helpers/financialFcs.ts";
import {
  getLoanAmount,
  simulateTimePassage,
} from "../../services/buying/buying.service.ts";
import { PieChart } from "@mui/x-charts";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useMortgageDetails } from "../../services/buying/useMortgageDetails.ts";

function Buying() {
  const { stateSlice: buyingState, createStateUpdateFc } =
    useCalculatorSlice("buying");

  const {
    propertyPrice,
    propertyValueGrowthPercentage,
    loanTerm,
    interestRate,
    buyingCostsPercentage,
    sellingCostsPercentage,
    yearlyOwnershipCost,
    depositPercentage,
  } = buyingState;

  const deposit = propertyPrice * (depositPercentage / 100);

  const { paymentPerMonth: mortgagePerMonth } = useMortgageDetails();

  const yearsStaying = useSelector(
    (state: RootState) => state.futurePredictions.yearsStaying,
  );

  const loanAmount = getLoanAmount({
    deposit,
    initialPropertyValue: propertyPrice,
  });

  const { totalPrincipalPaid, totalInterestPaid } = simulateTimePassage({
    initialPropertyValue: propertyPrice,
    depositPercentage,
    yearlyOwnershipCost,

    yearsStaying,
    loanTerm,

    interestRate,
    loanAmount,
    propertyValueGrowthPercentage,
    buyingCostsPercentage,
    sellingCostsPercentage,

    mortgagePerMonth,
  });

  return (
    <Stack
      spacing={2}
      paddingBottom={2}
      sx={{
        textAlign: "left",
      }}
    >
      <NumberFields
        inputs={[
          {
            label: "Property Price",
            value: propertyPrice,
            onChange: createStateUpdateFc("propertyPrice"),
            formatAsCurrency: true,
          },
          {
            label: "Property Value Growth",
            value: propertyValueGrowthPercentage,
            onChange: createStateUpdateFc("propertyValueGrowthPercentage"),
            InputProps: getPercentageAdornment(true),
          },
        ]}
      />
      <Typography variant="h4">Mortgage</Typography>
      <NumberFields
        inputs={[
          {
            label: "Loan Term",
            value: loanTerm,
            onChange: createStateUpdateFc("loanTerm"),
            InputProps: getInputProps({
              endAdornment: "years",
            }),
          },
          {
            label: "Deposit percentage",
            helperText: toLocaleCurrencyString(
              propertyPrice * (depositPercentage / 100),
            ),
            value: depositPercentage,
            onChange: createStateUpdateFc("depositPercentage"),
            InputProps: getPercentageAdornment(),
          },
          {
            label: "Interest Rate",
            InputProps: getPercentageAdornment(true),
            value: interestRate,
            onChange: createStateUpdateFc("interestRate"),
          },
        ]}
      />
      <Typography variant="body1">
        {`You would pay ${toLocaleCurrencyString(mortgagePerMonth)} per month.`}
      </Typography>
      <Grid container justifyContent={"center"}>
        {totalPrincipalPaid !== 0 && totalInterestPaid && (
          <PieChart
            colors={["#0088FE", "orange"]}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: totalPrincipalPaid,
                    label: "Total principal paid",
                  },
                  {
                    id: 1,
                    value: totalInterestPaid,
                    label: "Total interest paid",
                  },
                ],
                innerRadius: 50,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
              },
            ]}
            width={500}
            height={200}
          />
        )}
      </Grid>
      <Typography variant="h4">Buying And Selling Costs</Typography>
      <NumberFields
        inputs={[
          {
            label: "Buying costs",
            InputProps: getPercentageAdornment(),
            value: buyingCostsPercentage,
            onChange: createStateUpdateFc("buyingCostsPercentage"),
            helperText: toLocaleCurrencyString(
              propertyPrice * (buyingCostsPercentage / 100),
            ),
          },
          {
            label: "Selling costs",
            InputProps: getPercentageAdornment(),
            value: sellingCostsPercentage,
            onChange: createStateUpdateFc("sellingCostsPercentage"),
            helperText: toLocaleCurrencyString(
              propertyPrice * (sellingCostsPercentage / 100),
            ),
          },
        ]}
      />
      <Typography variant="h4">Yearly costs</Typography>
      <NumberFields
        inputs={[
          {
            label: "Ownership costs",
            helperText: "Property taxes, maintenance, homeowners insurance...",
            InputProps: getPercentageAdornment(true),
            value: yearlyOwnershipCost,
            onChange: createStateUpdateFc("yearlyOwnershipCost"),
            formatAsCurrency: true,
          },
        ]}
      />
    </Stack>
  );
}

export default Buying;
