import { TextField, TextFieldProps } from "@mui/material";
import DollarInput from "./maskedInput.tsx";

export type NumberFieldProps = TextFieldProps & { formatAsCurrency?: boolean };

function NumberField(props: NumberFieldProps) {
  const { formatAsCurrency, ...otherProps } = props;
  const textFieldProps: TextFieldProps = {
    placeholder: "0",
    variant: "outlined",
    size: "medium",
    ...otherProps,
  };

  return formatAsCurrency ? (
    <DollarInput {...textFieldProps} />
  ) : (
    <TextField {...textFieldProps} />
  );
}

export default NumberField;
