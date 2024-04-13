import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(
    props,
    ref
  ) {
    const { onChange, ...other } = props;

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
        prefix="$"
      />
    );
  },
);

export default function DollarInput(props: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      {...props}
      InputProps={{
        inputComponent: NumericFormatCustom as never,
      }}
    />
  );
}
