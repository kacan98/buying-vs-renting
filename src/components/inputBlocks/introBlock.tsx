import { Typography } from "@mui/material";
import NumberField from "../numberField.tsx";
import { getInputProps } from "../adornments.tsx";
import useCalculatorSlice from "../../../store/calculatorSlices/useCalculatorSlice.ts";

const IntroBlock = () => {
  const { stateSlice: predictionsState, createStateUpdateFc } =
    useCalculatorSlice("futurePredictions");
  return (
    <>
      <Typography variant={"h2"} component={"h1"} gutterBottom>
        Property Investment Calculator
      </Typography>
      <Typography variant={"body1"} gutterBottom>
        This calculator is designed to help you make an informed decision about
        whether to rent or buy a property.
      </Typography>
      <Typography variant={"body1"} gutterBottom>
        How long do you plan to stay in the property?
      </Typography>
      <NumberField
        value={predictionsState.yearsStaying}
        InputProps={getInputProps({
          endAdornment: "years",
        })}
        onChange={createStateUpdateFc("yearsStaying")}
      />
    </>
  );
};

export default IntroBlock;
