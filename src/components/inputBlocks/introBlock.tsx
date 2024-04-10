import { Typography } from "@mui/material";
import NumberField from "../numberField.tsx"
import {getInputProps} from "../adornments.tsx"
import useCalculatorSlice from "../../../store/calculatorSlices/useCalculatorSlice.ts"

const IntroBlock = () => {
  const { stateSlice: introState, createStateUpdateFc } = useCalculatorSlice('futurePredictions');
  return (
    <>
      <Typography variant={"h2"} component={"h1"}>
        Property Investment Calculator
      </Typography>
      <Typography variant={"body1"}>
        This calculator is designed to help you make an informed decision about
        whether to rent or buy a property.
      </Typography>
      <Typography variant={"body1"}>
        How long do you plan to stay in the property?
      </Typography>
      <NumberField
        value={introState.yearsStaying}
        InputProps={getInputProps({
          endAdornment: "years",
        })}
        onChange={createStateUpdateFc("yearsStaying")}
      />
    </>
  );
};

export default IntroBlock;
