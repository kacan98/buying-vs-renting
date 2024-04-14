import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { supportedCurrencies } from "../../store/settings/supportedLocales.ts";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<
  NumericFormatProps,
  CustomProps & { currency: string }
>(function NumericFormatCustom(props, ref) {
  const { onChange, currency, ...other } = props;
  const { prefix, suffix } = supportedCurrencies.find((localePrefixOrSuffix) =>
    localePrefixOrSuffix.abbreviation.startsWith(currency.slice(0, 2)),
  ) || { prefix: "", suffix: "" };

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix={prefix}
      suffix={suffix}
    />
  );
});

export default function CurrencyInput(props: TextFieldProps) {
  const currency = useSelector((state: RootState) => state.settings.currency);

  return (
    <TextField
      variant="outlined"
      {...props}
      InputProps={{
        inputComponent: NumericFormatCustom as never,
        inputProps: { currency },
      }}
    />
  );
}
