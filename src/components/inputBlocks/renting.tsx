import NumberFields from "../numberFields.tsx";
import useCalculatorSlice from "../../../store/calculatorSlices/useCalculatorSlice.ts";
import { NumberFieldProps } from "../numberField.tsx";
import {getInputProps} from "../adornments.tsx"

const Renting = () => {
  const { stateSlice: rentingState, createStateUpdateFc } =
    useCalculatorSlice("renting");

  const inputs: NumberFieldProps[] = [
    {
      label: "Monthly Rent",
      value: rentingState.monthlyRent,
      onChange: createStateUpdateFc("monthlyRent"),
      formatAsCurrency: true,
    },
    {
      label: "Initial investment",
      value: rentingState.initialInvestment,
      onChange: createStateUpdateFc("initialInvestment"),
      helperText: "e.g. deposit",
      formatAsCurrency: true,
    },
    {
      label: "Rent Growth",
      value: rentingState.yearlyRentGrowth,
      onChange: createStateUpdateFc("yearlyRentGrowth"),
      InputProps: getInputProps({
        endAdornment: '% per year',
      }),
      step: 0.1,
    },
  ];

  return (
    <>
      <NumberFields inputs={inputs} />
    </>
  );
};

export default Renting;
