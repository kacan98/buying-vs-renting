import {useDispatch, useSelector} from "react-redux"
import {BuyingState, setBuyingValue} from "../../../store/calculatorSlices/buying.ts"
import {RootState} from "../../../store"
import {getAdornment, getPercentageAdornment} from "./../adornment.tsx"
import React from "react"
import {Stack, Typography} from "@mui/material"
import NumberFields from "../numberFields.tsx"
import DollarInput from "../maskedInput.tsx"


function Buying() {
  const buyingState: BuyingState = useSelector(
    (state: RootState) => state.buying,
  );
  const dispatch = useDispatch();

  const createStateUpdateFc =
    (fieldName: keyof BuyingState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setBuyingValue({ value: parseInt(e.target.value || '0'), key: fieldName }),
      );
    };

  const currencySign = "$";

  const getCurrencyAdornment = () =>
    getAdornment({
      position: "start",
      adornmentString: currencySign,
    });

  return (
    <Stack spacing={1} paddingBottom={2}>
      <DollarInput
        label="Property Price"
        InputProps={getCurrencyAdornment()}
        value={buyingState.propertyPrice}
        onChange={createStateUpdateFc("propertyPrice")}
      />
      <Typography variant="h4">Mortgage</Typography>
      <NumberFields
        inputs={[
          {
            label: "Loan Term",
            helperText: "years",
            value: buyingState.loanTerm,
            onChange: createStateUpdateFc("loanTerm"),
          },
          {
            formatAsCurrency:true,
            label: "Deposit",
            InputProps: getCurrencyAdornment(),
            value: buyingState.deposit,
            onChange: createStateUpdateFc("deposit"),
          },
          {
            label: "Interest Rate",
            helperText: "per year",
            InputProps: getPercentageAdornment(),
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
          },
          {
            label: "Selling costs",
            InputProps: getPercentageAdornment(),
            value: buyingState.sellingCosts,
            onChange: createStateUpdateFc("sellingCosts"),
          },
        ]}
      />
      <Typography variant="h4">Yearly costs</Typography>
      <NumberFields
        inputs={[
          {
            label: "Ownership costs",
            helperText: "Property taxes, maintenance, homeowners insurance...",
            InputProps: {
              ...getCurrencyAdornment(),
              ...getAdornment({
                position: "end",
                adornmentString: "per year",
              }),
            },
            value: buyingState.ownershipCosts,
            onChange: createStateUpdateFc("ownershipCosts"),
          },
        ]}
      />
    </Stack>
  );
}

export default Buying;
