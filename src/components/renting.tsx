import NumberFields from "./numberFields.tsx";
import { TextFieldProps } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setRentingValue} from "../../store/calculatorSlices/renting.ts"
import {RootState} from "../../store"

const Renting = () => {
  const rentingState = useSelector((state: RootState) => state.renting);
  const dispatch = useDispatch();

  const inputs: TextFieldProps[] = [
    {
      label: "Monthly Rent",
      placeholder: "1000",
      value: rentingState.monthlyRent,
      onChange: (e) =>
        dispatch(
          setRentingValue({ value: parseInt(e.target.value), key: "monthlyRent"}),
        ),
    },
    {
      label: "Initial investment",
      placeholder: "2000",
      helperText: "e.g. deposit",
      value: rentingState.initialInvestment,
      onChange: (e) =>
        dispatch(
          setRentingValue({ value: parseInt(e.target.value), key: "initialInvestment"}),
        ),
    },
    {
      label: "Yearly Rent Growth",
      placeholder: "3",
      helperText: "per year, in percentage",
      value: rentingState.yearlyRentGrowth,
      onChange: (e) =>
        dispatch(
          setRentingValue({ value: parseInt(e.target.value), key: "yearlyRentGrowth"}),
        ),
    },
  ];

  return (
    <>
      <NumberFields inputs={inputs} />
    </>
  );
};

export default Renting;
