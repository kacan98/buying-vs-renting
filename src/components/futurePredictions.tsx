import NumberFields from "./numberFields.tsx";
import { TextFieldProps } from "@mui/material";
import { getPercentageAdornment} from "../helpers.tsx"

const FuturePredictions = () => {
  const inputs: TextFieldProps[] = [
    {
      label: "Property Value Growth",
      placeholder: "3",
      helperText: "per year",
      InputProps: getPercentageAdornment(),
    },
    {
      label: "Alternative investment return",
      placeholder: "7",
      helperText: "per year",
      InputProps: getPercentageAdornment(),
    },
    {
      label: "Inflation Rate",
      placeholder: "2",
      helperText: "per year",
      InputProps: getPercentageAdornment(),
    },
  ];

  return (
    <>
      <NumberFields inputs={inputs} />
    </>
  );
};

export default FuturePredictions;
