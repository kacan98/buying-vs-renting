import {TextField, TextFieldProps} from "@mui/material"

function NumberInput(props: TextFieldProps & {label: string}) {
  return (
    <TextField
      placeholder={'0'}
      type="number"
      variant="outlined"
      // InputLabelProps={{
      //   shrink: true,
      // }}
      {...props}
      label={props.label}
    />
  )
}

export default NumberInput