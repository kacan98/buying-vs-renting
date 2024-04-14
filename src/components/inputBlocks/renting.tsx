import NumberFields from "../numberFields.tsx";
import useCalculatorSlice from "../../../store/calculatorSlices/useCalculatorSlice.ts";
import { NumberFieldProps } from "../numberField.tsx";
import { getInputProps } from "../adornments.tsx";

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
      label: "Deposit",
      value: rentingState.initialInvestment,
      onChange: createStateUpdateFc("initialInvestment"),
      formatAsCurrency: true,
    },
    {
      label: "Rent Growth",
      value: rentingState.yearlyRentGrowth,
      onChange: createStateUpdateFc("yearlyRentGrowth"),
      InputProps: getInputProps({
        endAdornment: "% per year",
      }),
    },
  ];

  return (
    <>
      <NumberFields inputs={inputs} />
    </>
  );
};

export default Renting;
