import NumberFields from "./numberFields.tsx";
import { TextFieldProps, Typography } from "@mui/material";
import { getAdornment, getPercentageAdornment } from "../helpers.tsx";

function Buying() {
  const currencySign = "$";

  const getCurrencyAdornment = () =>
    getAdornment({
      position: "start",
      adornmentString: currencySign,
    });

  const general: TextFieldProps[] = [
    {
      label: "Property Price",
      placeholder: "1000000",
      InputProps: getCurrencyAdornment(),
    },
    {
      label: "Deposit",
      placeholder: "200000",
      InputProps: getCurrencyAdornment(),
    },
  ];

  const yearlyCosts: TextFieldProps[] = [
    {
      label: "Ownership costs",
      placeholder: "2500",
      helperText:
        "Property taxes, maintenance, homeowners insurance...",
      InputProps: {
        ...getCurrencyAdornment(),
        ...getAdornment({
          position: "end",
          adornmentString: "per year",
        })
      },
    },
  ];

  const mortgage: TextFieldProps[] = [
    { label: "Loan Term", placeholder: "30", helperText: "years" },
    {
      label: "Interest Rate",
      placeholder: "4.5",
      helperText: "per year",
      InputProps: getPercentageAdornment(),
    },
  ];

  const buyAndSell: TextFieldProps[] = [
    {
      label: "Buying costs",
      placeholder: "1",
      InputProps: getPercentageAdornment(),
    },
    {
      label: "Selling costs",
      placeholder: "1",
      InputProps: getPercentageAdornment(),
    },
  ];
  return (
    <>
      <Typography variant="h4">Initial</Typography>
      <NumberFields inputs={general} />
      <Typography variant="h4">Yearly costs</Typography>
      <NumberFields inputs={yearlyCosts} />
      <Typography variant="h4">Mortgage</Typography>
      <NumberFields inputs={mortgage} />
      <Typography variant="h4">Buying And Selling Costs</Typography>
      <NumberFields inputs={buyAndSell} />
    </>
  );
}

export default Buying;
