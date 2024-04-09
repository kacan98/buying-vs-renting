import NumberFields from "./numberFields.tsx"
import {TextFieldProps} from "@mui/material"

const Renting = () => {
  const inputs: TextFieldProps[] = [
    {label: 'Monthly Rent', placeholder: '1000'},
    {label: 'Initial investment', placeholder: '2000' , helperText: 'e.g. deposit'},
    {label: 'Yearly Rent Growth', placeholder: '3', helperText: 'per year, in percentage'},
  ]
  
  return (
    <>
      <NumberFields inputs={inputs} />
    </>
  );
};

export default Renting;
