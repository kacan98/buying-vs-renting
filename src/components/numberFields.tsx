import {Box} from "@mui/material"
import NumberField, {NumberFieldProps} from "./numberField.tsx"


export type NumberFieldsProps = {
  inputs: NumberFieldProps[]
}

function NumberFields({inputs}: NumberFieldsProps) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {inputs.map((props, index) => (
        <NumberField key={index} {...props} /> ))}
    </Box>
  )
}

export default NumberFields