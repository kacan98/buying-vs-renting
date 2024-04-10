import { getInputProps, getPercentageAdornment } from "./../adornments.tsx";
import { Stack, Typography } from "@mui/material";
import NumberFields from "../numberFields.tsx";
import useCalculatorSlice from "../../../store/calculatorSlices/useCalculatorSlice.ts";

function Buying() {
  const { stateSlice: buyingState, createStateUpdateFc } =
    useCalculatorSlice("buying");
  
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
            formatAsCurrency: true,
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
      <Typography variant="h4">Buying And Selling Costs</Typography>
      <NumberFields
        inputs={[
          {
            label: "Buying costs",
            InputProps: getPercentageAdornment(),
            value: buyingState.buyingCosts,
            onChange: createStateUpdateFc("buyingCosts"),
            helperText: String(buyingState.propertyPrice * (buyingState.buyingCosts/100)),
            step: 0.1,
          },
          {
            label: "Selling costs",
            InputProps: getPercentageAdornment(),
            value: buyingState.sellingCosts,
            onChange: createStateUpdateFc("sellingCosts"),
            helperText: String(buyingState.propertyPrice * (buyingState.sellingCosts/100))
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
            value: buyingState.ownershipCosts,
            onChange: createStateUpdateFc("ownershipCosts"),
            formatAsCurrency: true,
          },
        ]}
      />
    </Stack>
  );
}

export default Buying;
