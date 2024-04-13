import { TextFieldProps } from "@mui/material";
import {getPercentageAdornment} from "../adornments.tsx"
import NumberFields from "../numberFields.tsx"
import useCalculatorSlice from "../../../store/calculatorSlices/useCalculatorSlice.ts"

const FuturePredictions = () => {
  const {
    stateSlice: futureState,
    createStateUpdateFc,
  } = useCalculatorSlice("futurePredictions");
  
  const inputs: TextFieldProps[] = [
    {
      label: "Property Value Growth",
      value: futureState.propertyValueGrowth,
      onChange: createStateUpdateFc("propertyValueGrowth"),
      InputProps: getPercentageAdornment(true),
    },
    {
      label: "Alternative investment return",
      InputProps: getPercentageAdornment(true),
      value: futureState.alternativeInvestmentReturn,
      onChange: createStateUpdateFc("alternativeInvestmentReturn"),
    }
  ];

  return (
    <>
      <NumberFields inputs={inputs} />
    </>
  );
};

export default FuturePredictions;
