import NumberFields from "../numberFields.tsx";
import useCalculatorSlice from "../../../store/calculatorSlices/useCalculatorSlice.ts";
import { NumberFieldProps } from "../numberField.tsx";
import { getInputProps, getPercentageAdornment } from "../adornments.tsx";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleInvestDifference } from "../../../store/calculatorSlices/renting.ts";
import { useMortgageDetails } from "../../services/buying/useMortgageDetails.ts";
import { toLocaleCurrencyString } from "../../helpers/financialFcs.ts";

const Renting = () => {
  const { stateSlice: rentingState, createStateUpdateFc } =
    useCalculatorSlice("renting");

  const { paymentPerMonth: mortgageMonthlyPayment, deposit: mortgageDeposit } =
    useMortgageDetails();

  const dispatch = useDispatch();

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

  const monthlyDifference = mortgageMonthlyPayment - rentingState.monthlyRent;

  const differenceBetweenRentAndMortgageDeposit =
    mortgageDeposit - rentingState.initialInvestment;

  return (
    <>
      <NumberFields inputs={inputs} />
      {(monthlyDifference > 0 ||
        differenceBetweenRentAndMortgageDeposit > 0) && (
        <>
          <FormControlLabel
            control={
              <Checkbox value={rentingState.investDifference} defaultChecked />
            }
            onChange={(_, checked) => dispatch(toggleInvestDifference(checked))}
            label="Invest the difference between buying and renting?"
          />
          {rentingState.investDifference && (
            <>
              <Typography variant="h6">Investing the difference</Typography>
              {monthlyDifference > 0 && (
                <Typography variant={"body1"}>
                  If you decide to purchase a property, your monthly payments
                  would be{" "}
                  <Typography
                    variant="body1"
                    component="span"
                    fontWeight="bold"
                  >
                    {toLocaleCurrencyString(monthlyDifference)}
                  </Typography>{" "}
                  higher.
                </Typography>
              )}
              {differenceBetweenRentAndMortgageDeposit > 0 && (
                <Typography variant={"body1"}>
                  The required deposit will be lower by{" "}
                  <Typography
                    variant="body1"
                    component="span"
                    fontWeight="bold"
                  >
                    {toLocaleCurrencyString(
                      differenceBetweenRentAndMortgageDeposit,
                    )}
                  </Typography>{" "}
                </Typography>
              )}
              <Typography variant={"body1"}>
                You can invest the difference.
              </Typography>
              <br />
              <NumberFields
                inputs={[
                  {
                    label: "Alternative investment return",
                    InputProps: getPercentageAdornment(true),
                    value: rentingState.alternativeInvestmentReturnPercentage,
                    onChange: createStateUpdateFc(
                      "alternativeInvestmentReturnPercentage",
                    ),
                  },
                ]}
              ></NumberFields>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Renting;
