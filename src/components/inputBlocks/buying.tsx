import { getInputProps, getPercentageAdornment } from "./../adornments.tsx";
import { Stack, Typography } from "@mui/material";
import NumberFields from "../numberFields.tsx";
import useCalculatorSlice from "../../../store/calculatorSlices/useCalculatorSlice.ts";
import {toLocaleCurrencyString} from "../../helpers/financialFcs.ts"
import {getMonthlyMortgagePayment} from "../../helpers/buying/buying.service.ts"
import {PieChart} from "@mui/x-charts"

function Buying() {
  const { stateSlice: buyingState, createStateUpdateFc } =
    useCalculatorSlice("buying");
  
  const monthlyPayment = getMonthlyMortgagePayment({
    propertyPrice: buyingState.propertyPrice,
    deposit: buyingState.deposit,
    loanTerm: buyingState.loanTerm,
    interestRate: buyingState.interestRate,
  })
  
  return (
    <Stack spacing={1} paddingBottom={2}>
      <NumberFields
        inputs={[
          {
            label: "Property Price",
            value: buyingState.propertyPrice,
            onChange: createStateUpdateFc("propertyPrice"),
            formatAsCurrency: true,
          },
        ]}
      />
      <Typography variant="h4">Mortgage</Typography>
      <NumberFields
        inputs={[
          {
            label: "Loan Term",
            value: buyingState.loanTerm,
            onChange: createStateUpdateFc("loanTerm"),
            InputProps: getInputProps({
              endAdornment: "years",
            }),
          },
          {
            label: "Deposit",
            value: buyingState.deposit,
            onChange: createStateUpdateFc("deposit"),
            formatAsCurrency: true,
          },
          {
            label: "Interest Rate",
            InputProps: getPercentageAdornment(true),
            value: buyingState.interestRate,
            onChange: createStateUpdateFc("interestRate"),
          },
        ]}
      />
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={400}
        height={200}
      />
      <Typography variant="body1">
        {`${toLocaleCurrencyString(monthlyPayment)} per month.`}
      </Typography>
      <Typography variant="h4">Buying And Selling Costs</Typography>
      <NumberFields
        inputs={[
          {
            label: "Buying costs",
            InputProps: getPercentageAdornment(),
            value: buyingState.buyingCostsPercentage,
            onChange: createStateUpdateFc("buyingCostsPercentage"),
            helperText: toLocaleCurrencyString(buyingState.propertyPrice * (buyingState.buyingCostsPercentage/100))
          },
          {
            label: "Selling costs",
            InputProps: getPercentageAdornment(),
            value: buyingState.sellingCostsPercentage,
            onChange: createStateUpdateFc("sellingCostsPercentage"),
            helperText: toLocaleCurrencyString(buyingState.propertyPrice * (buyingState.sellingCostsPercentage/100))
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
            value: buyingState.yearlyOwnershipCost,
            onChange: createStateUpdateFc("yearlyOwnershipCost"),
            formatAsCurrency: true,
          },
        ]}
      />
    </Stack>
  );
}

export default Buying;
