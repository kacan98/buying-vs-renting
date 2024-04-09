import { TextField, TextFieldProps } from "@mui/material";

function NumberField(
  props: TextFieldProps
) {
  return (
    <TextField
      placeholder={"0"}
      type="number"
      variant="outlined"
      // InputLabelProps={{
      //   shrink: true,
      // }}
      {...props}
    />
  );
}

export default NumberField;
